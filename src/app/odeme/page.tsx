'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { SiteSettings } from '@/types';
import { getSettings } from '@/lib/storage';
import { initialSettings } from '@/data/initialData';
import { requestPayTRLink } from '@/lib/paytr';
import LegalModals, { LegalDocType } from '@/components/LegalModals';

function PaymentContent() {
  const searchParams = useSearchParams();
  const urlStatus = searchParams.get('status');

  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalDocType>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceDescription: '',
    amount: '',
    termsAccepted: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'paytr' | 'success'>('form');
  const [errorMessage, setErrorMessage] = useState('');
  const [paytrLink, setPaytrLink] = useState<string | null>(null);

  useEffect(() => {
    getSettings().then(setSettings);
    if (urlStatus === 'success') {
      setPaymentStep('success');
    }
  }, [urlStatus]);

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const numericAmount = parseFloat(formData.amount.replace(',', '.'));
    if (!numericAmount || numericAmount <= 0) {
      setErrorMessage('Lütfen geçerli bir ödeme tutarı giriniz.');
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage('Ödemeye devam etmek için sözleşme onayını işaretlemelisiniz.');
      return;
    }

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      setErrorMessage('Lütfen adınızı ve soyadınızı eksiksiz giriniz.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }

    setIsProcessing(true);

    try {
      const merchantId = settings.paytrMerchantId?.trim();
      const merchantKey = settings.paytrMerchantKey?.trim();
      const merchantSalt = settings.paytrMerchantSalt?.trim();

      if (!merchantId || !merchantKey || !merchantSalt) {
        setErrorMessage(
          'PayTR API bilgileri (Mağaza No, Parola, Salt) henüz sisteme kaydedilmemiş. Lütfen yönetim paneli (/welcome-webmaster) > Ayarlar sekmesinden PayTR bilgilerinizi giriniz.'
        );
        setIsProcessing(false);
        return;
      }

      const result = await requestPayTRLink({
        merchantId,
        merchantKey,
        merchantSalt,
        name: formData.serviceDescription?.trim()
          ? `İmperya Media - ${formData.serviceDescription.trim()}`
          : `İmperya Media - ${formData.name.trim()}`,
        amount: numericAmount,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        currency: 'TL',
        maxInstallment: '12',
      });

      if (result.status === 'success' && result.link) {
        setPaytrLink(result.link);
        setPaymentStep('paytr');
      } else {
        const errorDetail = result.reason || result.error || 'PayTR ödeme bağlantısı oluşturulamadı.';
        setErrorMessage(`PayTR Hatası: ${errorDetail}`);
      }
    } catch (err: any) {
      setErrorMessage(`Bağlantı hatası: ${err?.message || 'Lütfen internet bağlantınızı kontrol edin.'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col justify-between p-6 sm:p-10">
      {/* Top Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-8 border-b border-zinc-800">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        <div className="flex items-center gap-3">
          <picture>
            <source srcSet="/logo.webp, /logo-2x.webp 2x" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="İmperya Media Solutions"
              width="140"
              height="33"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </picture>
          <span className="text-[11px] font-semibold text-zinc-400 border-l border-zinc-800 pl-3">
            ONLINE ÖDEME
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`w-full mx-auto py-10 flex-grow flex flex-col justify-center transition-all duration-300 ${
          paymentStep === 'paytr' ? 'max-w-4xl' : 'max-w-2xl'
        }`}
      >
        {/* STEP 1: PAYMENT FORM */}
        {paymentStep === 'form' && (
          <div className="p-8 sm:p-10 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  256-Bit SSL & 3D Secure
                </span>
                <h1 className="text-2xl font-extrabold text-white">Güvenli Online Tahsilat</h1>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-8">
              Ajansımızdan aldığınız prodüksiyon, sosyal medya, yazılım veya danışmanlık hizmetlerine ait ödemelerinizi resmi PayTR altyapısıyla kredi veya banka kartınızla güvenle gerçekleştirebilirsiniz.
            </p>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-6 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            <form onSubmit={handleStartPayment} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Adınız Soyadınız / Ünvan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ahmet Yılmaz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Telefon Numaranız *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="05xx xxx xx xx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    E-Posta Adresiniz (Dekont için) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ahmet@sirketiniz.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Ödenecek Tutar (TL) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-4 py-3 pl-10 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm font-bold focus:outline-none focus:border-zinc-500"
                    />
                    <span className="absolute left-3.5 top-3.5 text-zinc-500 text-sm font-bold">₺</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Hizmet / Fatura Açıklaması
                </label>
                <input
                  type="text"
                  placeholder="Örn: Sosyal Medya Yönetimi ve Prodüksiyon Bedeli"
                  value={formData.serviceDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceDescription: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>

              {/* PayTR Mandatory Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    setFormData({ ...formData, termsAccepted: e.target.checked })
                  }
                  className="mt-0.5 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                />
                <label htmlFor="terms" className="text-[11px] text-zinc-400 leading-normal">
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('mesafeli')}
                    className="text-white underline hover:text-zinc-200 mr-1 font-semibold"
                  >
                    Mesafeli Satış Sözleşmesi
                  </button>
                  ve
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('iade')}
                    className="text-white underline hover:text-zinc-200 mx-1 font-semibold"
                  >
                    İptal ve İade Koşulları
                  </button>
                  metinlerini okudum, kabul ediyorum.
                </label>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all shadow-xl hover:scale-[1.01] mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>PayTR Güvenli Ödeme Ekranı Hazırlanıyor...</span>
                  </>
                ) : (
                  <>
                    <span>Kartla Güvenli Ödemeye Geç</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Badges footer */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-4 text-[10px] text-zinc-500">
              <span className="flex items-center gap-1 font-semibold text-zinc-400">
                <Lock className="w-3 h-3 text-emerald-400" /> PayTR 256-Bit SSL Koruması
              </span>
              <span>•</span>
              <span className="font-semibold text-zinc-400">3D Secure Doğrulama</span>
              <span>•</span>
              <span className="font-semibold text-zinc-400">Tüm Banka & Kredi Kartları</span>
            </div>
          </div>
        )}

        {/* STEP 2: REAL PAYTR LINK PAYMENT SCREEN */}
        {paymentStep === 'paytr' && paytrLink && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  PayTR 3D Secure Güvenli Ödeme
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Ödenecek Tutar: {parseFloat(formData.amount).toLocaleString('tr-TR')} ₺
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Müşteri: {formData.name} • {formData.email}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setPaymentStep('form')}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  ← Formu Düzenle
                </button>
                <a
                  href={paytrLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>PayTR Ekranını Yeni Sekmede Aç</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Official PayTR Frame */}
            <div className="w-full bg-white rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl relative">
              <iframe
                src={paytrLink}
                id="paytriframe"
                frameBorder="0"
                scrolling="no"
                className="w-full h-[920px] sm:h-[960px] min-h-[900px] rounded-3xl border-0 block"
                title="PayTR Güvenli Ödeme Ekranı"
                allow="payment; camera; microphone"
              />
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-center text-xs text-zinc-400">
              Kart bilgileriniz doğrudan <strong className="text-zinc-200">BDDK Lisanslı PayTR</strong> güvenli altyapısına iletilir ve sunucularımızda saklanmaz. Ödemeniz 3D Secure SMS şifrenizle onaylandıktan sonra anında işleme alınır.
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {paymentStep === 'success' && (
          <div className="p-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 text-center flex flex-col items-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Ödemeniz Başarıyla Alındı!</h2>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed mb-8">
              Ödemeniz PayTR altyapısı üzerinden 3D Secure onayıyla başarıyla tamamlanmıştır. İmperya Media Solutions'ı tercih ettiğiniz için teşekkür ederiz.
            </p>

            <Link
              href="/"
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="max-w-4xl w-full mx-auto pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>&copy; {new Date().getFullYear()} {settings.siteName}. Güvenli Ödeme Altyapısı.</p>
        <div className="flex items-center gap-4 text-zinc-400">
          <span>Kocasinan / Kayseri</span>
          <span>•</span>
          <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
        </div>
      </div>

      {/* Render Legal Modal if clicked */}
      {activeLegalModal && <LegalModals settings={settings} />}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center">Yükleniyor...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
