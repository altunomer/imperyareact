import { ServiceItem, ReferenceItem, ProjectItem, SiteSettings, ContactInquiry } from '@/types';
import { initialServices, initialReferences, initialProjects, initialSettings } from '@/data/initialData';

const STORAGE_KEYS = {
  SERVICES: 'imperya_services_v1',
  REFERENCES: 'imperya_references_v1',
  PROJECTS: 'imperya_projects_v1',
  SETTINGS: 'imperya_settings_v1',
  INQUIRIES: 'imperya_inquiries_v1',
  AUTH: 'imperya_admin_auth',
};

// --- SERVICES ---
export async function getServices(): Promise<ServiceItem[]> {
  if (typeof window === 'undefined') return initialServices;
  try {
    const res = await fetch('/api/services');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}
  try {
    const local = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (local) return JSON.parse(local);
  } catch {}
  return initialServices;
}

export async function saveServices(services: ServiceItem[]): Promise<boolean> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    try {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(services),
      });
    } catch {}
    return true;
  }
  return false;
}

// --- REFERENCES ---
export async function getReferences(): Promise<ReferenceItem[]> {
  if (typeof window === 'undefined') return initialReferences;
  try {
    const res = await fetch('/api/references');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}
  try {
    const local = localStorage.getItem(STORAGE_KEYS.REFERENCES);
    if (local) return JSON.parse(local);
  } catch {}
  return initialReferences;
}

export async function saveReferences(references: ReferenceItem[]): Promise<boolean> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.REFERENCES, JSON.stringify(references));
    try {
      await fetch('/api/references', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(references),
      });
    } catch {}
    return true;
  }
  return false;
}

// --- PROJECTS ---
export async function getProjects(): Promise<ProjectItem[]> {
  if (typeof window === 'undefined') return initialProjects;
  try {
    const res = await fetch('/api/projects');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}
  try {
    const local = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (local) return JSON.parse(local);
  } catch {}
  return initialProjects;
}

export async function saveProjects(projects: ProjectItem[]): Promise<boolean> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projects),
      });
    } catch {}
    return true;
  }
  return false;
}

// --- SETTINGS ---
export async function getSettings(): Promise<SiteSettings> {
  if (typeof window === 'undefined') return initialSettings;
  let merged: SiteSettings = { ...initialSettings };

  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      const data = await res.json();
      if (data && data.siteName) {
        merged = {
          ...initialSettings,
          ...data,
          paytrMerchantId: data.paytrMerchantId?.trim() || initialSettings.paytrMerchantId,
          paytrMerchantKey: data.paytrMerchantKey?.trim() || initialSettings.paytrMerchantKey,
          paytrMerchantSalt: data.paytrMerchantSalt?.trim() || initialSettings.paytrMerchantSalt,
        };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
        return merged;
      }
    }
  } catch {}

  try {
    const local = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (local) {
      const parsed = JSON.parse(local);
      merged = {
        ...initialSettings,
        ...parsed,
        paytrMerchantId: parsed.paytrMerchantId?.trim() || initialSettings.paytrMerchantId,
        paytrMerchantKey: parsed.paytrMerchantKey?.trim() || initialSettings.paytrMerchantKey,
        paytrMerchantSalt: parsed.paytrMerchantSalt?.trim() || initialSettings.paytrMerchantSalt,
      };
      return merged;
    }
  } catch {}

  return merged;
}

export async function saveSettings(settings: SiteSettings): Promise<boolean> {
  if (typeof window !== 'undefined') {
    // API bilgilerinin kazara silinmesini önleyen güvenlik katmanı
    const current = await getSettings();
    const safeSettings: SiteSettings = {
      ...settings,
      paytrMerchantId: settings.paytrMerchantId?.trim() || current.paytrMerchantId || initialSettings.paytrMerchantId,
      paytrMerchantKey: settings.paytrMerchantKey?.trim() || current.paytrMerchantKey || initialSettings.paytrMerchantKey,
      paytrMerchantSalt: settings.paytrMerchantSalt?.trim() || current.paytrMerchantSalt || initialSettings.paytrMerchantSalt,
    };

    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(safeSettings));
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(safeSettings),
      });
    } catch {}
    return true;
  }
  return false;
}

// --- INQUIRIES ---
export async function getInquiries(): Promise<ContactInquiry[]> {
  if (typeof window === 'undefined') return [];
  try {
    const res = await fetch('/api/inquiries');
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  try {
    const local = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (local) return JSON.parse(local);
  } catch {}
  return [];
}

export async function submitInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>): Promise<boolean> {
  const item: ContactInquiry = {
    ...inquiry,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = await getInquiries();
      const updated = [item, ...existing];
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
    } catch {}
    return true;
  }
  return false;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    const existing = await getInquiries();
    const filtered = existing.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(filtered));
    try {
      await fetch('/api/inquiries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } catch {}
    return true;
  }
  return false;
}
