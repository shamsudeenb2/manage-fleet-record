import { ReactNode } from "react";
import { getSession } from "@/app/config/auth"; // adjust path to your next-auth config
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  // If no session, redirect to login
   if (!session) {
    redirect("/");
    // return <>{children}</>;
  }
  // // Only allow Admin
  if (session?.user?.role !== "ADMIN") {
    if (session?.user?.role === "MANAGER") {
      redirect('/manager/drivers');
    }
      redirect('/data-entry/trips'); 
  }

  return <>{children}</>;
}
