'use client';

import React from 'react';
import { Eye, Target, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '@/types';

interface ManifestoSectionProps {
  settings?: SiteSettings;
}

export default function ManifestoSection({ settings }: ManifestoSectionProps) {
  const aboutImg =
    settings?.aboutImage ||
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';

  const pillars = [
    {
      icon: Eye,
      title: 'Yaratıcı Bakış',
      desc: 'Standart şablonlara değil, markanızın özgün hikayesine odaklanan yenilikçi görsel diller geliştiriyoruz.',
    },
    {
      icon: Target,
      title: 'Stratejik Hedefleme',
      desc: 'Sadece güzel görünen değil, hedef kitlenizi harekete geçiren ve ölçülebilir sonuçlar üreten planlar yapıyoruz.',
    },
    {
      icon: Zap,
      title: 'Hızlı & Kusursuz İcra',
      desc: 'Son teknoloji prodüksiyon ekipmanları ve dijital altyapımızla fikirlerinizi gecikmeden gerçeğe dönüştürüyoruz.',
    },
  ];

  return (
    <section id="hakkimizda" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 overflow-hidden shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-600/10 via-indigo-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Üst Alan: 2 Kolonlu İçerik + Overlay Görsel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 relative z-10">
          
          {/* Sol Kolon: Metin & Vizyon (7 Kolon) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>BİZ KİMİZ & VİZYONUMUZ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              &ldquo;Sıradanlığı reddediyor, markanıza hak ettiği prestiji kazandırıyoruz.&rdquo;
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-6">
              İmperya Media Solutions; prodüksiyon, kurumsal kimlik, açık hava reklamcılığı ve dijital pazarlamayı tek bir çatı altında birleştiren yeni nesil bir medya ajansıdır. Kayseri merkezli ofisimizden Türkiye ve dünyaya yaratıcı değer üretiyoruz.
            </p>

            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-8">
              Her projeyi yalnızca bir teslimat olarak değil; markanızın uzun vadeli büyümesini, prestijini ve hafızalardaki kalıcılığını inşa eden stratejik bir sanat eseri olarak ele alıyoruz.
            </p>

            {/* Quick trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tek Elden 360° Medya Yönetimi</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>4K Sinematik & Drone Prodüksiyon</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Veri Odaklı Performans Reklamları</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Stratejik Kurumsal İtibar Yönetimi</span>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Admin Panelden Düzenlenebilir Overlay Görsel (5 Kolon) */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            {/* Ambient card back glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-purple-500/20 rounded-3xl blur-xl opacity-75 pointer-events-none" />

            <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-700/60 bg-zinc-950 shadow-2xl group">
              <div className="aspect-[4/3] sm:aspect-[16/11] w-full relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aboutImg}
                  alt="Biz Kimiz & İmperya Stüdyo"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

                {/* Floating Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[11px] font-semibold text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>İmperya Kreatif Atölyesi</span>
                  </span>
                </div>

                {/* Floating Bottom Info Tag */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 backdrop-blur-md">
                  <p className="text-xs font-semibold text-white">
                    Fikirlerden Gerçeğe Yolculuk
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Kayseri & Türkiye Çapında Prestijli Marka Çözümleri
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Alt Alan: 3 Temel İlke (Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-zinc-800/80 relative z-10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/70 border border-zinc-700/60 flex items-center justify-center text-white mb-4 shadow-md">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
