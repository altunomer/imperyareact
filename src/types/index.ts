export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  icon: string;
  tags: string[];
  order: number;
  active: boolean;
}

export interface ReferenceItem {
  id: string;
  name: string;
  category: string;
  logoText?: string;
  logoUrl?: string;
  websiteUrl?: string;
  order: number;
  active: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  coverImage: string;
  summary: string;
  tags: string[];
  featured: boolean;
  order: number;
}

export interface SiteSettings {
  siteName: string;
  title: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapsUrl: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  // Maintenance Mode
  maintenanceMode: boolean;
  maintenanceTitle: string;
  maintenanceMessage: string;
  // Görsel ve Tasarım Ayarları (Admin Panel Düzenlenebilir)
  heroImage?: string;
  aboutImage?: string;
  // PayTR Settings
  paytrMerchantId: string;
  paytrMerchantKey: string;
  paytrMerchantSalt: string;
  paytrTestMode: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  instagram?: string;
  linkedin?: string;
  order: number;
  active: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  merchantOid: string;
  clientName: string;
  email: string;
  phone: string;
  amount: number;
  description: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: string;
}
