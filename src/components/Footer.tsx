'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Shield, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { SiteSettings, ServiceItem } from '@/types';
import LegalModals, { LegalDocType } from './LegalModals';

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
  const [activeLegalModal, setActiveLegalModal] = useState<LegalDocType>(null);

  return (
    <>
      <footer className="border-t border-zinc-900 bg-black pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
            {/* Brand info */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="İmperya Media Solutions"
                  className="h-9 w-auto object-contain"
                />
              </Link>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">
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
                <li className="pt-2">
                  <Link
                    href="/odeme"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Online Ödeme</span>
                  </Link>
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

          {/* PAYTR & ÖDEME GÜVENLİK ROZETLERİ (PayTR Onayı İçin Zorunlu) */}
          <div className="py-8 border-b border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="text-xs font-bold text-white tracking-wider uppercase">
                GÜVENLİ ÖDEME ALTYAPISI
              </span>
              <p className="text-[11px] text-zinc-400 max-w-md">
                Tüm kredi ve banka kartı ödemeleriniz 256-Bit SSL şifreleme ve 3D Secure güvencesiyle <strong>PayTR</strong> altyapısı üzerinden gerçekleştirilir.
              </p>
            </div>

            {/* Payment & Security Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* PayTR Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-[11px] font-bold">
                <span className="text-emerald-400">●</span>
                <span>PayTR</span>
                <span className="text-[10px] text-zinc-400 font-normal">Güvenli Ödeme</span>
              </div>

              {/* Troy Badge */}
              <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-[11px] font-bold tracking-wider">
                <span className="text-cyan-400">TROY</span>
              </div>

              {/* Visa Badge */}
              <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-[11px] font-bold tracking-wider">
                <span className="text-blue-400">VISA</span>
              </div>

              {/* Mastercard Badge */}
              <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-[11px] font-bold tracking-wider">
                <span className="text-amber-400">Mastercard</span>
              </div>

              {/* 256-Bit SSL Badge */}
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-semibold">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>256-Bit SSL</span>
              </div>

              {/* 3D Secure Badge */}
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-semibold">
                <Shield className="w-3 h-3 text-blue-400" />
                <span>3D Secure</span>
              </div>
            </div>
          </div>

          {/* ZORUNLU YASAL SÖZLEŞME BAĞLANTILARI (PayTR Denetimi) */}
          <div className="py-6 border-b border-zinc-900 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-zinc-400">
            <button
              onClick={() => setActiveLegalModal('mesafeli')}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              Mesafeli Satış Sözleşmesi
            </button>
            <button
              onClick={() => setActiveLegalModal('iade')}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              İptal ve İade Koşulları
            </button>
            <button
              onClick={() => setActiveLegalModal('gizlilik')}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              Gizlilik ve Güvenlik Politikası
            </button>
            <button
              onClick={() => setActiveLegalModal('kvkk')}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              KVKK Aydınlatma Metni & Teslimat
            </button>
            <Link
              href="/odeme"
              className="text-zinc-300 hover:text-white font-medium underline underline-offset-4"
            >
              Online Tahsilat Ekranı
            </Link>
          </div>

          {/* Bottom copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
            <p>
              &copy; {currentYear} {settings.siteName}. Tüm hakları saklıdır.
            </p>

            <div className="flex items-center gap-6">
              <span>Kayseri Dijital & Medya Ajansı</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Render Legal Modal if clicked */}
      {activeLegalModal && (
        <LegalModals settings={settings} />
      )}
    </>
  );
}
