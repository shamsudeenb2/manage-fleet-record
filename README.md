# Fleet Manager

A role-based fleet operations system built with Next.js, Prisma, and PostgreSQL for tracking vehicles, drivers, trips, fuel consumption, and maintenance for a commercial trucking fleet. It models Nigerian heavy-truck fleet operations specifically — multi-fuel-type consumption (diesel, petrol, CNG, LPG, electric), CO₂ estimation per fuel type, cost-per-km rollups, and per-tire-position tracking for 10–18-wheel trucks — and exposes three role-scoped dashboards (Admin, Manager, Data Entry) backed by a shared PostgreSQL schema and a set of authenticated REST API routes.

## Core Features

Verified against the route handlers, Prisma schema, and page components in this repo.

- **Vehicle registry** — CRUD with search, pagination, fuel-type filtering, driver-assignment filtering, and soft delete with a separate "deleted vehicles" recovery view ([app/api/vehicles/route.ts](app/api/vehicles/route.ts), [app/(pages)/(admin)/vehicles/deleted/page.tsx](<app/(pages)/(admin)/vehicles/deleted/page.tsx>)).
- **Driver records** — profile, license (with expiry tracking), bank/guarantor details, and vehicle assignment history via a `TruckDriver` join table that preserves past vehicle↔driver pairings over time.
- **Trip logging** — per-trip odometer readings, multiple fuel fills per trip, multiple customers/consignments per trip, and server-computed rollups (`totalFuelCost`, `totalCO2Kg`, `costPerKm`) so these numbers can't be spoofed from the client.
- **Multi-fuel consumption modeling** — a documented efficiency/CO₂ table per fuel type (diesel, petrol, CNG, electric, LPG) with diesel-litre-equivalent (LDE) conversion for cross-fuel cost comparison ([components/utils/fuelCalculations.ts](components/utils/fuelCalculations.ts)).
- **Maintenance tracking**, split into four linked entities:
  - **Services** — planned/preventive maintenance with next-due-by-km and next-due-by-date alerting.
  - **Repairs** — reactive/unplanned work with priority levels (including a `CRITICAL` off-road flag) and an auto-rolled-up parts cost.
  - **Parts** — inventory line items that can attach to a repair or stand alone, with warranty-expiry tracking.
  - **Tires** — per-position fitment history (front/rear inner/outer/spare) with install/rotate/remove/retread actions, sized for 10–18-tire articulated trucks.
- **Operations dashboard** — date-range-filterable fleet KPIs: active vs. idle vehicles, total distance, fuel cost/CO₂ breakdown by type, maintenance cost rollup, cost-per-km, open/critical repair counts, vehicles due for service, top vehicles/drivers by trips and fuel spend, and license-expiry alerts, rendered with Recharts ([app/api/dashboard/route.ts](app/api/dashboard/route.ts)).
- **Role-based access** — three roles (`ADMIN`, `MANAGER`, `DATA_ENTRY`) with separate route groups, separate navigation, and separate landing pages per role.
- **Authentication** — NextAuth credentials provider over a Prisma-backed `User` table, bcrypt password hashing, JWT sessions, and a forgot/reset-password flow (hashed single-use tokens, 15-minute expiry, emailed via Nodemailer/SMTP).
- **Image/document uploads** — profile photos, license images, and guarantor forms upload to `public/uploads` via a form-data API route.
- **Driver fingerprint field** — the `Driver` model has a `fingerPrint` column and there's a working `POST/DELETE /api/auth/users/driver/fingerprint` endpoint, but the DigitalPersona scanner capture UI ([app/(pages)/(admin)/drivers/capture-fingerprint/[id]/page.tsx](<app/(pages)/(admin)/drivers/capture-fingerprint/[id]/page.tsx>)) is entirely commented out — see [Known Limitations](#known-limitations).

## Architecture

**Single Next.js 15 App Router application** serving both the UI and the API — no separate backend service. This keeps deployment to one artifact and lets server components fetch the session directly instead of round-tripping through an API.

