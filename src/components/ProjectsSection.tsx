'use client';

import React, { useState } from 'react';
import { ArrowUpRight, X, Calendar, User, Tag } from 'lucide-react';
import { ProjectItem } from '@/types';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Extract unique categories
  const categories = ['Tümü', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'Tümü'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="islerimiz" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">
            PORTFOLYO & İŞLERİMİZ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Gurur duyduğumuz seçili projeler.
          </h2>
        </div>
        <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
          Farklı sektörlerden lider markalar için ürettiğimiz video prodüksiyon, kimlik ve dijital medya işlerimizden bazıları.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-white text-black shadow-lg shadow-white/10'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveModalProject(project)}
            className="group relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all duration-500 cursor-pointer flex flex-col"
          >
            {/* Project Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top tag badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold">
                <span>{project.category}</span>
              </div>

              {/* Floating Arrow on top right */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Project Info */}
            <div className="p-7 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 font-medium mb-2">
                  <span>{project.client}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-zinc-800/60">
                {project.tags?.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-medium text-zinc-400 bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Lightbox Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 z-10 p-2.5 rounded-full text-zinc-400 hover:text-white bg-black/70 backdrop-blur-md border border-white/10 hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full bg-black shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeModalProject.coverImage}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 sm:p-10 overflow-y-auto">
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mb-4">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  Müşteri: <strong className="text-zinc-200">{activeModalProject.client}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-zinc-400" />
                  Kategori: <strong className="text-zinc-200">{activeModalProject.category}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  Yıl: <strong className="text-zinc-200">{activeModalProject.year}</strong>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {activeModalProject.title}
              </h3>

              <p className="text-zinc-300 leading-relaxed mb-6 font-normal">
                {activeModalProject.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {activeModalProject.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-zinc-800 flex justify-end">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
