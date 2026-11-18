import Link from "next/link";
import { ArrowRight, CheckCircle2, GitBranch, Gauge, Link2, WalletCards, Users, ShieldCheck, BarChart3 } from "lucide-react";

export const metadata = {
  title: "AffilixWP — Affiliate & Referral Tracking for WordPress",
  description:
    "Manage affiliate referrals and two-level commissions directly from WordPress with AffilixWP.",
  alternates: { canonical: "https://affilixwp.beveeztech.com" },
  openGraph: {
    title: "AffilixWP — Affiliate & Referral Tracking for WordPress",
    description:
      "A focused WordPress plugin for affiliate referrals, two-level commissions and Razorpay-based payment workflows.",
    url: "https://affilixwp.beveeztech.com",
    siteName: "AffilixWP",
    type: "website",
  },
};

const features = [
  {
    icon: Link2,
    title: "Referral link tracking",
    description:
      "Give affiliates a clear way to share referral links and attribute new sign-ups to the right partner.",
  },
  {
    icon: GitBranch,
    title: "Two-level referrals",
    description:
      "Support direct referrals and a second referral level with a structured multi-level model.",
  },
  {
    icon: WalletCards,
    title: "Commission workflows",
    description:
      "Keep referral activity and commission records organised, with a Razorpay-based payment workflow.",
  },
  {
    icon: BarChart3,
    title: "Purpose-built dashboard",
    description:
      "Bring affiliate activity and commission information together inside your WordPress experience.",
  },
  {
    icon: Gauge,
    title: "Built for WordPress",
    description:
      "Uses dedicated database tables for plugin data rather than relying on a collection of generic content records.",
  },
  {
    icon: ShieldCheck,
    title: "Your site, your data",
    description:
      "Run the affiliate programme as part of your own WordPress installation and hosting environment.",
  },
];

export default function AffilixWPLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07131f] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[620px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(35,151,200,0.22),transparent_65%)]" />
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="AffilixWP home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 text-lg font-black text-slate-950">A</span>
          <span className="text-xl font-bold tracking-tight">Affilix<span className="text-cyan-300">WP</span></span>
        </Link>
        <a
          href="mailto:support@beveeztech.com?subject=AffilixWP%20product%20enquiry"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/5"
        >
          Contact the team
        </a>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-32 lg:pt-24">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
            Affiliate management for WordPress
          </div>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
            Turn referrals into a <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">growth engine.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            AffilixWP helps you organise affiliate referrals and two-level commission tracking from your WordPress website—with a focused dashboard and a Razorpay-based payment workflow.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:support@beveeztech.com?subject=AffilixWP%20early%20access"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-7 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:shadow-cyan-500/20"
            >
              Request product access <ArrowRight size={18} />
            </a>
            <a href="#features" className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/5">
              Explore features
            </a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300" /> WordPress plugin</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300" /> Two referral levels</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300" /> Razorpay workflow</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 rounded-[3rem] bg-cyan-400/10 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-[#101f2e]/95 p-5 shadow-2xl shadow-black/40 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-semibold text-white">Affiliate overview</p>
                <p className="mt-1 text-xs text-slate-400">Illustrative product preview</p>
              </div>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">Dashboard concept</span>
            </div>
            <div className="grid grid-cols-2 gap-3 py-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <Users className="mb-4 text-cyan-300" size={20} />
                <p className="text-2xl font-bold">Affiliates</p>
                <p className="mt-1 text-xs text-slate-400">Partner activity at a glance</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <GitBranch className="mb-4 text-blue-300" size={20} />
                <p className="text-2xl font-bold">2 levels</p>
                <p className="mt-1 text-xs text-slate-400">Direct + second-level referrals</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold">Referral structure</p>
                <span className="text-xs text-slate-500">Concept view</span>
              </div>
              <div className="mx-auto max-w-[230px] rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-center">
                <p className="text-sm font-semibold">Your business</p>
                <p className="mt-1 text-xs text-slate-400">Affiliate programme</p>
              </div>
              <div className="mx-auto h-7 w-px bg-gradient-to-b from-cyan-300 to-blue-400" />
              <div className="mx-auto max-w-[230px] rounded-xl border border-blue-300/30 bg-blue-300/10 px-4 py-3 text-center">
                <p className="text-sm font-semibold">Level 1 affiliate</p>
                <p className="mt-1 text-xs text-slate-400">Direct referral</p>
              </div>
              <div className="mx-auto h-7 w-px bg-gradient-to-b from-blue-300 to-indigo-400" />
              <div className="mx-auto max-w-[230px] rounded-xl border border-indigo-300/30 bg-indigo-300/10 px-4 py-3 text-center">
                <p className="text-sm font-semibold">Level 2 affiliate</p>
                <p className="mt-1 text-xs text-slate-400">Second-level referral</p>
              </div>
            </div>
            <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">Illustrative interface concept—not live account data.</p>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 border-y border-white/10 bg-white/[0.025] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">What it helps you do</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">The essentials for running an affiliate programme.</h2>
            <p className="mt-5 leading-7 text-slate-400">Keep referral relationships, commission records and the affiliate experience connected to your WordPress site.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-[#0c1a28] p-7 transition hover:-translate-y-1 hover:border-cyan-300/30">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300"><Icon size={21} /></div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Built for WordPress site owners</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Make your next referral count.</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">Interested in using AffilixWP or seeing how it could fit your business? Get in touch with the Beveez Tech team.</p>
        <a
          href="mailto:support@beveeztech.com?subject=AffilixWP%20product%20enquiry"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
        >
          Talk to us <ArrowRight size={18} />
        </a>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-7 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} AffilixWP. A Beveez Tech product.</p>
          <a href="https://beveeztech.com" className="transition hover:text-cyan-300">Built by Beveez Tech</a>
        </div>
      </footer>
    </main>
  );
}
