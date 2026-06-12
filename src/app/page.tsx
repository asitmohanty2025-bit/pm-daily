import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, ChevronRight, MessageSquareText, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { HeroWorkspace } from "@/components/marketing/hero-workspace";
import { PathCard } from "@/components/marketing/path-card";
import { ChallengePreview } from "@/components/marketing/challenge-preview";
import { ArtifactGallery } from "@/components/marketing/artifact-gallery";
import { SkillMap } from "@/components/marketing/skill-map";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { paths } from "@/lib/data";

const week = [
  ["Mon", "Understand", "Read the evidence and frame the real problem."],
  ["Tue", "Diagnose", "Find the signal, assumptions, and missing context."],
  ["Wed", "Decide", "Compare options and defend a trade-off."],
  ["Thu", "Build", "Turn the decision into a tangible PM artifact."],
  ["Fri", "Publish", "Reflect, improve, and add proof to your portfolio."],
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-20">
          <div className="hero-grid absolute inset-0 -z-10" />
          <div className="container-shell grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <Badge className="border-[var(--mint-strong)] bg-[var(--mint)] text-[var(--pine)]"><Sparkles className="mr-2 size-3.5" /> Built for PMs who learn by doing</Badge>
              <h1 className="mt-7 max-w-[760px] text-balance font-display text-[clamp(3.4rem,8vw,7rem)] leading-[.88] tracking-[-0.065em]">Become a stronger PM, <span className="relative whitespace-nowrap text-[var(--pine)]">one real challenge<span className="absolute -bottom-1 left-0 h-3 w-full -rotate-1 rounded-full bg-[var(--amber)]/55 -z-10" /></span> at a time.</h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-[var(--ink-soft)] md:text-xl">Practise product, technology, data, and AI skills through guided challenges—then turn every completed challenge into portfolio-ready evidence.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button size="lg" asChild><Link href="#paths">Choose my learning path <ArrowRight className="size-4" /></Link></Button><Button size="lg" variant="outline" asChild><Link href="/challenges/sample">Try a sample challenge</Link></Button></div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[var(--ink-soft)]"><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--pine)]" /> Three problems per day</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--pine)]" /> One artifact shipped</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[var(--pine)]" /> Evidence-backed skills</span></div>
            </div>
            <HeroWorkspace />
          </div>
        </section>

        <section id="paths" className="border-y border-[var(--line)] bg-white py-24 md:py-32">
          <div className="container-shell"><SectionHeading eyebrow="Choose your direction" title="What do you want to become better at?" body="Start with an outcome, not a catalogue. Each path combines realistic problems, guided decisions, and portfolio artifacts." /><div className="mt-14 grid gap-6 md:grid-cols-2">{paths.map(path => <PathCard key={path.slug} path={path} />)}</div></div>
        </section>

        <section className="py-24 md:py-32"><div className="container-shell"><SectionHeading eyebrow="Try the experience" title="Every day is a connected challenge pack." body="You do not consume three unrelated lessons. You diagnose, decide, and build toward one useful artifact." /><div className="mt-14"><ChallengePreview /></div></div></section>

        <section className="overflow-hidden bg-[var(--pine-deep)] py-24 text-white md:py-32">
          <div className="container-shell"><div className="grid items-end gap-7 md:grid-cols-[1fr_.65fr]"><div><p className="eyebrow text-[var(--mint-strong)]">A week that fits real work</p><h2 className="mt-4 max-w-3xl font-display text-5xl leading-[.98] tracking-[-0.05em] md:text-7xl">One challenge. Five focused sessions. One artifact.</h2></div><p className="max-w-xl text-lg leading-8 text-white/65">Each day moves the same piece of work forward. You always know what happens next and what you are building toward.</p></div><div className="mt-16 grid gap-3 md:grid-cols-5">{week.map(([day,title,body],index)=><article key={day} className={`rounded-[24px] border p-5 ${index === 4 ? "border-[var(--amber)] bg-[var(--amber)] text-[var(--pine-deep)]" : "border-white/12 bg-white/6"}`}><p className={`mono-label ${index === 4 ? "text-[var(--pine)]" : "text-white/45"}`}>{day} · 0{index+1}</p><h3 className="mt-5 font-display text-2xl">{title}</h3><p className={`mt-3 text-sm leading-6 ${index === 4 ? "text-[var(--pine-deep)]/75" : "text-white/55"}`}>{body}</p></article>)}</div></div>
        </section>

        <section className="py-24 md:py-32"><div className="container-shell"><SectionHeading eyebrow="Build work you can show" title="Your progress becomes a portfolio, not a percentage." body="Every challenge ends with something tangible. Keep it private, request feedback, or publish it as evidence of your PM thinking." /><div className="mt-16 pb-10"><ArtifactGallery /></div></div></section>

        <section className="border-y border-[var(--line)] bg-white py-24 md:py-32"><div className="container-shell"><SectionHeading eyebrow="Skills OS" title="See which skills your work actually demonstrates." body="PM Daily connects challenges, artifacts, proof, and peer feedback into a living map of your growth." /><div className="mt-14"><SkillMap /></div></div></section>

        <section className="py-24 md:py-32"><div className="container-shell grid gap-12 rounded-[40px] bg-[var(--amber-soft)] p-7 md:p-12 lg:grid-cols-[.9fr_1.1fr] lg:p-16"><div><Badge className="border-[var(--amber)] bg-white/60 text-[var(--pine)]">Calendar Learning Pass</Badge><h2 className="mt-6 font-display text-5xl leading-[.98] tracking-[-0.05em] md:text-6xl">Your calendar becomes the doorway to each challenge.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">Choose a path, start date, and learning days. Download one calendar file with a deep link that opens the exact workspace for every day.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button variant="amber" size="lg" asChild><Link href="/explore">Build my learning calendar <CalendarDays className="size-4" /></Link></Button><Button variant="outline" size="lg" asChild><Link href="/how-it-works">See how it works</Link></Button></div><p className="mt-5 text-sm font-semibold text-[var(--ink-soft)]">Free for the first 1,000 verified learners. Then ₹199 once.</p></div><div className="relative min-h-[390px] overflow-hidden rounded-[30px] bg-white p-6 shadow-[var(--shadow-soft)]"><div className="flex items-center justify-between"><div><p className="mono-label">Your learning calendar</p><p className="mt-2 font-display text-2xl">Technical PM · July</p></div><span className="rounded-full bg-[var(--mint)] px-3 py-1.5 text-xs font-bold text-[var(--pine)]">5 days / week</span></div><div className="mt-7 grid grid-cols-5 gap-2 text-center text-xs font-bold text-[var(--ink-faint)]">{["M","T","W","T","F"].map((d,i)=><span key={i}>{d}</span>)}</div><div className="mt-3 grid grid-cols-5 gap-2">{Array.from({length:20},(_,i)=><div key={i} className={`aspect-square rounded-xl p-2 text-xs font-bold ${[2,5,6,7,8,9,12,13,14,15,16].includes(i) ? "bg-[var(--pine)] text-white" : "bg-[var(--paper)] text-[var(--ink-faint)]"}`}>{i+1}{i===8?<span className="mt-1 block size-1.5 rounded-full bg-[var(--amber)]"/>:null}</div>)}</div><div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-lg"><p className="mono-label">Wed 09 · Day 08</p><div className="mt-2 flex items-center justify-between gap-3"><p className="font-semibold">Improve login success</p><ChevronRight className="size-5 text-[var(--pine)]" /></div></div></div></div></section>

        <section className="bg-white py-24 md:py-32"><div className="container-shell"><SectionHeading eyebrow="Grow with other PMs" title="Community rewards useful work, not noise." body="Publish selected artifacts, review another PM’s thinking, continue your streak, and join weekly path leaderboards." /><div className="mt-14 grid gap-5 md:grid-cols-3">{[{icon:MessageSquareText,title:"Structured peer review",body:"Ask for feedback on clarity, strategy, metrics, technical depth, or communication."},{icon:Trophy,title:"Weekly leaderboards",body:"Opt-in rankings reward completed challenges, published evidence, and helpful reviews."},{icon:ShieldCheck,title:"Private by default",body:"Your work remains private until you explicitly publish or share selected evidence."}].map(({icon:Icon,title,body})=><article key={title} className="rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-7"><span className="grid size-12 place-items-center rounded-2xl bg-white text-[var(--pine)] shadow-sm"><Icon className="size-6" /></span><h3 className="mt-6 font-display text-3xl tracking-[-0.04em]">{title}</h3><p className="mt-4 leading-7 text-[var(--ink-soft)]">{body}</p></article>)}</div></div></section>

        <section className="px-4 py-16 md:py-24"><div className="mx-auto max-w-[1200px] overflow-hidden rounded-[42px] bg-[var(--pine-deep)] px-6 py-16 text-center text-white md:px-12 md:py-24"><p className="eyebrow text-[var(--mint-strong)]">Start with a path, not another course</p><h2 className="mx-auto mt-5 max-w-4xl text-balance font-display text-5xl leading-[.95] tracking-[-0.055em] md:text-7xl">What will your next artifact prove?</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">Choose the PM capability you want to strengthen. We’ll show you the first challenge and the work you will create.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button variant="amber" size="lg" asChild><Link href="#paths">Choose my path <ArrowRight className="size-4" /></Link></Button><Button size="lg" className="bg-white/10 shadow-none hover:bg-white/16" asChild><Link href="/challenges/sample">Try the sample challenge</Link></Button></div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
