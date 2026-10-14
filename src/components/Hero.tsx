'use client';

import React from 'react';
import { ArrowUpRight, Sparkles, Film } from 'lucide-react';
import { SiteSettings } from '@/types';

interface HeroProps {
  settings?: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  const heroImg =
    settings?.heroImage ||
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80';

  return (
    <section className="relative min-h-[96vh] flex items-center pt-32 pb-24 px-6 md:px-12 overflow-hidden bg-[#09090b]">
      {/* 1. Tam Ekran Görsel & Sola (Yazıya Doğru) Kademeli Kaybolan Sinematik Gradyan */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[65%] xl:w-[60%] h-full overflow-hidden pointer-events-none select-none z-0">
        {/* Background Showcase Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImg}
          alt="İmperya Media Showcase"
          className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-1000 ease-out"
          loading="eager"
        />

        {/* Çok Katmanlı Sinematik Gradyanlar (Kutusuz, Yazıya Doğru Kayboluş) */}
        {/* Sol tarafa (Yazıya doğru) ana yumuşak kayboluş gradyanı */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/85 via-35% sm:via-28% to-transparent" />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#09090b] via-[#09090b]/95 via-30% to-transparent" />

        {/* Üst karartma (Navbar ile kusursuz birleşim) */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#09090b] via-[#09090b]/75 to-transparent" />

        {/* Alt karartma (Sonsuz logolara ve alt bölüme kusursuz akış) */}
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#09090b] via-[#09090b]/85 to-transparent" />

        {/* Sağ kenar yumuşatma */}
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#09090b]/60 to-transparent" />

        {/* Mavi/Indigo marka renk tonlaması */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-transparent to-indigo-900/20 mix-blend-color-dodge opacity-60" />
      </div>

      {/* 2. Yavaşça Hareket Eden Arka Plan Gradyan Parıltısı */}
      <div
        className="absolute top-1/4 left-10 w-[550px] h-[550px] rounded-full blur-[130px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.45) 0%, rgba(79, 70, 229, 0.25) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, rgba(99, 102, 241, 0.2) 60%, transparent 80%)',
        }}
      />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_40%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 3. Foreground Content (Sola Yaslı Metin & Detaylar) */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* SOL ALAN: Sola Yaslı İçerik (8 Kolon - Geniş ve Net Okunur) */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          {/* Subtle pill tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 text-zinc-300 text-xs font-medium mb-6 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kreatif Medya & Dijital Ajans</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Kayseri & Global</span>
          </div>

          {/* Big Agency Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 max-w-3xl drop-shadow-sm">
            Fikirleri markalara, markaları{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
              kalıcı etkiye
            </span>{' '}
            dönüştürüyoruz.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-300/90 max-w-2xl font-normal leading-relaxed mb-10 drop-shadow-sm">
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

        {/* SAĞ ALAN: Serbest, Kutusuz Floating Badge (4 Kolon) */}
        <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center h-full">
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl shadow-2xl max-w-xs animate-in fade-in duration-700 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Film className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Stüdyo & Prodüksiyon
                </span>
                <h4 className="text-xs font-bold text-white">4K Sinematik Çekim</h4>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Kayseri ve global ölçekte üst düzey kreatif video, fotoğraf ve marka çekimleri.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
