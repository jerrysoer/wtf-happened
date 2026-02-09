import type { CausalFactor } from '@/lib/types';

interface CauseAnalysisProps {
  causes: CausalFactor[];
}

export default function CauseAnalysis({ causes }: CauseAnalysisProps) {
  const sorted = [...causes].sort((a, b) => b.weight - a.weight);

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-tertiary">
        Causal Factors
      </h3>
      <div className="space-y-3">
        {sorted.map((cause) => (
          <div key={cause.name} className="rounded-xl border border-border bg-bg-card p-4 transition-colors hover:border-accent-blue">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-text-primary">{cause.name}</h4>
              <span className="rounded-lg bg-accent-blue/10 px-2.5 py-0.5 font-mono text-[13px] font-semibold text-accent-blue">
                {cause.weight}%
              </span>
            </div>

            <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-secondary">
              <div
                className="h-full rounded-full bg-accent-blue transition-all duration-500"
                style={{ width: `${cause.weight}%` }}
              />
            </div>

            <p className="text-xs leading-relaxed text-text-secondary">
              {cause.description}
            </p>

            <div className="mt-2 font-mono text-[10px] text-text-tertiary">
              {cause.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
