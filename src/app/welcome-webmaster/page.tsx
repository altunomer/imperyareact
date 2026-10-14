'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Layers,
  Image,
  Briefcase,
  Settings,
  Inbox,
  Plus,
  Trash2,
  Edit2,
  Save,
  Check,
  Eye,
  LogOut,
  ArrowLeft,
  ExternalLink,
  MessageSquare,
  Lock,
  Users,
} from 'lucide-react';
import {
  ServiceItem,
  ReferenceItem,
  ProjectItem,
  SiteSettings,
  ContactInquiry,
  TeamMember,
} from '@/types';
import {
  getServices,
  saveServices,
  getReferences,
  saveReferences,
  getProjects,
  saveProjects,
  getSettings,
  saveSettings,
  getInquiries,
  deleteInquiry,
  getTeamMembers,
  saveTeamMembers,
} from '@/lib/storage';
import {
  initialServices,
  initialReferences,
  initialProjects,
  initialSettings,
  initialTeamMembers,
} from '@/data/initialData';
import { optimizeImageFile } from '@/lib/imageOptimizer';
import { testPayTRCredentials } from '@/lib/paytr';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<
    'references' | 'services' | 'projects' | 'team' | 'settings' | 'inquiries'
  >('references');

  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [references, setReferences] = useState<ReferenceItem[]>(initialReferences);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [team, setTeam] = useState<TeamMember[]>(initialTeamMembers);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [paytrTesting, setPaytrTesting] = useState(false);
  const [paytrTestResult, setPaytrTestResult] = useState<{
    success: boolean;
    message: string;
    sampleLink?: string;
  } | null>(null);

  const handleTestPayTR = async () => {
    setPaytrTesting(true);
    setPaytrTestResult(null);
    try {
      const res = await testPayTRCredentials(
        settings.paytrMerchantId,
        settings.paytrMerchantKey,
        settings.paytrMerchantSalt
      );
      setPaytrTestResult(res);
    } catch (e: any) {
      setPaytrTestResult({
        success: false,
        message: e?.message || 'PayTR testi sırasında bir hata oluştu.',
      });
    } finally {
      setPaytrTesting(false);
    }
  };

  // Modals / Editing state
  const [editingReference, setEditingReference] = useState<ReferenceItem | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    // Check local session
    const savedAuth = sessionStorage.getItem('imperya_admin_logged_in');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const loadAllData = async () => {
    const [srv, refs, prj, teamData, setts, inq] = await Promise.all([
      getServices(),
      getReferences(),
      getProjects(),
      getTeamMembers(),
      getSettings(),
      getInquiries(),
    ]);
    setServices(srv);
    setReferences(refs);
    setProjects(prj);
    setTeam(teamData);
    setSettings(setts);
    setInquiries(inq);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin password for ease of access
    if (passwordInput === 'imperya2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('imperya_admin_logged_in', 'true');
      setAuthError('');
      loadAllData();
    } else {
      setAuthError('Geçersiz şifre! (Varsayılan: imperya2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('imperya_admin_logged_in');
  };

  const showToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  // --- REFERENCE ACTIONS ---
  const handleSaveReference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReference) return;

    let updated: ReferenceItem[];
    if (editingReference.id === 'new') {
      const newItem: ReferenceItem = {
        ...editingReference,
        id: Date.now().toString(),
      };
      updated = [newItem, ...references];
    } else {
      updated = references.map((r) =>
        r.id === editingReference.id ? editingReference : r
      );
    }
    setReferences(updated);
    await saveReferences(updated);
    setEditingReference(null);
    showToast('Referans logosu kaydedildi.');
  };

  const handleDeleteReference = async (id: string) => {
    if (!confirm('Bu referansı silmek istediğinizden emin misiniz?')) return;
    const updated = references.filter((r) => r.id !== id);
    setReferences(updated);
    await saveReferences(updated);
    showToast('Referans silindi.');
  };

  // --- PROJECT ACTIONS ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updated: ProjectItem[];
    if (editingProject.id === 'new') {
      const newItem: ProjectItem = {
        ...editingProject,
        id: Date.now().toString(),
        slug: editingProject.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      };
      updated = [newItem, ...projects];
    } else {
      updated = projects.map((p) =>
        p.id === editingProject.id ? editingProject : p
      );
    }
    setProjects(updated);
    await saveProjects(updated);
    setEditingProject(null);
    showToast('Proje kaydedildi.');
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    await saveProjects(updated);
    showToast('Proje silindi.');
  };

  // --- SERVICE ACTIONS ---
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const updated = services.map((s) =>
      s.id === editingService.id ? editingService : s
    );
    setServices(updated);
    await saveServices(updated);
    setEditingService(null);
    showToast('Hizmet güncellendi.');
  };

  // --- TEAM MEMBER ACTIONS ---
  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeamMember) return;

    let updated: TeamMember[];
    if (editingTeamMember.id === 'new') {
      const newItem: TeamMember = {
        ...editingTeamMember,
        id: Date.now().toString(),
        order: editingTeamMember.order || team.length + 1,
      };
      updated = [...team, newItem];
    } else {
      updated = team.map((m) =>
        m.id === editingTeamMember.id ? editingTeamMember : m
      );
    }
    setTeam(updated);
    await saveTeamMembers(updated);
    setEditingTeamMember(null);
    showToast('Ekip üyesi kaydedildi.');
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm('Bu ekip üyesini silmek istediğinizden emin misiniz?')) return;
    const updated = team.filter((m) => m.id !== id);
    setTeam(updated);
    await saveTeamMembers(updated);
    showToast('Ekip üyesi silindi.');
  };

  // --- SETTINGS ACTIONS ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(settings);
    showToast('Site ayarları güncellendi.');
  };

  // --- INQUIRY ACTIONS ---
  const handleDeleteInquiry = async (id: string) => {
    await deleteInquiry(id);
    setInquiries(inquiries.filter((i) => i.id !== id));
    showToast('Talep silindi.');
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 text-white">
        <div className="w-full max-w-md p-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <picture>
                <source srcSet="/logo.webp, /logo-2x.webp 2x" type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="İmperya Media Solutions"
                  width="180"
                  height="42"
                  className="h-10 w-auto object-contain"
                />
              </picture>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Yönetim Paneli</h1>
            <p className="text-xs text-zinc-400 mt-1">Lütfen yönetici şifrenizi giriniz</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Yönetici Şifresi
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Şifrenizi yazın..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
              </div>
              {authError && <p className="text-xs text-red-400 mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors mt-2"
            >
              Panele Giriş Yap
            </button>

            <div className="text-center mt-4">
              <Link
                href="/"
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Web Sitesine Dön</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-white text-black text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Siteye Git</span>
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm tracking-tight">İMPERYA</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
              YÖNETİM PANELİ
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Çıkış Yap</span>
        </button>
      </header>

      {/* Main Admin Area */}
      <div className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab('references')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'references'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Referanslar ({references.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'services'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Hizmetlerimiz ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'projects'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Yapılan İşler ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'team'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Ekibimiz ({team.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'inquiries'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Gelen Talepler ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'settings'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site & İletişim</span>
          </button>
        </div>

        {/* TAB 1: REFERANSLAR (LOGOLAR) */}
        {activeTab === 'references' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Referanslar & Kayan Logolar</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Ana sayfadaki sonsuz kayan bantta yer alan marka logolarını yönetin.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingReference({
                    id: 'new',
                    name: '',
                    category: '',
                    logoText: '',
                    logoUrl: '',
                    websiteUrl: '',
                    order: references.length + 1,
                    active: true,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Yeni Referans Ekle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {references.map((ref) => (
                <div
                  key={ref.id}
                  className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-white">{ref.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ref.active
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        {ref.active ? 'Yayında' : 'Pasif'}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 mb-2">
                      Kategori: <strong className="text-zinc-300">{ref.category || '-'}</strong>
                    </p>

                    <div className="h-14 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-center p-2 mb-4">
                      {ref.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={ref.logoUrl}
                          alt={ref.name}
                          className="max-h-full max-w-full object-contain grayscale"
                        />
                      ) : (
                        <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                          {ref.logoText || ref.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800/60">
                    <button
                      onClick={() => setEditingReference(ref)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteReference(ref.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HİZMETLERİMİZ */}
        {activeTab === 'services' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Hizmetlerimiz (12 Alan)</h2>
              <p className="text-xs text-zinc-400 mt-1">
                İmperya Media Solutions bünyesindeki hizmetlerin başlık ve açıklamalarını güncelleyin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv, index) => (
                <div
                  key={srv.id}
                  className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-zinc-400">
                        #{String(index + 1).padStart(2, '0')}
                      </span>
                      <button
                        onClick={() => setEditingService(srv)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{srv.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">{srv.shortDesc}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/60">
                    {srv.tags?.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: YAPILAN İŞLER */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Portfolyo & Yapılan İşler</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Müşterileriniz için tamamlanan görsel ve dijital işleri portfolyoya ekleyin.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingProject({
                    id: 'new',
                    slug: '',
                    title: '',
                    client: '',
                    category: 'Prodüksiyon & Çekim',
                    year: '2026',
                    coverImage:
                      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
                    summary: '',
                    tags: ['Prodüksiyon', 'Kreatif'],
                    featured: true,
                    order: projects.length + 1,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Yeni Proje Ekle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-zinc-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={proj.coverImage}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/10">
                        {proj.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-zinc-400 font-medium mb-1">
                        <span>{proj.client}</span>
                        <span>{proj.year}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{proj.title}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {proj.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingProject(proj)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: EKİBİMİZ */}
        {activeTab === 'team' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Ekibimiz & Kadro</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Ana sayfadaki "Ekibimiz" alanında sergilenen takım arkadaşlarını yönetin.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingTeamMember({
                    id: 'new',
                    name: '',
                    role: '',
                    image: '',
                    bio: '',
                    instagram: '',
                    linkedin: '',
                    order: team.length + 1,
                    active: true,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Ekip Üyesi Ekle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex flex-col justify-between gap-4 group"
                >
                  <div>
                    <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-zinc-950 mb-3 border border-zinc-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-2 right-2">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            member.active
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-zinc-800 text-zinc-500'
                          }`}
                        >
                          {member.active ? 'Yayında' : 'Gizli'}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                      {member.role}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{member.name}</h3>
                    {member.bio && (
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Sıra: #{member.order}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingTeamMember(member)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Düzenle"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeamMember(member.id)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GELEN TALEPLER */}
        {activeTab === 'inquiries' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Gelen Proje Talepleri</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Web sitenizdeki teklif formunu dolduran müşterilerin mesajları.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 text-zinc-500 text-sm">
                Henüz gelen bir teklif talebi bulunmuyor.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {inquiries.map((inq) => {
                  const whatsappClean = (inq.phone || '').replace(/[^0-9]/g, '');
                  return (
                    <div
                      key={inq.id}
                      className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-bold text-white">{inq.name}</h3>
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                            {inq.service}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {new Date(inq.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mb-3">
                          <span>Tel: <strong className="text-zinc-200">{inq.phone}</strong></span>
                          {inq.email && <span>E-Posta: <strong className="text-zinc-200">{inq.email}</strong></span>}
                        </div>

                        <p className="text-xs text-zinc-300 bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 leading-relaxed max-w-2xl">
                          {inq.message || 'Özel mesaj girilmedi.'}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {whatsappClean && (
                          <a
                            href={`https://wa.me/${whatsappClean}?text=Merhaba%20${encodeURIComponent(
                              inq.name
                            )},%20İmperya%20Media%20Solutions%20olarak%20teklif%20talebiniz%20için%20yazıyoruz.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp'tan Yaz</span>
                          </a>
                        )}

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2.5 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Talebi Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SITE & İLETİŞİM AYARLARI */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Site & İletişim Bilgileri</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Adres, telefon, e-posta ve sosyal medya bağlantılarını güncelleyin.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Ajans Adı
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Slogan / Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  Tam Ofis Adresi
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Telefon</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">WhatsApp No</label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">E-Posta</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Instagram Bağlantısı
                  </label>
                  <input
                    type="text"
                    value={settings.instagram}
                    onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    LinkedIn Bağlantısı
                  </label>
                  <input
                    type="text"
                    value={settings.linkedin}
                    onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              {/* GÖRSEL VE VİTRİN AYARLARI */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 mt-4 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Image className="w-4 h-4 text-blue-400" />
                    <span>Görsel & Vitrin Ayarları</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Giriş (Hero) alanındaki sağ vitrin görseli ve Biz Kimiz & Vizyonumuz kutusundaki overlay görseli buradan güncelleyebilirsiniz.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hero Görseli */}
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-zinc-300">
                        Giriş (Hero) Vitrin Görseli
                      </label>
                      <label className="cursor-pointer text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                        <span>⚡ Sıkıştır & Yükle</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const opt = await optimizeImageFile(file, 1200, 1500, 0.85);
                                setSettings({ ...settings, heroImage: opt.dataUrl });
                                showToast(`Hero görseli optimize edildi: ${(opt.originalSize / 1024).toFixed(0)}KB ➔ ${(opt.optimizedSize / 1024).toFixed(0)}KB`);
                              } catch {
                                alert('Görsel sıkıştırılamadı');
                              }
                            }
                          }}
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      placeholder="https://... veya dosya yükleyin"
                      value={settings.heroImage || ''}
                      onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-zinc-500 mb-3"
                    />

                    {settings.heroImage && (
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={settings.heroImage}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Biz Kimiz Görseli */}
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-zinc-300">
                        Biz Kimiz & Vizyon Görseli
                      </label>
                      <label className="cursor-pointer text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                        <span>⚡ Sıkıştır & Yükle</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const opt = await optimizeImageFile(file, 1200, 800, 0.85);
                                setSettings({ ...settings, aboutImage: opt.dataUrl });
                                showToast(`Hakkımızda görseli optimize edildi: ${(opt.originalSize / 1024).toFixed(0)}KB ➔ ${(opt.optimizedSize / 1024).toFixed(0)}KB`);
                              } catch {
                                alert('Görsel sıkıştırılamadı');
                              }
                            }
                          }}
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      placeholder="https://... veya dosya yükleyin"
                      value={settings.aboutImage || ''}
                      onChange={(e) => setSettings({ ...settings, aboutImage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-zinc-500 mb-3"
                    />

                    {settings.aboutImage && (
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={settings.aboutImage}
                          alt="About Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* YAPIM AŞAMASI MODU (MAINTENANCE) */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Yapım Aşaması Modu</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${settings.maintenanceMode ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                        {settings.maintenanceMode ? 'ŞU AN AKTİF' : 'KAPALI (Site Yayında)'}
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Aktif edildiğinde ziyaretçilere şık bir duyuru gösterilir. Arama motoru botları (Googlebot vb.) arka plandaki ajans anahtar kelimelerinizi okumaya devam eder, sıralama kaybı yaşanmaz.
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {settings.maintenanceMode && (
                  <div className="space-y-4 pt-3 border-t border-zinc-800/80 animate-in fade-in">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Duyuru Başlığı
                      </label>
                      <input
                        type="text"
                        value={settings.maintenanceTitle}
                        onChange={(e) => setSettings({ ...settings, maintenanceTitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Duyuru Mesajı
                      </label>
                      <textarea
                        rows={2}
                        value={settings.maintenanceMessage}
                        onChange={(e) => setSettings({ ...settings, maintenanceMessage: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-zinc-500 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* PAYTR ENTEGRASYONU */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>PayTR Sanal POS Entegrasyonu</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        3D Secure
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        🛡️ Kalıcı Korumalı
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      PayTR API anahtarlarınız Cloudflare Worker ve KV üzerinde kalıcı olarak korunmaktadır. Formu boş bıraksanız veya başka bir ayarı güncelleseniz dahi mevcut API anahtarlarınız asla silinmez.
                    </p>
                  </div>

                  <Link
                    href="/odeme"
                    target="_blank"
                    className="text-xs text-zinc-300 hover:text-white underline underline-offset-4"
                  >
                    Ödeme Sayfasını Aç ↗
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Mağaza No (Merchant ID)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 123456"
                      value={settings.paytrMerchantId}
                      onChange={(e) => setSettings({ ...settings, paytrMerchantId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-zinc-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Mağaza Parolası (Merchant Key)
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={settings.paytrMerchantKey}
                      onChange={(e) => setSettings({ ...settings, paytrMerchantKey: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-zinc-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Mağaza Gizli Anahtar (Salt)
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={settings.paytrMerchantSalt}
                      onChange={(e) => setSettings({ ...settings, paytrMerchantSalt: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-zinc-500 font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-3 border-t border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="paytrTest"
                      checked={settings.paytrTestMode}
                      onChange={(e) => setSettings({ ...settings, paytrTestMode: e.target.checked })}
                      className="rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                    />
                    <label htmlFor="paytrTest" className="text-xs text-zinc-300 font-medium">
                      Test Modu (PayTR test kartları ile denemek için işaretleyin)
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleTestPayTR}
                    disabled={paytrTesting}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {paytrTesting ? 'Doğrulanıyor...' : '⚡ PayTR Bağlantısını Canlı Test Et'}
                  </button>
                </div>

                {paytrTestResult && (
                  <div
                    className={`mt-4 p-4 rounded-xl text-xs flex items-start gap-2.5 ${
                      paytrTestResult.success
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                        : 'bg-red-500/10 border border-red-500/30 text-red-300'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5 font-bold">
                      {paytrTestResult.success ? '✅' : '❌'}
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold">{paytrTestResult.message}</p>
                      {paytrTestResult.sampleLink && (
                        <p className="text-[11px] text-zinc-400 truncate max-w-lg">
                          Oluşturulan Örnek Bağlantı: <span className="text-emerald-400 underline">{paytrTestResult.sampleLink}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
                  <div className="font-semibold text-zinc-300">💡 PayTR Panel Kurulum Notu:</div>
                  <p>1. Mağaza No, Parola ve Salt bilgilerinizi PayTR Mağaza Paneli &gt; <strong>Ayarlar &gt; Bilgi</strong> sekmesinden kopyalayabilirsiniz.</p>
                  <p>2. Bildirim URL (Callback URL) alanına: <code className="text-white bg-zinc-950 px-1.5 py-0.5 rounded font-mono">https://imperyamediasolutions.com/api/paytr/callback</code> yazmalısınız.</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors"
                >
                  Tüm Ayarları Kaydet
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* EDIT/ADD REFERENCE MODAL */}
      {editingReference && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingReference.id === 'new' ? 'Yeni Referans Marka Ekle' : 'Referansı Düzenle'}
            </h3>

            <form onSubmit={handleSaveReference} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Marka Adı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Hatay Museum Hotel"
                  value={editingReference.name}
                  onChange={(e) =>
                    setEditingReference({ ...editingReference, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Sektör / Kategori
                </label>
                <input
                  type="text"
                  placeholder="Örn: Turizm & Otelcilik"
                  value={editingReference.category}
                  onChange={(e) =>
                    setEditingReference({ ...editingReference, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Logo Metni (Görsel yoksa bu metin şıkça gösterilir)
                </label>
                <input
                  type="text"
                  placeholder="Örn: MUSEUM HOTEL"
                  value={editingReference.logoText || ''}
                  onChange={(e) =>
                    setEditingReference({ ...editingReference, logoText: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Logo Görseli (İsteğe bağlı)
                  </label>
                  <label className="cursor-pointer text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                    <span>⚡ Logo Sıkıştır & Yükle</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const opt = await optimizeImageFile(file, 400, 200, 0.9);
                            setEditingReference({ ...editingReference, logoUrl: opt.dataUrl });
                            showToast(`Logo optimize edildi: ${(opt.originalSize / 1024).toFixed(0)}KB ➔ ${(opt.optimizedSize / 1024).toFixed(0)}KB`);
                          } catch {
                            alert('Logo sıkıştırılamadı');
                          }
                        }
                      }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="https://.../logo.png veya yukarıdan dosya seçin"
                  value={editingReference.logoUrl || ''}
                  onChange={(e) =>
                    setEditingReference({ ...editingReference, logoUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="refActive"
                  checked={editingReference.active}
                  onChange={(e) =>
                    setEditingReference({ ...editingReference, active: e.target.checked })
                  }
                  className="rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                />
                <label htmlFor="refActive" className="text-xs text-zinc-300 font-medium">
                  Kayan bantta aktif olarak gösterilsin
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingReference(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT/ADD PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingProject.id === 'new' ? 'Yeni Proje Ekle' : 'Projeyi Düzenle'}
            </h3>

            <form onSubmit={handleSaveProject} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Proje Başlığı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Sinematik Tanıtım & Fotoğraf Prodüksiyonu"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Müşteri Adı *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Hatay Museum Hotel"
                    value={editingProject.client}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, client: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Kategori
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Prodüksiyon & Çekim"
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Kapak Görseli (URL veya Dosyadan Yükle) *
                  </label>
                  <label className="cursor-pointer text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                    <span>⚡ Otomatik WebP Sıkıştır & Yükle</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const opt = await optimizeImageFile(file, 1600, 1000, 0.82);
                            setEditingProject({ ...editingProject, coverImage: opt.dataUrl });
                            showToast(`Görsel optimize edildi: ${(opt.originalSize / 1024).toFixed(0)}KB ➔ ${(opt.optimizedSize / 1024).toFixed(0)}KB`);
                          } catch {
                            alert('Görsel sıkıştırılamadı');
                          }
                        }
                      }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  required
                  placeholder="https://... veya yukarıdan dosya yükleyin"
                  value={editingProject.coverImage}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, coverImage: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
                {editingProject.coverImage && (
                  <div className="mt-2 h-20 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editingProject.coverImage} alt="Önizleme" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Proje Özeti & Açıklaması
                </label>
                <textarea
                  rows={3}
                  placeholder="Projenin amacı, yapılan işler ve sonuçları..."
                  value={editingProject.summary}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, summary: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Etiketler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  placeholder="Prodüksiyon, Drone, Fotoğraf, Sosyal Medya"
                  value={editingProject.tags.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Hizmeti Düzenle</h3>

            <form onSubmit={handleSaveService} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Hizmet Başlığı
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) =>
                    setEditingService({ ...editingService, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Kart Açıklaması (Kısa)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDesc}
                  onChange={(e) =>
                    setEditingService({ ...editingService, shortDesc: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Detaylı Açıklama
                </label>
                <textarea
                  rows={3}
                  value={editingService.detailedDesc}
                  onChange={(e) =>
                    setEditingService({ ...editingService, detailedDesc: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT/ADD TEAM MEMBER MODAL */}
      {editingTeamMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingTeamMember.id === 'new' ? 'Yeni Ekip Üyesi Ekle' : 'Ekip Üyesini Düzenle'}
            </h3>

            <form onSubmit={handleSaveTeamMember} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ömer Altun"
                    value={editingTeamMember.name}
                    onChange={(e) =>
                      setEditingTeamMember({ ...editingTeamMember, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Ünvan / Rol *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Kurucu & Kreatif Direktör"
                    value={editingTeamMember.role}
                    onChange={(e) =>
                      setEditingTeamMember({ ...editingTeamMember, role: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Fotoğraf URL *
                  </label>
                  <label className="cursor-pointer text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                    <span>⚡ Fotoğraf Sıkıştır & Yükle</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const opt = await optimizeImageFile(file, 800, 1000, 0.85);
                            setEditingTeamMember({ ...editingTeamMember, image: opt.dataUrl });
                            showToast(`Fotoğraf optimize edildi: ${(opt.originalSize / 1024).toFixed(0)}KB ➔ ${(opt.optimizedSize / 1024).toFixed(0)}KB`);
                          } catch {
                            alert('Görsel sıkıştırılamadı');
                          }
                        }
                      }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  required
                  placeholder="https://... veya dosya yükleyin"
                  value={editingTeamMember.image}
                  onChange={(e) =>
                    setEditingTeamMember({ ...editingTeamMember, image: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Kısa Biyografi / Uzmanlık
                </label>
                <textarea
                  rows={2}
                  placeholder="Kreatif yönetmenlik ve stratejik medya danışmanlığı..."
                  value={editingTeamMember.bio || ''}
                  onChange={(e) =>
                    setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Instagram Bağlantısı
                  </label>
                  <input
                    type="text"
                    placeholder="https://instagram.com/..."
                    value={editingTeamMember.instagram || ''}
                    onChange={(e) =>
                      setEditingTeamMember({ ...editingTeamMember, instagram: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    LinkedIn Bağlantısı
                  </label>
                  <input
                    type="text"
                    placeholder="https://linkedin.com/in/..."
                    value={editingTeamMember.linkedin || ''}
                    onChange={(e) =>
                      setEditingTeamMember({ ...editingTeamMember, linkedin: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Görüntülenme Sırası
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingTeamMember.order}
                    onChange={(e) =>
                      setEditingTeamMember({
                        ...editingTeamMember,
                        order: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="teamActive"
                    checked={editingTeamMember.active}
                    onChange={(e) =>
                      setEditingTeamMember({ ...editingTeamMember, active: e.target.checked })
                    }
                    className="rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                  />
                  <label htmlFor="teamActive" className="text-xs text-zinc-300 font-medium">
                    Web Sitesinde Yayında
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingTeamMember(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
