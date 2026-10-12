'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, RefreshCw, Truck } from 'lucide-react';
import { SiteSettings } from '@/types';

interface LegalModalsProps {
  settings: SiteSettings;
}

export type LegalDocType = 'mesafeli' | 'iade' | 'gizlilik' | 'kvkk' | null;

export default function LegalModals({ settings }: LegalModalsProps) {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(null);

  if (!activeDoc) return null;

  const closeModal = () => setActiveDoc(null);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MESAFELİ SATIŞ SÖZLEŞMESİ */}
        {activeDoc === 'mesafeli' && (
          <div className="overflow-y-auto pr-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Mesafeli Satış Sözleşmesi</h3>
                <p className="text-xs text-zinc-400">PayTR & Tüketici Mevzuatı Uyumlu</p>
              </div>
            </div>

            <div className="text-xs text-zinc-300 leading-relaxed space-y-4">
              <section>
                <h4 className="font-bold text-white text-sm mb-1">MADDE 1 - TARAFLAR</h4>
                <p>
                  <strong>SATICI:</strong> {settings.siteName}<br />
                  <strong>Adres:</strong> {settings.address}<br />
                  <strong>Telefon:</strong> {settings.phone}<br />
                  <strong>E-Posta:</strong> {settings.email}<br />
                  <strong>ALICI:</strong> Web sitesi üzerinden online hizmet veya bakiye ödemesi yapan gerçek veya tüzel kişi.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-white text-sm mb-1">MADDE 2 - SÖZLEŞMENİN KONUSU</h4>
                <p>
                  İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait web sitesinden elektronik ortamda siparişini yaptığı, sitede nitelikleri ve satış fiyatı belirtilen dijital medya, video prodüksiyon, sosyal medya yönetimi, kurumsal kimlik, yazılım ve tasarım hizmetlerinin satışı ve ifası ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-white text-sm mb-1">MADDE 3 - HİZMETİN TESLİMATI VE İFASI</h4>
                <p>
                  Sözleşme konusu hizmetler dijital içerik, kreatif tasarım ve danışmanlık mahiyetinde olup, kararlaştırılan süre zarfında elektronik ortamda (e-posta, bulut depolama veya canlı yayın/yayınlama) ALICI'ya teslim edilir veya ifa edilir. Fiziki kargo gönderimi bulunmamaktadır.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-white text-sm mb-1">MADDE 4 - ÖDEME VE GÜVENLİK</h4>
                <p>
                  Ödemeler PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş. altyapısı üzerinden 256-bit SSL güvenlik sertifikası ve 3D Secure güvencesiyle kredi kartı veya banka kartı ile tahsil edilir. Kart bilgileri SATICI sunucularında asla saklanmaz.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* İPTAL VE İADE KOŞULLARI */}
        {activeDoc === 'iade' && (
          <div className="overflow-y-auto pr-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">İptal ve İade Koşulları</h3>
                <p className="text-xs text-zinc-400">Dijital Hizmetler & Cayma Hakkı Şartları</p>
              </div>
            </div>

            <div className="text-xs text-zinc-300 leading-relaxed space-y-4">
              <section>
                <h4 className="font-bold text-white text-sm mb-1">1. CAYMA HAKKI VE İSTİSNALARI</h4>
                <p>
                  6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesi uyarınca; <strong>tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan mallar/hizmetler</strong> ve <strong>elektronik ortamda anında ifa edilen hizmetler</strong> ile tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde cayma hakkı kullanılamaz.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-white text-sm mb-1">2. HİZMET BAŞLAMADAN ÖNCE İPTAL</h4>
                <p>
                  ALICI, satın aldığı hizmetin üretimine veya ifasına SATICI tarafından henüz başlanmamış olması koşuluyla, ödeme tarihinden itibaren 24 saat içinde yazılı olarak (e-posta ile) başvurarak siparişini iptal edebilir. Bu durumda PayTR işlem komisyonları haricindeki tutar 7-14 iş günü içinde ALICI'nın kartına iade edilir.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-white text-sm mb-1">3. İADE SÜRECİ VE GERİ ÖDEME</h4>
                <p>
                  Onaylanan iadeler, ödemenin yapıldığı kart hesabına PayTR üzerinden tek seferde veya bankanın taksit politikasına göre iade edilir. Bankalar arası işlem süreleri SATICI'nın kontrolü dışındadır.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* GİZLİLİK VE GÜVENLİK POLİTİKASI */}
        {activeDoc === 'gizlilik' && (
          <div className="overflow-y-auto pr-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Gizlilik ve Güvenlik Politikası</h3>
                <p className="text-xs text-zinc-400">256-Bit SSL & 3D Secure Kart Güvenliği</p>
              </div>
            </div>

            <div className="text-xs text-zinc-300 leading-relaxed space-y-4">
              <section>
                <h4 className="font-bold text-white text-sm mb-1">1. KREDİ KARTI GÜVENLİĞİ</h4>
                <p>
                  Sitemiz üzerinden yapılan tüm kredi kartı ve banka kartı ödemeleri 256-Bit SSL (Secure Sockets Layer) şifreleme protokolü ve 3D Secure güvenliği ile doğrudan <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong> sunucuları üzerinden gerçekleştirilir. Kredi kartı numaranız, CVV kodunuz veya şifreniz hiçbir şekilde sitemiz veritabanında saklanmaz veya kaydedilmez.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-white text-sm mb-1">2. BİLGİ GÜVENLİĞİ</h4>
                <p>
                  Müşterilerimizin iletişim formları veya sipariş aşamasında paylaştığı kişisel veriler (ad, soyad, telefon, e-posta vb.) üçüncü şahıslarla ticari amaçla asla paylaşılmaz; yalnızca hizmetin ifası ve yasal faturalandırma amacıyla kullanılır.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* KVKK VE TESLİMAT ŞARTLARI */}
        {activeDoc === 'kvkk' && (
          <div className="overflow-y-auto pr-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">KVKK Aydınlatma Metni & Teslimat</h3>
                <p className="text-xs text-zinc-400">6698 Sayılı Kişisel Verilerin Korunması Kanunu</p>
              </div>
            </div>

            <div className="text-xs text-zinc-300 leading-relaxed space-y-4">
              <section>
                <h4 className="font-bold text-white text-sm mb-1">1. VERİ SORUMLUSU</h4>
                <p>
                  6698 sayılı KVKK uyarınca, veri sorumlusu sıfatıyla {settings.siteName} ({settings.address}) kişisel verilerinizi kanuna uygun şekilde işlemektedir.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-white text-sm mb-1">2. DİJİTAL TESLİMAT BİLGİLENDİRMESİ</h4>
                <p>
                  İmperya Media Solutions bünyesinde sunulan hizmetler dijital niteliktedir. Tasarımlar, prodüksiyon materyalleri ve danışmanlık çıktıları elektronik ortamda teslim edilir; fiziksel kargo veya nakliye ücreti söz konusu değildir.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-white text-sm mb-1">3. HAKLARINIZ</h4>
                <p>
                  KVKK'nın 11. maddesi uyarınca dilediğiniz zaman {settings.email} adresimiz üzerinden verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini talep etme hakkına sahipsiniz.
                </p>
              </section>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-zinc-800 flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="px-6 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition-colors"
          >
            Anladım & Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
