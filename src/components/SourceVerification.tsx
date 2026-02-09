import type { DataSource } from '@/lib/types';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface SourceVerificationProps {
  dataSource: DataSource;
}

export default function SourceVerification({ dataSource }: SourceVerificationProps) {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-accent-sage" />
        <h3 className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-tertiary">
          Data Source
        </h3>
      </div>

      <div className="mt-3 space-y-2">
        <p className="text-sm font-bold text-text-primary">{dataSource.name}</p>
        <a
          href={dataSource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          View original data
        </a>
        <p className="text-xs text-text-tertiary">
          Last updated: <span className="font-mono">{dataSource.lastUpdated}</span>
        </p>
      </div>
    </div>
  );
}
