// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { verifyPassword } from "@/app/lib/auth";
// import prisma from "@/components/lib/db";


// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });
//         if (!user || !user.password) return null;

//         const isValid = await verifyPassword(
//           credentials.password,
//           user.password
//         );
//         if (!isValid) return null;

//         return { id: user.id, name: user.name, email: user.email, role: user.role };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = (user as any).role;
//         token.name = (user as any).name;
//         token.email = (user as any).email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub!;
//         session.user.role = token.role as string;
//         session.user.name = token.name as string;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/",
//   },
//    secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "@/app/config/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };