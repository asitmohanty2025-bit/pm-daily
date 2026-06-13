import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requestMagicLink } from "./actions";

export function ServerSignInForm({ next = "/account" }: { next?: string }) {
  return (
    <form className="mt-8 space-y-4" action={requestMagicLink}>
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="mono-label">Email address</span>
        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[var(--line-strong)] px-4 focus-within:border-[var(--pine)] focus-within:ring-4 focus-within:ring-[var(--focus)]">
          <Mail className="size-5 text-[var(--ink-faint)]" />
          <input
            className="h-13 w-full bg-transparent outline-none"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
          />
        </div>
      </label>
      <Button className="w-full" size="lg" type="submit">
        Continue with email
      </Button>
    </form>
  );
}
