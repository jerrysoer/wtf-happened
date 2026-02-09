import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
      <h1 className="font-serif text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
        About This Project
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-text-secondary">
        <p>
          <strong className="text-text-primary">Check the Charts</strong> is an educational web app that
          teaches critical thinking about economic data through interactive exploration of trends
          since 1971.
        </p>

        <p>
          Unlike sites that present charts with a single implied cause, we show multi-causal analysis,
          verified sources, and competing interpretations — so you can form your own conclusions.
        </p>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">Mission</h2>
        <p>
          Turn viral chart propaganda into a teaching moment for statistical literacy. Complex
          economic phenomena rarely have single causes, and intellectual honesty requires
          acknowledging uncertainty and considering alternative explanations.
        </p>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">What We&apos;re NOT</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Another Bitcoin marketing site</li>
          <li>A pro-gold-standard propaganda tool</li>
          <li>A simple chart gallery without context</li>
          <li>A political advocacy platform</li>
        </ul>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">What We ARE</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>A critical thinking teaching tool</li>
          <li>An example of honest data journalism</li>
          <li>A resource for educators and students</li>
          <li>A demonstration of multi-causal analysis</li>
        </ul>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">Open Source</h2>
        <p>
          This project is released under the MIT License. No ads, no paywall — this is a public
          service educational project. Contributions are welcome.
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/explore"
          className="group inline-flex items-center gap-2 rounded-xl bg-accent-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-accent-orange/90 shadow-lg shadow-accent-orange/20"
        >
          Explore the Charts
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
