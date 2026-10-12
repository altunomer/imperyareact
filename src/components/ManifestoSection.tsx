'use client';

import React from 'react';
import { Sparkles, Eye, Target, Zap } from 'lucide-react';

export default function ManifestoSection() {
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
      <div className="relative rounded-3xl p-10 md:p-16 border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-6">
            BİZ KİMİZ & VİZYONUMUZ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
            &ldquo;Sıradanlığı reddediyor, markanıza hak ettiği prestiji kazandırıyoruz.&rdquo;
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            İmperya Media Solutions; prodüksiyon, kurumsal kimlik, açık hava reklamcılığı ve dijital pazarlamayı tek bir çatı altında birleştiren yeni nesil bir medya ajansıdır. Kayseri merkezli ofisimizden Türkiye ve dünyaya yaratıcı değer üretiyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-zinc-800/80">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/70 border border-zinc-700/60 flex items-center justify-center text-white mb-4">
                  <Icon className="w-5 h-5" />
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
