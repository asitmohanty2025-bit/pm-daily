import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { BrandMark } from "@/components/brand/mark";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-[color:var(--paper)/.88] backdrop-blur-xl supports-[backdrop-filter]:bg-[color:var(--paper)/.78]">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" aria-label="PM Daily home"><BrandMark /></Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[var(--ink-soft)] lg:flex" aria-label="Primary navigation">
          <Link className="nav-link" href="/explore">Explore</Link>
          <Link className="nav-link" href="/challenges/sample">Challenges</Link>
          <Link className="nav-link" href="/community">Community</Link>
          <Link className="nav-link" href="/how-it-works">How it works</Link>
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <Button variant="ghost" asChild><Link href="/sign-in">Sign in</Link></Button>
          <Button asChild><Link href="/explore">Choose a path <ArrowRight className="size-4" /></Link></Button>
        </div>
        <Button className="sm:hidden" size="icon" variant="outline" aria-label="Open menu"><Menu className="size-5" /></Button>
      </div>
    </header>
  );
}
