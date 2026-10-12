'use client';

import React, { useState } from 'react';
import {
  Share2,
  Video,
  Palette,
  Globe,
  ShoppingBag,
  TrendingUp,
  Maximize2,
  Briefcase,
  BookOpen,
  Camera,
  Compass,
  Send,
  ArrowUpRight,
  X,
  CheckCircle2,
} from 'lucide-react';
import { ServiceItem } from '@/types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceForQuote?: (serviceTitle: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Share2,
  Video,
  Palette,
  Globe,
  ShoppingBag,
  TrendingUp,
  Maximize2,
  Briefcase,
  BookOpen,
  Camera,
  Compass,
  Send,
};

export default function ServicesSection({ services, onSelectServiceForQuote }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const activeServices = services.filter((s) => s.active);

  return (
    <section id="hizmetler" className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">
            NELER YAPIYORUZ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Uçtan uca yaratıcı & dijital çözümler.
          </h2>
        </div>
        <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
          Markanızı 360 derece çevreleyen, stratejiden üretime ve dijital büyümeye kadar 12 temel disiplinde uzman hizmetler sunuyoruz.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeServices.map((service, index) => {
          const IconComponent = ICON_MAP[service.icon] || Globe;
          const displayIndex = String(index + 1).padStart(2, '0');

          return (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative flex flex-col justify-between p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200 group-hover:bg-white group-hover:text-black group-hover:scale-105 transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {displayIndex}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-zinc-100 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                  {service.shortDesc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags?.slice(0, 3).map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-zinc-900/80 text-zinc-400 border border-zinc-800/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
                  <span>Detayları İncele</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl p-8 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-bold">
                {React.createElement(ICON_MAP[selectedService.icon] || Globe, { className: 'w-7 h-7' })}
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Hizmet Detayı
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-zinc-300 text-base leading-relaxed mb-6 font-normal">
              {selectedService.detailedDesc || selectedService.shortDesc}
            </p>

            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Kapsam & Çıktılar:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.tags?.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#iletisim"
                onClick={() => {
                  if (onSelectServiceForQuote) onSelectServiceForQuote(selectedService.title);
                  setSelectedService(null);
                }}
                className="w-full sm:w-auto flex-1 text-center py-3.5 px-6 rounded-full text-sm font-semibold text-black bg-white hover:bg-zinc-200 transition-colors"
              >
                Bu Hizmet İçin Teklif Al
              </a>
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto py-3.5 px-6 rounded-full text-sm font-medium text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-900 transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
