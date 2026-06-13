"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { safeRedirectPath } from "@/lib/auth/redirect";

export function SignInForm({ next = "/account" }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!isSupabaseConfigured()) {
      setStatus("error");
      setMessage("Supabase is not configured for this deployment yet.");
      return;
    }

    setStatus("loading");

    try {
      const supabase = createClient();
      const redirectPath = safeRedirectPath(next);
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("next", redirectPath);

      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: callbackUrl.toString(),
          shouldCreateUser: true,
        },
      });

      if (error) throw error;

      setStatus("sent");
      setMessage(`We sent a secure sign-in link to ${email.trim()}.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send the sign-in link.");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-8 rounded-[24px] border border-[var(--mint-strong)] bg-[var(--mint)] p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--pine)]" />
          <div>
            <p className="font-bold text-[var(--pine-deep)]">Check your inbox</p>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{message}</p>
            <button
              type="button"
              className="mt-4 text-sm font-bold text-[var(--pine)] underline underline-offset-4"
              onClick={() => {
                setStatus("idle");
                setMessage("");
              }}
            >
              Use another email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mono-label">Email address</span>
        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[var(--line-strong)] px-4 focus-within:border-[var(--pine)] focus-within:ring-4 focus-within:ring-[var(--focus)]">
          <Mail className="size-5 text-[var(--ink-faint)]" />
          <input
            className="h-13 w-full bg-transparent outline-none"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            disabled={status === "loading"}
          />
        </div>
      </label>

      <Button className="w-full" size="lg" type="submit" disabled={status === "loading"}>
        {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : null}
        {status === "loading" ? "Sending secure link…" : "Continue with email"}
      </Button>

      {status === "error" ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm leading-6 text-red-700" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
