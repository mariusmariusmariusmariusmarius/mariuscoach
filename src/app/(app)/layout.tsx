import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AppSidebar } from "@/components/app/sidebar";
import { AppTopbar } from "@/components/app/topbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <AppSidebar session={session} />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
        <AppTopbar session={session} />
        <main className="bg-noise flex-1 px-5 py-8 md:px-10">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
