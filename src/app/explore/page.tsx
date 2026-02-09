'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { getAllCharts, getCategories } from '@/lib/charts';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ChartCategory } from '@/lib/types';
import ChartCard from '@/components/ChartCard';

export default function ExplorePage() {
  const allCharts = getAllCharts();
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<ChartCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCharts = useMemo(() => {
    let result = allCharts;

    if (selectedCategory !== 'all') {
      result = result.filter((chart) => chart.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(
        (chart) =>
          chart.title.toLowerCase().includes(lower) ||
          chart.subtitle.toLowerCase().includes(lower) ||
          chart.commonClaim.toLowerCase().includes(lower)
      );
    }

    return result;
  }, [allCharts, selectedCategory, searchQuery]);

  // Group by category for carousel view
  const chartsByCategory = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery.trim()) return null;
    return categories.reduce((acc, cat) => {
      const charts = allCharts.filter((c) => c.category === cat);
      if (charts.length > 0) acc.push({ category: cat, charts });
      return acc;
    }, [] as { category: ChartCategory; charts: typeof allCharts }[]);
  }, [allCharts, categories, selectedCategory, searchQuery]);

  return (
    <div className="py-8 sm:py-12">
      {/* Header */}
      <div className="px-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Chart Explorer
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Interactive economic charts with multi-causal analysis and verified sources.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 px-6 sm:px-8">
        <div className="mx-auto max-w-6xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category pills — horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-text-primary text-bg-primary'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary'
              }`}
            >
              All Charts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                  selectedCategory === category
                    ? 'bg-text-primary text-bg-primary'
                    : 'bg-bg-secondary text-text-secondary hover:text-text-primary'
                }`}
              >
                {CATEGORY_LABELS[category]}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search charts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-bg-card py-2.5 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-8">
        {filteredCharts.length === 0 ? (
          <div className="mx-6 sm:mx-8">
            <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-bg-secondary py-16 text-center">
              <p className="text-sm text-text-secondary">
                No charts match your search. Try different terms.
              </p>
            </div>
          </div>
        ) : chartsByCategory ? (
          /* Carousel view grouped by category */
          chartsByCategory.map(({ category, charts }) => (
            <section key={category} className="mt-6 first:mt-0">
              <div className="flex items-baseline justify-between px-6 mb-3 sm:px-8">
                <h2 className="font-serif text-lg font-bold tracking-tight">
                  {CATEGORY_LABELS[category]}
                </h2>
                <span className="font-mono text-[10px] text-text-tertiary">
                  {charts.length} chart{charts.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide snap-x sm:px-8">
                {charts.map((chart) => (
                  <ChartCard key={chart.id} chart={chart} />
                ))}
              </div>
            </section>
          ))
        ) : (
          /* Grid view when filtered */
          <div className="px-6 sm:px-8">
            <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCharts.map((chart) => (
                <div key={chart.id} className="[&>a]:w-full">
                  <ChartCard chart={chart} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Count */}
      <p className="mt-6 text-center text-xs text-text-tertiary">
        Showing {filteredCharts.length} of {allCharts.length} charts
      </p>
    </div>
  );
}
