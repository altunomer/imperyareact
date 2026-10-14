'use client';

import React from 'react';
import { Users, Sparkles } from 'lucide-react';
import { TeamMember } from '@/types';
import { initialTeamMembers } from '@/data/initialData';

function InstagramIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface TeamSectionProps {
  teamMembers?: TeamMember[];
}

export default function TeamSection({ teamMembers }: TeamSectionProps) {
  const activeMembers =
    teamMembers && teamMembers.length > 0
      ? teamMembers.filter((m) => m.active !== false).sort((a, b) => a.order - b.order)
      : initialTeamMembers;

  return (
    <section id="ekibimiz" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>KREATİF KADROMUZ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Fikirlerin Arkasındaki Ekip
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
            Markanızın vizyonunu inşa eden kreatif yönetmenler, sinematik prodüksiyon uzmanları, stratejistler ve yazılım mimarları.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Multidisipliner Ajans Yapısı</span>
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {activeMembers.map((member) => (
          <div
            key={member.id}
            className="group relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-all duration-500 shadow-xl flex flex-col"
          >
            {/* Image Container with Gradient Overlay */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={member.name}
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />

              {/* Social Links on Top Right */}
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} Instagram`}
                    className="w-8 h-8 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-white hover:bg-black/90 transition-colors shadow-lg"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="w-8 h-8 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-white hover:bg-black/90 transition-colors shadow-lg"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Bottom Content overlay inside image */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-1 line-clamp-1">
                  {member.role}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {member.name}
                </h3>
              </div>
            </div>

            {/* Bio snippet under card */}
            {member.bio && (
              <div className="p-4 pt-3 border-t border-zinc-900 bg-zinc-950/80 flex-grow">
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {member.bio}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