- **Route groups for role separation.** `app/(pages)/(admin)/*` and `app/(pages)/manager/*` are parallel trees of near-identical pages (vehicles, drivers, maintenance) scoped to what each role should see, plus a `data-entry` segment for the trip-logging-only role. `(admin)` and `(pages)` are parenthesized Next.js route groups (no URL segment); `manager` and `data-entry` are real URL segments.
- **Auth guarding lives in layouts, not middleware.** There is no `middleware.ts` in this project. Each role's `layout.tsx` calls `getSession()` server-side and redirects unauthorized roles — e.g. [app/(pages)/(admin)/layout.tsx](<app/(pages)/(admin)/layout.tsx>). This is simple and works for the current three roles, but it means access control is duplicated across three layout files rather than centralized in one place — a middleware-based guard would be more resilient to a new route being added under the wrong tree.
- **Server-computed financials.** Costs that matter for reporting (`Part.totalCost`, `Repair.totalCost`, `Trip.totalFuelCost`, `Trip.totalCO2Kg`) are computed on the server from quantity × unit price / emission factor, never trusted from client input — enforced at the API layer, not just in the DB.
- **Soft deletes throughout.** `Vehicle`, `Driver`, `Part`, `Service`, `Repair` all use a `deletedAt` timestamp instead of hard deletes, with indexes on `deletedAt` for the list-query filters. Vehicles get a dedicated "deleted" recovery view; other soft-deleted resources are excluded from queries but have no recovery UI.
- **Zod at the API boundary.** Every API route parses `req.json()` into a Zod schema before touching Prisma, returning `{ ok: false, errors }` on validation failure rather than letting bad data reach the database.
- **Prisma as the only data-access layer.** A single `PrismaClient` export ([components/lib/db.ts](components/lib/db.ts)) is used everywhere; there's no repository/service abstraction between routes and Prisma, which is reasonable at this schema size.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) + React 19 |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma 6 |
| Auth | NextAuth.js (Credentials provider, JWT sessions) + bcrypt |
| Validation | Zod + React Hook Form (`@hookform/resolvers`) |
| Styling / UI | Tailwind CSS 4, Radix UI primitives, shadcn-style `components/ui` (`class-variance-authority`, `tailwind-merge`) |
| Charts | Recharts |
| Animation | Framer Motion |
| Data fetching (client) | TanStack React Query |
| Email | Nodemailer (SMTP) |
| Notifications (UI) | Sonner (toasts) |
| Biometric hardware (partial) | `@digitalpersona/fingerprint` (integration disabled — see below) |
| Package manager | pnpm |

## Test Coverage

**There are no automated tests in this repository.** There is no test runner configured (no Jest/Vitest/Playwright dependency), no `test` script in [package.json](package.json), and no `*.test.*`/`*.spec.*` files anywhere in the source tree. `.gitignore` reserves a `/coverage` path, but nothing currently generates it. All verification during development appears to have been manual. This is the most significant gap in the project as it stands — the fuel/CO₂/cost math in particular ([components/utils/fuelCalculations.ts](components/utils/fuelCalculations.ts), [app/lib/cost-utils.ts](app/lib/cost-utils.ts)) is pure and easily unit-testable, and would be the highest-value place to start.

## Known Limitations

Being direct about the current state rather than glossing over it:

