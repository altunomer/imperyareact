'use client';

import React from 'react';
import { ReferenceItem } from '@/types';

interface MarqueeReferencesProps {
  references: ReferenceItem[];
}

export default function MarqueeReferences({ references }: MarqueeReferencesProps) {
  const activeRefs = references.filter((r) => r.active);
  // Replicate twice to achieve a seamless infinite loop
  const displayList = [...activeRefs, ...activeRefs];

  if (activeRefs.length === 0) return null;

  return (
    <section id="referanslar" className="relative py-20 border-y border-zinc-900 bg-zinc-950/60 overflow-hidden">
      {/* Gradient fade on edges for smooth blend */}
      <div className="absolute left-0 inset-y-0 w-24 sm:w-48 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 sm:w-48 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-400">
          GÜVENEN MARKALAR & REFERANSLAR
        </span>
      </div>

      {/* Infinite Logo Marquee Track */}
      <div className="flex overflow-hidden select-none">
        <div className="animate-marquee items-center gap-10 sm:gap-16 py-2">
          {displayList.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center justify-center px-6 py-4 rounded-xl border border-zinc-800/40 bg-zinc-900/30 hover:border-zinc-700/80 hover:bg-zinc-800/40 transition-all duration-300 group cursor-default min-w-[160px] sm:min-w-[200px]"
            >
              {item.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-8 sm:h-10 max-w-[140px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <div className="text-center">
                  <span className="text-sm sm:text-base font-bold tracking-widest uppercase text-zinc-400 group-hover:text-white transition-colors duration-300">
                    {item.logoText || item.name}
                  </span>
                  {item.category && (
                    <span className="block text-[10px] text-zinc-400 tracking-wider mt-0.5 font-medium">
                      {item.category}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
