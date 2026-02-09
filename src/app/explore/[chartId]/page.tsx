'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getChartById } from '@/lib/charts';
import type { ViewMode } from '@/lib/types';
import InteractiveChart from '@/components/InteractiveChart';
import ViewModeSwitcher from '@/components/ViewModeSwitcher';
import CauseAnalysis from '@/components/CauseAnalysis';
import SourceVerification from '@/components/SourceVerification';
import { CATEGORY_LABELS } from '@/lib/types';

export default function ChartDetailPage() {
  const params = useParams();
  const chartId = params.chartId as string;
  const chart = getChartById(chartId);
  const [viewMode, setViewMode] = useState<ViewMode>('neutral');

  if (!chart) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:px-8">
        <h1 className="font-serif text-2xl font-bold text-text-primary">Chart not found</h1>
        <p className="mt-2 text-text-secondary">
          The chart &ldquo;{chartId}&rdquo; doesn&apos;t exist.
        </p>
        <Link
          href="/explore"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-blue hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all charts
        </Link>
      </div>
    );
  }

  const perspectives = [
    { mode: 'skeptic' as ViewMode, view: chart.skepticView, borderColor: 'border-accent-purple', bgColor: 'bg-[#F8F5FC]', tagColor: 'text-accent-purple' },
    { mode: 'neutral' as ViewMode, view: chart.neutralView, borderColor: 'border-text-tertiary', bgColor: 'bg-bg-card', tagColor: 'text-text-tertiary' },
    { mode: 'believer' as ViewMode, view: chart.believerView, borderColor: 'border-accent-orange', bgColor: 'bg-[#FEF7F4]', tagColor: 'text-accent-orange' },
  ];

  const activePerspective = perspectives.find((p) => p.mode === viewMode)!;

  return (
    <div className="py-4 sm:py-8">
      {/* Back link */}
      <div className="border-b border-border-light px-6 pb-3 sm:px-8">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-tertiary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Charts
        </Link>
      </div>

      {/* Header */}
      <div className="px-6 pt-5 pb-6 border-b border-border sm:px-8">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-accent-blue">
          {CATEGORY_LABELS[chart.category]}
        </span>
        <h1 className="mt-2 font-serif text-[30px] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-4xl">
          {chart.title}
        </h1>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">{chart.subtitle}</p>
      </div>

      {/* Chart */}
      <div className="border-b border-border bg-bg-card">
        <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6">
          <InteractiveChart
            chartData={chart.chartData}
            annotations={chart.annotations}
            valueLabel={chart.valueLabel}
            secondaryValueLabel={chart.secondaryValueLabel}
            unit={chart.unit}
          />
        </div>
      </div>

      {/* Claim vs Reality */}
      <div className="flex flex-col gap-3 px-6 py-6 border-b border-border sm:px-8">
        <div className="rounded-2xl border border-accent-orange/20 bg-[#FEF2F0] p-4">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-accent-orange mb-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            Common Claim
          </div>
          <p className="text-sm leading-relaxed text-text-primary italic">
            &ldquo;{chart.commonClaim}&rdquo;
          </p>
        </div>
        <div className="rounded-2xl border border-accent-sage/20 bg-[#F0F7F2] p-4">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-accent-sage mb-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            What the Data Shows
          </div>
          <p className="text-sm leading-relaxed text-text-primary">
            {chart.actualTrend}
          </p>
        </div>
      </div>

      {/* Perspectives — swipeable cards */}
      <div className="px-6 py-6 border-b border-border sm:px-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-tertiary">
            Perspectives
          </h3>
          <ViewModeSwitcher activeMode={viewMode} onChange={setViewMode} />
        </div>

        {/* Swipeable perspective cards on mobile */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x pb-2 sm:hidden">
          {perspectives.map(({ mode, view, borderColor, bgColor, tagColor }) => (
            <div
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-shrink-0 w-[calc(100%-48px)] snap-center rounded-2xl border-2 p-4 transition-colors cursor-pointer ${borderColor} ${bgColor}`}
            >
              <div className={`text-[9px] font-bold uppercase tracking-[0.12em] mb-2 ${tagColor}`}>
                {mode}
              </div>
              <h4 className="font-serif text-[17px] font-bold mb-1.5">{view.title}</h4>
              <p className="text-[13px] leading-relaxed text-text-secondary">{view.interpretation}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] text-text-tertiary mt-2 sm:hidden">&larr; Swipe between perspectives &rarr;</p>

        {/* Desktop: show active perspective */}
        <div className={`hidden sm:block rounded-2xl border-2 p-5 transition-colors ${activePerspective.borderColor} ${activePerspective.bgColor}`}>
          <div className={`text-[9px] font-bold uppercase tracking-[0.12em] mb-2 ${activePerspective.tagColor}`}>
            {activePerspective.mode}
          </div>
          <h4 className="font-serif text-lg font-bold mb-2">{activePerspective.view.title}</h4>
          <p className="text-sm font-medium text-text-secondary mb-2">{activePerspective.view.summary}</p>
          <p className="text-sm leading-relaxed text-text-secondary">{activePerspective.view.interpretation}</p>
        </div>
      </div>

      {/* Causal Factors + Source */}
      <div className="px-6 py-6 sm:px-8">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CauseAnalysis causes={chart.causes} />
          </div>
          <div className="space-y-4">
            <SourceVerification dataSource={chart.dataSource} />

            {/* Key Events */}
            <div className="rounded-xl border border-border bg-bg-card p-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-tertiary mb-4">
                Key Events
              </h3>
              <div className="space-y-3">
                {chart.annotations.map((annotation) => (
                  <div key={annotation.year} className="flex gap-3">
                    <span className="flex-shrink-0 rounded-lg bg-accent-orange/10 px-2 py-0.5 font-mono text-xs font-bold text-accent-orange">
                      {annotation.year}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-text-primary">{annotation.label}</p>
                      <p className="text-xs text-text-secondary">{annotation.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
