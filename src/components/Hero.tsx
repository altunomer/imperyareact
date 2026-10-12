'use client';

import React from 'react';
import { ArrowUpRight, Sparkles, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden">
      {/* Background radial subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-zinc-700/10 via-zinc-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/70 text-zinc-300 text-xs font-medium mb-8 backdrop-blur-md animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Kreatif Medya & Dijital Ajans</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">Kayseri & Global</span>
        </div>

        {/* Big Agency Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-8 max-w-4xl">
          Fikirleri markalara, markaları{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            kalıcı etkiye
          </span>{' '}
          dönüştürüyoruz.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed mb-12">
          Strateji, prodüksiyon, kurumsal kimlik ve dijital iletişimi aynı yaratıcı bakış altında buluşturuyoruz. Markanızın yalnızca görünmesini değil, hafızalara kazınmasını sağlıyoruz.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#islerimiz"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-black bg-white hover:bg-zinc-200 transition-all duration-300 shadow-xl hover:scale-105"
          >
            <span>Seçili İşleri İncele</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#iletisim"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wide text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all duration-300 backdrop-blur-md"
          >
            <span>Bir Proje Konuşalım</span>
          </a>
        </div>

        {/* Highlights Strip */}
        <div className="mt-20 pt-10 border-t border-zinc-800/80 w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">120+</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-medium">Tamamlanan Proje</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">12+</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-medium">Hizmet Disiplini</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">%99</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-medium">Müşteri Memnuniyeti</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">4K</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-medium">Sinematik Çekim</div>
          </div>
        </div>
      </div>
    </section>
  );
}
