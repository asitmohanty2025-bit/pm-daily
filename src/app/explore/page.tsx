import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { PathCard } from "@/components/marketing/path-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { paths, sampleChallenge } from "@/lib/data";

export const metadata = { title: "Explore learning paths" };
export default function ExplorePage(){return <><SiteHeader/><main><section className="container-shell py-16 md:py-24"><Button variant="ghost" asChild><Link href="/"><ArrowLeft className="size-4"/>Back home</Link></Button><SectionHeading className="mt-10" eyebrow="Explore" title="Choose the capability you want to prove." body="Each path is a curated sequence of daily challenge packs. Start with a sample, then build a calendar that fits your week."/><div className="mt-14 grid gap-6 md:grid-cols-2">{paths.map(path=><PathCard key={path.slug} path={path}/>)}</div></section><section className="border-y border-[var(--line)] bg-white py-20"><div className="container-shell grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="eyebrow">Start small</p><h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">Try “{sampleChallenge.title}” before choosing.</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">Experience the Diagnose → Decide → Build flow in a guided sample workspace.</p></div><Button size="lg" asChild><Link href="/challenges/sample">Open sample challenge <ArrowRight className="size-4"/></Link></Button></div></section></main><SiteFooter/></>}
