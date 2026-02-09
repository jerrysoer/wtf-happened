'use client';

import { useState, useCallback } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import type { DataPoint, Annotation } from '@/lib/types';

interface InteractiveChartProps {
  chartData: DataPoint[];
  annotations: Annotation[];
  valueLabel: string;
  secondaryValueLabel?: string;
  unit: string;
  yearRange?: [number, number];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: number;
  valueLabel: string;
  secondaryValueLabel?: string;
  unit: string;
  annotations: Annotation[];
}

function CustomTooltip({
  active,
  payload,
  label,
  valueLabel,
  secondaryValueLabel,
  unit,
  annotations,
}: CustomTooltipProps) {
  if (!active || !payload || !label) return null;

  const annotation = annotations.find((a) => a.year === label);

  return (
    <div className="rounded-xl border border-border bg-bg-card px-3 py-2.5 shadow-lg">
      <p className="text-xs font-bold font-mono text-text-primary">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="mt-1 text-xs text-text-secondary">
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.dataKey === 'value' ? valueLabel : secondaryValueLabel}:{' '}
          <span className="font-mono font-semibold text-text-primary">
            {entry.value.toLocaleString()} {unit.includes('%') ? '%' : ''}
          </span>
        </p>
      ))}
      {annotation && (
        <div className="mt-2 border-t border-border pt-2">
          <p className="text-xs font-semibold text-data-red">{annotation.label}</p>
          <p className="mt-0.5 text-xs text-text-secondary leading-snug">
            {annotation.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default function InteractiveChart({
  chartData,
  annotations,
  valueLabel,
  secondaryValueLabel,
  unit,
  yearRange,
}: InteractiveChartProps) {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const filteredData = yearRange
    ? chartData.filter((d) => d.year >= yearRange[0] && d.year <= yearRange[1])
    : chartData;

  const hasSecondary = filteredData.some((d) => d.secondaryValue !== undefined);

  const handleMouseMove = useCallback((state: { activeLabel?: string | number }) => {
    if (state?.activeLabel != null) {
      setHoveredYear(Number(state.activeLabel));
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredYear(null);
  }, []);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={filteredData}
          margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            strokeOpacity={0.6}
            vertical={false}
          />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: 'var(--text-tertiary)', fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--border)' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-tertiary)', fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip
            content={
              <CustomTooltip
                valueLabel={valueLabel}
                secondaryValueLabel={secondaryValueLabel}
                unit={unit}
                annotations={annotations}
              />
            }
            cursor={{ stroke: 'var(--text-tertiary)', strokeWidth: 1, strokeDasharray: '4 4' }}
          />

          {annotations.map((annotation) => {
            const isInRange = filteredData.some((d) => d.year === annotation.year);
            if (!isInRange) return null;
            return (
              <ReferenceLine
                key={annotation.year}
                x={annotation.year}
                stroke="var(--data-red)"
                strokeDasharray="4 3"
                strokeWidth={1}
                opacity={hoveredYear === annotation.year ? 1 : 0.4}
              />
            );
          })}

          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--accent-blue)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: 'var(--accent-blue)', stroke: 'white', strokeWidth: 2 }}
            name={valueLabel}
          />

          {hasSecondary && (
            <Line
              type="monotone"
              dataKey="secondaryValue"
              stroke="var(--accent-orange)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: 'var(--accent-orange)', stroke: 'white', strokeWidth: 2 }}
              name={secondaryValueLabel}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-2 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-5 rounded-full bg-accent-blue" />
          <span className="text-xs text-text-secondary">{valueLabel}</span>
        </div>
        {hasSecondary && secondaryValueLabel && (
          <div className="flex items-center gap-2">
            <span className="inline-block h-0.5 w-5 rounded-full bg-accent-orange" />
            <span className="text-xs text-text-secondary">{secondaryValueLabel}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-px bg-data-red" />
          <span className="text-xs text-text-secondary">Key events</span>
        </div>
      </div>
    </div>
  );
}
