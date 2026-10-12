'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { SiteSettings } from '@/types';

interface MaintenanceOverlayProps {
  settings: SiteSettings;
}

export default function MaintenanceOverlay({ settings }: MaintenanceOverlayProps) {
  const [isAdminPreview, setIsAdminPreview] = useState(false);
  const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    // 1. Check if user is logged in as admin in sessionStorage
    const loggedIn = sessionStorage.getItem('imperya_admin_logged_in') === 'true';
    if (loggedIn) {
      setIsAdminPreview(true);
    }

    // 2. Bot / Crawler check (Googlebot, Bingbot, Yandex, etc.)
    // If a crawler is detected, do not block the page content so SEO rankings are never harmed!
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      'googlebot',
      'bingbot',
      'yandexbot',
      'duckduckbot',
      'baiduspider',
      'slurp',
      'twitterbot',
      'facebookexternalhit',
      'linkedinbot',
      'whatsapp',
    ];
    if (botPatterns.some((pattern) => userAgent.includes(pattern))) {
      setIsBot(true);
    }
  }, []);

  // If maintenance mode is OFF, or visitor is a search bot, or admin is previewing: do not display blocking screen
  if (!settings.maintenanceMode || isBot) {
    return null;
  }

  // If admin has dismissed overlay or is previewing, show a non-intrusive warning banner at the top
  if (isAdminPreview) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500/90 text-black px-4 py-2 text-xs font-bold flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <span>BAKIM MODU AÇIK: Sadece siz yönetici olduğunuz için siteyi görüntülüyorsunuz. Ziyaretçiler yapım aşaması ekranını görüyor.</span>
        </div>
        <Link
          href="/welcome-webmaster"
          className="px-3 py-1 bg-black text-white rounded-md text-[11px] font-semibold hover:bg-zinc-800 transition-colors"
        >
          Panele Git
        </Link>
      </div>
    );
  }

  const whatsappClean = (settings.whatsapp || '').replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-[99] bg-[#09090b] flex flex-col justify-between overflow-y-auto px-6 py-12">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-zinc-700/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="relative max-w-6xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="İmperya Media Solutions"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </div>
      </div>

      {/* Main Announcement */}
      <div className="relative max-w-2xl w-full mx-auto text-center py-16 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>YAPIM AŞAMASINDA & ÇOK YAKINDA</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          {settings.maintenanceTitle || 'Yeni Dijital Deneyimimiz Çok Yakında Yayında.'}
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-10 max-w-xl">
          {settings.maintenanceMessage ||
            'İmperya Media Solutions olarak sizlere daha etkili çözümler sunmak için web sitemizi yeniliyoruz. Yeni projelerimiz ve portfolyomuzla çok yakında buradayız.'}
        </p>

        {/* Quick Contact Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          {whatsappClean && (
            <a
              href={`https://wa.me/${whatsappClean}?text=Merhaba,%20İmperya%20Media%20Solutions%20ile%20projem%20için%20iletişime%20geçmek%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all shadow-xl hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp ile Bize Ulaşın</span>
            </a>
          )}

          <a
            href={`tel:${settings.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 border border-zinc-800 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Hemen Arayın: {settings.phone}</span>
          </a>
        </div>
      </div>

      {/* Footer Details */}
      <div className="relative max-w-4xl w-full mx-auto pt-8 border-t border-zinc-900 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-zinc-600" />
          <span>{settings.address}</span>
        </div>
        <p>&copy; {new Date().getFullYear()} {settings.siteName}. Tüm hakları saklıdır.</p>
      </div>
    </div>
  );
}
