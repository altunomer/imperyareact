'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';
import { SiteSettings, ServiceItem } from '@/types';
import { submitInquiry } from '@/lib/storage';

interface ContactSectionProps {
  settings: SiteSettings;
  services: ServiceItem[];
  preselectedService?: string;
}

export default function ContactSection({ settings, services, preselectedService }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || services[0]?.title || 'Sosyal Medya Yönetim & Danışmanlık',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync if preselectedService changes
  React.useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    await submitInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
    });
    setLoading(false);
    setSubmitted(true);
  };

  const whatsappCleanNumber = (settings.whatsapp || '').replace(/[^0-9]/g, '');

  return (
    <section id="iletisim" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">
              İLETİŞİME GEÇİN
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Birlikte harika bir iş çıkaralım.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-10">
              Yeni bir marka doğuyor olabilir ya da mevcut markanızı bir üst seviyeye taşımak istiyor olabilirsiniz. Bir kahve eşliğinde projenizi konuşalım.
            </p>

            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Adresimiz
                  </span>
                  <p className="text-sm text-zinc-200 leading-relaxed max-w-sm">
                    {settings.address}
                  </p>
                  {settings.mapsUrl && (
                    <a
                      href={settings.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white mt-2 transition-colors"
                    >
                      <span>Haritada Göster</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Telefon & İletişim
                  </span>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-sm font-semibold text-zinc-200 hover:text-white transition-colors"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    E-Posta
                  </span>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm font-semibold text-zinc-200 hover:text-white transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action */}
          <div className="mt-10 pt-8 border-t border-zinc-900">
            <a
              href={`https://wa.me/${whatsappCleanNumber}?text=Merhaba,%20İmperya%20Media%20Solutions%20ile%20projem%20için%20iletişime%20geçmek%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp ile Hızlı Mesaj Gönder</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md">
            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Talebiniz Alındı!</h3>
                <p className="text-zinc-400 max-w-md text-sm leading-relaxed mb-8">
                  Mesajınız bize başarıyla ulaştı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      service: services[0]?.title || 'Sosyal Medya Yönetim & Danışmanlık',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Proje & Teklif Talep Formu</h3>
                  <p className="text-xs text-zinc-400">
                    Formu doldurun, sizin için en uygun stratejiyi ve bütçe planını hazırlayalım.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ahmet Yılmaz"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">
                      Telefon Numaranız *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Örn: 05xx xxx xx xx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">
                      E-Posta Adresiniz
                    </label>
                    <input
                      type="email"
                      placeholder="Örn: ahmet@sirketiniz.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">
                      İlgilendiğiniz Hizmet
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                    >
                      {services.map((srv) => (
                        <option key={srv.id} value={srv.title} className="bg-zinc-900 text-white">
                          {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Proje Özeti & Mesajınız
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Hedeflerinizden ve aklınızdaki projeden kısaca bahsedin..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] disabled:opacity-50"
                >
                  {loading ? (
                    <span>Gönderiliyor...</span>
                  ) : (
                    <>
                      <span>Teklif Talebini Gönder</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