- **No test suite** (see above).
- **Fingerprint capture UI is disabled.** The scanner page ([app/(pages)/(admin)/drivers/capture-fingerprint/[id]/page.tsx](<app/(pages)/(admin)/drivers/capture-fingerprint/[id]/page.tsx>)) is ~490 lines, entirely commented out except for a "skip fingerprint capture" fallback. The backing API route works; the UI to drive it does not currently render.
- **Several files carry dead, commented-out earlier drafts alongside the live implementation** — e.g. [app/page.tsx](app/page.tsx) (login page, ~550 lines, two abandoned drafts before the active one), [app/api/vehicles/route.ts](app/api/vehicles/route.ts), and [components/lib/db.ts](components/lib/db.ts). The apps still function correctly (only the last definition of a given export is live), but the files should be cleaned up.
- **`components/lib/db.ts` does not use the standard Next.js singleton pattern** for `PrismaClient` (the singleton version is present but commented out). In `next dev`, this risks exhausting the Postgres connection pool across hot reloads.
- **File uploads are written to the local filesystem** (`public/uploads`) rather than object storage. This works for a traditional server deployment but will not persist on serverless/ephemeral platforms — see [Deployment](#deployment).
- **ESLint errors don't fail the build** — `next.config.ts` sets `eslint.ignoreDuringBuilds: true`.
- **No `.env.example`** is committed. Required environment variables are documented below from what the code actually reads.
- A stray `text` file at the repo root contains an unused draft of a different Prisma schema (inventory/work-order models) that was never wired up — safe to ignore or delete.

## Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) (the repo is locked with `pnpm-lock.yaml`)
- A PostgreSQL database (local or hosted)
- SMTP credentials if you want the forgot/reset-password email flow to work (optional for local dev otherwise — it logs a warning and continues)

### 1. Clone and install

```bash
git clone <this-repo-url>
cd manage-fleet-record
pnpm install
```

`postinstall` runs `prisma generate` automatically.

### 2. Configure environment variables

Create a `.env` file in the project root (none is committed — this list is derived from every `process.env.*` reference in the code):

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fleet_manager"

# NextAuth
NEXTAUTH_SECRET="generate with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Outbound email (forgot/reset password) — optional in dev
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
EMAIL_FROM="no-reply@yourdomain.com"

# Optional fallback used by the mailer if NEXTAUTH_URL isn't set
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 3. Set up the database

```bash
pnpm prisma migrate dev
```

This applies the existing migration in [prisma/migrations](prisma/migrations) and generates the Prisma client. There is no seed script in the repo, so you'll need to create your first `ADMIN` user manually (e.g. via `pnpm prisma studio`, hashing the password with bcrypt to match [app/lib/auth.ts](app/lib/auth.ts)) — there's no self-service sign-up route.

### 4. Run the dev server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
pnpm build   # production build (Turbopack)
pnpm start   # run the production build
pnpm lint    # ESLint (not enforced at build time — see Known Limitations)
```

## Deployment

This is a standard Next.js app, but two things constrain where it can run:

- **Persistent filesystem required.** Because uploads are written directly to `public/uploads` on the server ([app/api/auth/users/upload_profile/route.ts](app/api/auth/users/upload_profile/route.ts)), a serverless platform with an ephemeral filesystem (e.g. Vercel) will lose uploaded images between deploys/invocations. Deploy to a platform with a persistent disk (a VPS, Railway, Render, Fly.io, a Docker container with a mounted volume) or, for serverless, first swap the upload route for S3/Cloudinary/R2-style object storage.
- **PostgreSQL** — any managed Postgres (Supabase, Neon, RDS, Railway) or self-hosted instance works; just point `DATABASE_URL` at it and run `pnpm prisma migrate deploy` as part of your deploy step.

General deploy checklist:

1. Provision Postgres and set `DATABASE_URL`.
2. Set `NEXTAUTH_SECRET` and `NEXTAUTH_URL` (must match your public URL for NextAuth cookies/callbacks to work).
3. Set SMTP variables if password reset should work in production.
4. Run `pnpm prisma migrate deploy`, then `pnpm build && pnpm start` (or your platform's Next.js build step).
5. Ensure `public/uploads` is on a persistent, writable volume.

The repo has no CI/CD configuration (no `.github/workflows`) — deployment is currently manual.

## Screenshots / Demo

_Placeholder — add screenshots or a demo GIF of the dashboard, trip logging flow, and maintenance views here._

| Dashboard | Trip Logging | Maintenance |
|---|---|---|
| _screenshot_ | _screenshot_ | _screenshot_ |

## Project Structure

```
app/
  (pages)/(admin)/     # Admin-only route group: vehicles, drivers, users, maintenance, dashboard
  (pages)/manager/     # Manager route group: read/limited-write views of the same resources
  (pages)/data-entry/  # Data-entry role: trip logging only
  api/                 # REST route handlers (auth, vehicles, trips, maintenance, dashboard)
  config/auth.ts       # NextAuth config + getSession()
  lib/                 # auth (bcrypt), token (reset tokens), mailer (Nodemailer), cost-utils
components/
  ui/                  # shadcn-style Radix primitives (button, dialog, card, calendar, ...)
  layout/              # Sidebar, Navbar, Dashboard shell
  validators/          # Zod schemas shared by forms and API routes
  utils/                # fuel/CO₂ calculation utilities
prisma/
  schema.prisma         # Data model
  migrations/            # One migration currently checked in
```
