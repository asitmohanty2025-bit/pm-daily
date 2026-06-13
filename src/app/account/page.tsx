import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, LogOut, ShieldCheck } from "lucide-react";
import { BrandMark } from "@/components/brand/mark";
import { Button } from "@/components/ui/button";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata = { title: "Your account" };

export default async function AccountPage() {
  if (!isSupabaseConfigured()) redirect("/sign-in?error=config");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in?next=/account");

  return (
    <main className="min-h-screen bg-[var(--paper)]">
      <header className="border-b border-[var(--line)] bg-white">
        <div className="container-shell flex h-20 items-center justify-between">
          <Link href="/" aria-label="PM Daily home"><BrandMark /></Link>
          <form action={signOut}>
            <Button type="submit" variant="outline"><LogOut className="size-4" /> Sign out</Button>
          </form>
        </div>
      </header>

      <section className="container-shell py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="eyebrow">Account ready</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-[-0.05em] md:text-7xl">
              Your PM Daily journey can now follow you across devices.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
              You are signed in as <strong className="text-[var(--ink)]">{user.email}</strong>. Path progress, responses, and artifacts can now be attached to this account.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild><Link href="/explore">Choose a path <ArrowRight className="size-4" /></Link></Button>
              <Button size="lg" variant="outline" asChild><Link href="/challenges/sample">Open sample challenge</Link></Button>
            </div>
          </div>

          <aside className="rounded-[30px] border border-[var(--line)] bg-white p-7 shadow-[var(--shadow-soft)]">
            <span className="grid size-12 place-items-center rounded-2xl bg-[var(--mint)] text-[var(--pine)]"><ShieldCheck className="size-6" /></span>
            <h2 className="mt-6 font-display text-3xl tracking-[-0.04em]">Private by default</h2>
            <p className="mt-4 leading-7 text-[var(--ink-soft)]">
              Your challenge responses and artifact drafts remain private until you explicitly publish selected work.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
