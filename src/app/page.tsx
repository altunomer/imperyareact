'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeReferences from '@/components/MarqueeReferences';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import ManifestoSection from '@/components/ManifestoSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import {
  getServices,
  getReferences,
  getProjects,
  getSettings,
} from '@/lib/storage';
import {
  ServiceItem,
  ReferenceItem,
  ProjectItem,
  SiteSettings,
} from '@/types';
import { initialServices, initialReferences, initialProjects, initialSettings } from '@/data/initialData';

export default function HomePage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [references, setReferences] = useState<ReferenceItem[]>(initialReferences);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [preselectedService, setPreselectedService] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      const [srv, refs, prj, setts] = await Promise.all([
        getServices(),
        getReferences(),
        getProjects(),
        getSettings(),
      ]);
      setServices(srv);
      setReferences(refs);
      setProjects(prj);
      setSettings(setts);
    }
    loadData();
  }, []);

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-[#f4f4f5]">
      {/* Sticky Glass Navbar */}
      <Navbar settings={settings} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Referanslarımız - Infinite Logo Marquee */}
        <MarqueeReferences references={references} />

        {/* 3. Hizmetlerimiz (12 Services) */}
        <ServicesSection
          services={services}
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* 4. Yapılan İşler (Portfolio & Projects) */}
        <ProjectsSection projects={projects} />

        {/* 5. Neden İmperya & Manifesto */}
        <ManifestoSection />

        {/* 6. İletişim & Teklif Formu */}
        <ContactSection
          settings={settings}
          services={services}
          preselectedService={preselectedService}
        />
      </main>

      {/* Footer */}
      <Footer settings={settings} services={services} />
    </div>
  );
}
