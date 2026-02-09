'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllCharts, getCategories } from '@/lib/charts';
import { CATEGORY_LABELS } from '@/lib/types';
import ChartCard from '@/components/ChartCard';

const DEMO_DATA = [
  { year: 1948, productivity: 100, compensation: 100 },
  { year: 1955, productivity: 127, compensation: 126 },
  { year: 1963, productivity: 155, compensation: 152 },
  { year: 1971, productivity: 192, compensation: 188 },
  { year: 1980, productivity: 225, compensation: 197 },
  { year: 1990, productivity: 270, compensation: 206 },
  { year: 2000, productivity: 334, compensation: 222 },
  { year: 2010, productivity: 405, compensation: 233 },
  { year: 2023, productivity: 475, compensation: 258 },
];

function HeroChart() {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const width = 390;
  const height = 160;
  const padding = { top: 12, right: 12, bottom: 24, left: 36 };

  const xMin = 1948;
  const xMax = 2023;
  const yMin = 80;
  const yMax = 500;

  const scaleX = (year: number) =>
    padding.left + ((year - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
  const scaleY = (val: number) =>
    height - padding.bottom - ((val - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);

  const productivityPath = DEMO_DATA.map((d, i) =>
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.year)} ${scaleY(d.productivity)}`
  ).join(' ');

  const compensationPath = DEMO_DATA.map((d, i) =>
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.year)} ${scaleY(d.compensation)}`
  ).join(' ');

  const nixonX = scaleX(1971);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border-light px-4 py-3">
        <span className="font-serif text-sm font-semibold text-text-primary">
          Productivity vs. Compensation
        </span>
        <span className="rounded-md bg-bg-secondary px-2 py-0.5 font-mono text-[10px] text-text-tertiary">
          1948–2023
        </span>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ display: 'block' }}>
          {[100, 200, 300, 400].map((val) => (
            <line key={val} x1={padding.left} y1={scaleY(val)} x2={width - padding.right} y2={scaleY(val)} stroke="var(--border)" strokeWidth="0.5" />
          ))}
          {[1950, 1970, 1990, 2010].map((year) => (
            <text key={year} x={scaleX(year)} y={height - 6} textAnchor="middle" className="fill-text-tertiary" style={{ fontSize: '9px', fontFamily: 'var(--font-jetbrains-mono, monospace)' }}>{year}</text>
          ))}
          <line x1={nixonX} y1={padding.top} x2={nixonX} y2={height - padding.bottom} stroke="var(--data-red)" strokeWidth="1" strokeDasharray="4 3" opacity={drawn ? 0.6 : 0} style={{ transition: 'opacity 0.6s ease 1.2s' }} />
          <text x={nixonX + 4} y={padding.top + 10} className="fill-data-red" style={{ fontSize: '8px', fontFamily: 'var(--font-jetbrains-mono, monospace)', fontWeight: 600, opacity: drawn ? 1 : 0, transition: 'opacity 0.6s ease 1.4s' }}>1971</text>
          <path d={productivityPath} fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1200" strokeDashoffset={drawn ? 0 : 1200} style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s' }} />
          <path d={compensationPath} fill="none" stroke="var(--accent-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1200" strokeDashoffset={drawn ? 0 : 1200} style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s' }} />
          {drawn && (
            <>
              <circle cx={scaleX(2023)} cy={scaleY(475)} r="4" fill="var(--accent-blue)" className="animate-pulse-dot" />
              <circle cx={scaleX(2023)} cy={scaleY(258)} r="4" fill="var(--accent-orange)" className="animate-pulse-dot" />
            </>
          )}
        </svg>
      </div>

      <div className="flex items-center justify-center gap-5 border-t border-border-light px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] text-text-secondary">
          <span className="inline-block h-0.5 w-3 rounded-full bg-accent-blue" /> Productivity
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-text-secondary">
          <span className="inline-block h-0.5 w-3 rounded-full bg-accent-orange" /> Compensation
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const allCharts = getAllCharts();
  const categories = getCategories();

  const chartsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = allCharts.filter((c) => c.category === cat);
    return acc;
  }, {} as Record<string, typeof allCharts>);

  return (
    <div>
      {/* === HERO === */}
      <section className="relative min-h-[calc(100vh-60px)] flex flex-col justify-center px-6 pt-8 pb-12 sm:px-8 sm:pt-16 sm:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="animate-rise-up stagger-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs font-semibold text-text-secondary">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-sage animate-pulse-dot" />
                  A Data Literacy Project
                </span>
              </div>

              <h1 className="mt-6 animate-rise-up stagger-2">
                <span className="block font-serif text-[44px] font-extrabold leading-[1.08] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                  What <em className="not-italic text-accent-orange italic">really</em>
                </span>
                <span className="block font-serif text-[44px] font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                  happened
                </span>
                <span className="block font-serif text-[44px] font-light leading-[1.08] tracking-tight text-text-secondary sm:text-6xl lg:text-7xl">
                  in 1971?
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary animate-rise-up stagger-3">
                Complex trends rarely have single causes. We show the full picture — not propaganda.
              </p>

              <div className="mt-8 animate-rise-up stagger-4">
                <Link
                  href="/explore"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-accent-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-orange/30 transition-all hover:shadow-xl hover:shadow-accent-orange/40 hover:-translate-y-0.5"
                >
                  Explore the Charts
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-10 flex gap-8 border-t border-border pt-6 animate-rise-up stagger-5">
                {[
                  { value: '14', label: 'Charts' },
                  { value: '70', label: 'Factors' },
                  { value: '42', label: 'Perspectives' },
                  { value: '61', label: 'Sources' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-mono text-xl font-semibold text-text-primary">{stat.value}</div>
                    <div className="text-[11px] text-text-tertiary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-rise-up stagger-4">
              <HeroChart />
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-tertiary animate-bounce-down sm:hidden">
          Scroll
          <span className="text-base">&darr;</span>
        </div>
      </section>

      {/* === CHART CAROUSELS === */}
      {categories.map((category) => {
        const charts = chartsByCategory[category];
        if (!charts || charts.length === 0) return null;
        return (
          <section key={category} className="border-t border-border py-8">
            <div className="flex items-baseline justify-between px-6 mb-4 sm:px-8">
              <h2 className="font-serif text-xl font-bold tracking-tight sm:text-2xl">
                {CATEGORY_LABELS[category]}
              </h2>
              <Link href="/explore" className="text-xs font-semibold text-accent-orange">
                See all &rarr;
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide snap-x sm:px-8">
              {charts.map((chart) => (
                <ChartCard key={chart.id} chart={chart} />
              ))}
            </div>
          </section>
        );
      })}

      {/* === CTA === */}
      <section className="border-t border-border px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Ready to think critically about data?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Every chart includes multi-causal analysis, verified sources, and three competing perspectives. Form your own conclusions.
          </p>
          <div className="mt-8">
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-text-primary px-7 py-3.5 text-sm font-bold text-bg-primary transition-all hover:bg-text-primary/90"
            >
              Start Exploring
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
