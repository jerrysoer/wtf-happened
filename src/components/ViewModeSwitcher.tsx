'use client';

import type { ViewMode } from '@/lib/types';

interface ViewModeSwitcherProps {
  activeMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const MODES: { mode: ViewMode; label: string; color: string; activeClass: string }[] = [
  {
    mode: 'skeptic',
    label: 'Skeptic',
    color: 'text-accent-purple',
    activeClass: 'bg-accent-purple text-white',
  },
  {
    mode: 'neutral',
    label: 'Neutral',
    color: 'text-text-secondary',
    activeClass: 'bg-text-primary text-bg-primary',
  },
  {
    mode: 'believer',
    label: 'Believer',
    color: 'text-accent-orange',
    activeClass: 'bg-accent-orange text-white',
  },
];

export default function ViewModeSwitcher({ activeMode, onChange }: ViewModeSwitcherProps) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-border">
      {MODES.map(({ mode, label, activeClass }) => {
        const isActive = activeMode === mode;
        return (
          <button
            key={mode}
            onClick={() => onChange(mode)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-all ${
              isActive ? activeClass : 'bg-bg-card text-text-tertiary hover:text-text-primary'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
