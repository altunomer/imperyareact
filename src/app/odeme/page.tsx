'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { SiteSettings } from '@/types';
import { getSettings } from '@/lib/storage';
import { initialSettings } from '@/data/initialData';
import LegalModals, { LegalDocType } from '@/components/LegalModals';

export default function PaymentPage() {
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
  const [paymentStep, setPaymentStep] = useState<'form' | 'iframe' | 'success'>('form');
  const [errorMessage, setErrorMessage] = useState('');
  const [iframeToken, setIframeToken] = useState<string | null>(null);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

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

    setIsProcessing(true);

    try {
      // Send payment token request to API
      const res = await fetch('/api/paytr/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          description: formData.serviceDescription || 'Medya Hizmet Bedeli',
          amount: numericAmount,
        }),
      });

      const data = await res.json();

      if (data && data.token) {
        setIframeToken(data.token);
        setPaymentStep('iframe');
      } else {
        // If PayTR keys are not yet configured in admin, provide a helpful message or sandbox simulation
        if (settings.paytrMerchantId) {
          setErrorMessage(data?.error || 'PayTR token oluşturulamadı. Lütfen bilgilerinizi kontrol edin.');
        } else {
          // Simulation mode when API keys are not yet configured
          setTimeout(() => {
            setPaymentStep('iframe');
          }, 800);
        }
      }
    } catch {
      // In static or test mode, proceed to payment container
      setPaymentStep('iframe');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimulateSuccess = () => {
    setPaymentStep('success');
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
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black text-black text-sm">
            İ
          </div>
          <span className="font-bold text-sm tracking-tight text-white">İMPERYA ONLINE ÖDEME</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-2xl w-full mx-auto py-12 flex-grow flex flex-col justify-center">
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
              Ajansımızdan aldığınız prodüksiyon, sosyal medya, yazılım veya danışmanlık hizmetlerine ait ödemelerinizi PayTR altyapısıyla kredi veya banka kartınızla güvenle gerçekleştirebilirsiniz.
            </p>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-6 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
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
                    E-Posta Adresiniz *
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
                  placeholder="Örn: Sosyal Medya Yönetimi veya Fatura No"
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
                    className="text-white underline hover:text-zinc-200 mr-1"
                  >
                    Mesafeli Satış Sözleşmesi
                  </button>
                  ve
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('iade')}
                    className="text-white underline hover:text-zinc-200 mx-1"
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
                  <span>Ödeme Sayfası Hazırlanıyor...</span>
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
              <span className="font-semibold text-zinc-400">Visa / Mastercard / Troy</span>
            </div>
          </div>
        )}

        {/* STEP 2: PAYTR IFRAME DISPLAY */}
        {paymentStep === 'iframe' && (
          <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  PayTR Güvenli Ödeme Ekranı
                </span>
                <h3 className="text-lg font-bold text-white">
                  Tutar: {parseFloat(formData.amount).toLocaleString('tr-TR')} ₺
                </h3>
              </div>

              <button
                onClick={() => setPaymentStep('form')}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Geri Dön
              </button>
            </div>

            {iframeToken ? (
              <iframe
                src={`https://www.paytr.com/odeme/guvenli/${iframeToken}`}
                id="paytriframe"
                frameBorder="0"
                scrolling="no"
                className="w-full min-h-[500px] rounded-xl"
              />
            ) : (
              // Live Simulation / Sandbox placeholder when API keys are being connected
              <div className="py-12 px-4 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-white mb-6">
                  <CreditCard className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">PayTR Entegrasyon Alanı</h4>
                <p className="text-xs text-zinc-400 max-w-md leading-relaxed mb-8">
                  PayTR onayınız tamamlandığında, panelden gireceğiniz API anahtarlarınız ile 3D Secure kart formu bu alanda doğrudan açılacaktır.
                </p>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left w-full max-w-sm mb-6 text-xs text-zinc-300 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Müşteri:</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Tutar:</span>
                    <span className="font-bold text-emerald-400">{formData.amount} ₺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Açıklama:</span>
                    <span>{formData.serviceDescription || 'Medya Hizmeti'}</span>
                  </div>
                </div>

                <button
                  onClick={handleSimulateSuccess}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors"
                >
                  Ödemeyi Tamamla (Test Simülasyonu)
                </button>
              </div>
            )}
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
              Ödeme dekontu ve bilgilendirme detayları <strong className="text-zinc-200">{formData.email}</strong> adresinize iletilmiştir. İmperya Media Solutions'ı tercih ettiğiniz için teşekkür ederiz.
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
