'use client';

import React from 'react';
import { ArrowUpRight, Sparkles, Play, Film, Award } from 'lucide-react';
import { SiteSettings } from '@/types';

interface HeroProps {
  settings?: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  const heroImg =
    settings?.heroImage ||
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80';

  return (
    <section className="relative min-h-[94vh] flex items-center pt-32 pb-20 px-6 md:px-12 overflow-hidden">
      {/* 1. Yavaşça Hareket Eden Arka Plan Gradyanı (Moving Ambient Gradient Mesh) */}
      <div
        className="absolute top-10 left-10 w-[550px] h-[550px] rounded-full blur-[110px] pointer-events-none opacity-25 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.45) 0%, rgba(79, 70, 229, 0.25) 50%, transparent 80%)',
          animationDuration: '10s',
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, rgba(99, 102, 241, 0.2) 60%, transparent 80%)',
        }}
      />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main 2-Column Split Layout */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* SOL ALAN: Sola Yaslı İçerik (7 Kolon) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Subtle pill tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 text-zinc-300 text-xs font-medium mb-6 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kreatif Medya & Dijital Ajans</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Kayseri & Global</span>
          </div>

          {/* Big Agency Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Fikirleri markalara, markaları{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              kalıcı etkiye
            </span>{' '}
            dönüştürüyoruz.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed mb-10">
            {settings?.tagline ||
              'Strateji, prodüksiyon, kurumsal kimlik ve dijital iletişimi aynı yaratıcı bakış altında buluşturuyoruz. Markanızın yalnızca görünmesini değil, hafızalara kazınmasını sağlıyoruz.'}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
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
          <div className="pt-8 border-t border-zinc-800/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
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
              <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-medium">Memnuniyet</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">4K</div>
              <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-medium">Prodüksiyon</div>
            </div>
          </div>
        </div>

        {/* SAĞ ALAN: Gradyan Görseller & Overlay Vitrini (5 Kolon) */}
        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
          {/* Ambient Glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-purple-600/30 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Main Visual Card */}
          <div className="relative w-full max-w-md lg:max-w-none rounded-3xl p-2 bg-gradient-to-b from-zinc-750/50 via-zinc-850/40 to-zinc-900/60 border border-zinc-700/50 backdrop-blur-xl shadow-2xl overflow-hidden group">
            
            {/* Image Container with Gradient Overlays */}
            <div className="relative aspect-[4/5] sm:aspect-[4/4.8] w-full rounded-2xl overflow-hidden bg-zinc-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImg}
                alt="İmperya Media Showcase"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Multi-layered Gradients over Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 via-transparent to-indigo-950/20 mix-blend-overlay" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-semibold text-white tracking-wide">
                  <Film className="w-3 h-3 text-cyan-400" />
                  <span>Sinematik Prodüksiyon</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>CANLI PORTFÖY</span>
                </span>
              </div>

              {/* Floating Bottom Glass Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-zinc-900/85 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-4 transition-transform group-hover:translate-y-[-2px]">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    İmperya Kreatif Vitrini
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    Yeni Nesil Marka Deneyimi
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                    Prodüksiyon • Sosyal Medya • Tasarım
                  </p>
                </div>

                <a
                  href="#islerimiz"
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-110 transition-transform shadow-lg"
                  aria-label="İşlerimizi Gör"
                >
                  <Play className="w-4 h-4 fill-black translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Bottom info strip in card */}
            <div className="py-2.5 px-3 flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Kayseri Stüdyo & Açık Hava
              </span>
              <span className="text-zinc-500 font-mono text-[10px]">#IMPERYA2026</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
