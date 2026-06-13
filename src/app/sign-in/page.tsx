import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { BrandMark } from "@/components/brand/mark";
import { Button } from "@/components/ui/button";
import { ServerSignInForm } from "./server-sign-in-form";
import { safeRedirectPath } from "@/lib/auth/redirect";

export const metadata = { title: "Sign in" };

type SignInPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
    sent?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  callback: "That sign-in link is invalid or expired. Request a fresh link below.",
  config: "Supabase credentials are missing from this deployment.",
  email: "Enter a valid email address.",
  send: "We could not send the sign-in link. Please try again.",
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const next = safeRedirectPath(params.next);
  const errorMessage = params.error ? errorMessages[params.error] : undefined;
  const sent = params.sent === "1";

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

        {errorMessage ? (
          <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm leading-6 text-red-700" role="alert">
            {errorMessage}
          </p>
        ) : null}

        {sent ? (
          <div className="mt-8 rounded-[24px] border border-[var(--mint-strong)] bg-[var(--mint)] p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--pine)]" />
              <div>
                <p className="font-bold text-[var(--pine-deep)]">Check your inbox</p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                  We sent a secure PM Daily sign-in link to your email address.
                </p>
                <Link
                  className="mt-4 inline-block text-sm font-bold text-[var(--pine)] underline underline-offset-4"
                  href={`/sign-in?next=${encodeURIComponent(next)}`}
                >
                  Use another email
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <ServerSignInForm next={next} />
        )}

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
