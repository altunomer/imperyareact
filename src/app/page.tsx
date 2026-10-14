'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeReferences from '@/components/MarqueeReferences';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import ManifestoSection from '@/components/ManifestoSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MaintenanceOverlay from '@/components/MaintenanceOverlay';
import {
  getServices,
  getReferences,
  getProjects,
  getSettings,
  getTeamMembers,
} from '@/lib/storage';
import {
  ServiceItem,
  ReferenceItem,
  ProjectItem,
  SiteSettings,
  TeamMember,
} from '@/types';
import {
  initialServices,
  initialReferences,
  initialProjects,
  initialSettings,
  initialTeamMembers,
} from '@/data/initialData';

export default function HomePage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [references, setReferences] = useState<ReferenceItem[]>(initialReferences);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [preselectedService, setPreselectedService] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      const [srv, refs, prj, setts, team] = await Promise.all([
        getServices(),
        getReferences(),
        getProjects(),
        getSettings(),
        getTeamMembers(),
      ]);
      setServices(srv);
      setReferences(refs);
      setProjects(prj);
      setSettings(setts);
      setTeamMembers(team);
    }
    loadData();
  }, []);

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#09090b] text-[#f4f4f5] overflow-x-hidden">
      {/* Site Genel Arka Planı: Siyaha Çok Hafif Mavi Animasyonlu Hareketli Renk */}
      <div className="ambient-site-bg" aria-hidden="true" />

      {/* Sticky Glass Navbar */}
      <Navbar settings={settings} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-grow">
        {/* 1. Hero (Sola Yaslı İçerik & Sağ Gradyan Overlay) */}
        <Hero settings={settings} />

        {/* 2. Referanslarımız - Infinite Logo Marquee */}
        <MarqueeReferences references={references} />

        {/* 3. Hizmetlerimiz (12 Services) */}
        <ServicesSection
          services={services}
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* 4. Yapılan İşler (Portfolio & Projects) */}
        <ProjectsSection projects={projects} />

        {/* 5. Neden İmperya & Biz Kimiz & Vizyonumuz (Overlay Görselli) */}
        <ManifestoSection settings={settings} />

        {/* 6. Ekibimiz (Our Team) */}
        <TeamSection teamMembers={teamMembers} />

        {/* 7. İletişim & Teklif Formu */}
        <ContactSection
          settings={settings}
          services={services}
          preselectedService={preselectedService}
        />
      </main>

      {/* Footer */}
      <Footer settings={settings} services={services} />

      {/* SEO-safe Maintenance Mode Overlay */}
      <MaintenanceOverlay settings={settings} />
    </div>
  );
}
