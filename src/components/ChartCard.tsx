'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ChartData } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/types';

interface ChartCardProps {
  chart: ChartData;
}

const CATEGORY_COLORS: Record<string, string> = {
  wages: 'text-accent-blue',
  housing: 'text-accent-orange',
  inequality: 'text-accent-purple',
  prices: 'text-accent-orange',
  trade: 'text-accent-sage',
  labor: 'text-accent-blue',
  demographics: 'text-accent-purple',
  politics: 'text-accent-orange',
};

function MiniSparkline({ data, category }: { data: { value: number }[]; category: string }) {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const width = 280;
  const height = 80;
  const padding = 8;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const strokeColor = category === 'housing' || category === 'prices'
    ? 'var(--accent-orange)'
    : category === 'inequality' || category === 'demographics'
      ? 'var(--accent-purple)'
      : category === 'trade'
        ? 'var(--accent-sage)'
        : 'var(--accent-blue)';

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  );
}

export default function ChartCard({ chart }: ChartCardProps) {
  return (
    <Link
      href={`/explore/${chart.id}`}
      className="group block flex-shrink-0 w-[280px] overflow-hidden rounded-2xl border border-border bg-bg-card transition-all hover:shadow-lg snap-start"
    >
      {/* Sparkline area */}
      <div className="relative h-[100px] bg-bg-secondary">
        <span className={`absolute left-3 top-2.5 z-10 rounded-md bg-white/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm ${CATEGORY_COLORS[chart.category] || 'text-text-secondary'}`}>
          {CATEGORY_LABELS[chart.category]}
        </span>
        <MiniSparkline data={chart.chartData} category={chart.category} />
      </div>

      {/* Content */}
      <div className="px-4 pt-3.5 pb-2">
        <h3 className="font-serif text-[17px] font-bold leading-tight tracking-tight">
          {chart.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-text-secondary line-clamp-2">
          <span className="font-bold uppercase tracking-wide text-accent-orange text-[10px]">Claim: </span>
          &ldquo;{chart.commonClaim}&rdquo;
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 pb-3.5">
        <span className="font-mono text-[10px] text-text-tertiary">{chart.causes.length} factors</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-secondary text-text-secondary transition-all group-hover:bg-accent-orange group-hover:text-white">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
