'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center text-text-primary">
          <span className="font-serif text-xl font-bold tracking-tight">
            Check the Charts<span className="text-accent-orange">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="hidden text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary sm:block"
          >
            About
          </Link>
          <Link
            href="/explore"
            className="rounded-full bg-text-primary px-4 py-1.5 text-xs font-bold text-bg-primary transition-colors hover:bg-text-primary/90"
          >
            Explore
          </Link>
        </div>
      </nav>
    </header>
  );
}
