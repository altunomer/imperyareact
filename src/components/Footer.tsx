'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Shield } from 'lucide-react';
import { SiteSettings, ServiceItem } from '@/types';

interface FooterProps {
  settings: SiteSettings;
  services: ServiceItem[];
}

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

export default function Footer({ settings, services }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-black pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          {/* Brand info */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-black text-xl tracking-tighter">
                İ
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white">
                  İMPERYA
                </span>
                <span className="text-[10px] tracking-widest uppercase text-zinc-400 font-medium -mt-1">
                  MEDIA SOLUTIONS
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-sm">
              {settings.tagline}
            </p>

            <div className="text-xs text-zinc-400 leading-relaxed max-w-xs mb-8">
              <span className="block font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Merkez Ofis
              </span>
              {settings.address}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-6">
              Hızlı Menü
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-zinc-400">
              <li>
                <a href="#hizmetler" className="hover:text-white transition-colors">
                  Hizmetlerimiz
                </a>
              </li>
              <li>
                <a href="#islerimiz" className="hover:text-white transition-colors">
                  İşlerimiz
                </a>
              </li>
              <li>
                <a href="#referanslar" className="hover:text-white transition-colors">
                  Referanslarımız
                </a>
              </li>
              <li>
                <a href="#hakkimizda" className="hover:text-white transition-colors">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#iletisim" className="hover:text-white transition-colors">
                  İletişim & Teklif
                </a>
              </li>
            </ul>
          </div>

          {/* Services Columns */}
          <div className="lg:col-span-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-6">
              Hizmet Alanlarımız
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-400">
              {services.slice(0, 12).map((srv) => (
                <a
                  key={srv.id}
                  href="#hizmetler"
                  className="hover:text-zinc-200 transition-colors line-clamp-1"
                >
                  {srv.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & admin */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>
            &copy; {currentYear} {settings.siteName}. Tüm hakları saklıdır.
          </p>

          <div className="flex items-center gap-6">
            <span>Kayseri Dijital & Medya Ajansı</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Yönetim Paneli</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
