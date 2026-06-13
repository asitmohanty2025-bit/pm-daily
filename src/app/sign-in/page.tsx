import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/brand/mark";
import { Button } from "@/components/ui/button";
import { SignInForm } from "./sign-in-form";
import { safeRedirectPath } from "@/lib/auth/redirect";

export const metadata = { title: "Sign in" };

type SignInPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const next = safeRedirectPath(params.next);

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--paper)] p-4">
      <div className="w-full max-w-md rounded-[34px] border border-[var(--line)] bg-white p-7 shadow-[var(--shadow-soft)] md:p-9">
        <Link href="/" aria-label="PM Daily home">
          <BrandMark />
        </Link>

        <h1 className="mt-10 font-display text-4xl tracking-[-0.045em]">
          Save your journey and build your PM portfolio.
        </h1>
        <p className="mt-4 leading-7 text-[var(--ink-soft)]">
          We’ll email you a secure magic link. No password to remember.
        </p>

        {params.error ? (
          <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm leading-6 text-red-700" role="alert">
            That sign-in link is invalid or expired. Request a fresh link below.
          </p>
        ) : null}

        <SignInForm next={next} />

        <div className="mt-6 space-y-2 text-sm text-[var(--ink-soft)]">
          <p>• No password required</p>
          <p>• Newsletter consent is separate</p>
          <p>• Your private work stays private</p>
        </div>

        <Button className="mt-6" variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="size-4" /> Back home
          </Link>
        </Button>
      </div>
    </main>
  );
}
