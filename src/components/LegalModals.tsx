'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Lock, RefreshCw, Truck } from 'lucide-react';
import { SiteSettings } from '@/types';

export type LegalDocType = 'mesafeli' | 'iade' | 'teslimat' | 'gizlilik' | 'kvkk' | null;

interface LegalModalsProps {
  settings: SiteSettings;
  activeDoc: LegalDocType;
  onClose: () => void;
}

export default function LegalModals({ settings, activeDoc, onClose }: LegalModalsProps) {
  const [currentTab, setCurrentTab] = useState<LegalDocType>(activeDoc);

  useEffect(() => {
    if (activeDoc) {
      setCurrentTab(activeDoc);
    }
  }, [activeDoc]);

  if (!activeDoc && !currentTab) return null;

  const tabs: { id: LegalDocType; label: string; icon: React.ReactNode }[] = [
    { id: 'mesafeli', label: 'Mesafeli Satış Sözleşmesi', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'iade', label: 'İptal ve İade Koşulları', icon: <RefreshCw className="w-3.5 h-3.5" /> },
    { id: 'teslimat', label: 'Teslimat & İfa Bilgileri', icon: <Truck className="w-3.5 h-3.5" /> },
    { id: 'gizlilik', label: 'Gizlilik & Güvenlik', icon: <Lock className="w-3.5 h-3.5" /> },
    { id: 'kvkk', label: 'KVKK Aydınlatma', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Top Header & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Yasal Bilgilendirme & Sözleşmeler
            </span>
            <h3 className="text-lg font-bold text-white">İmperya Media Solutions</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 border-b border-zinc-900 shrink-0 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${
                currentTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Scrollable Document Content */}
        <div className="overflow-y-auto py-4 pr-1 flex-grow text-xs text-zinc-300 leading-relaxed space-y-5">
          {/* 1. MESAFELİ SATIŞ SÖZLEŞMESİ */}
          {currentTab === 'mesafeli' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                <h4 className="font-bold text-white text-sm mb-1">MESAFELİ SATIŞ SÖZLEŞMESİ</h4>
                <p className="text-[11px] text-zinc-400">
                  6502 Sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği Uyarınca Dijital Kreatif Hizmetler Satış Sözleşmesi
                </p>
              </div>

              <section>
                <h5 className="font-bold text-white mb-1">MADDE 1 - TARAFLAR</h5>
                <div className="space-y-1.5 p-3 rounded-xl bg-zinc-950 border border-zinc-850">
                  <p>
                    <strong className="text-white">SATICI (Hizmet Sağlayıcı):</strong><br />
                    <strong>Ticari Ünvan:</strong> {settings.siteName}<br />
                    <strong>Adres:</strong> {settings.address}<br />
                    <strong>Telefon:</strong> {settings.phone}<br />
                    <strong>E-Posta:</strong> {settings.email}<br />
                    <strong>Web Sitesi:</strong> https://imperyamediasolutions.com
                  </p>
                  <p className="pt-1 border-t border-zinc-900">
                    <strong className="text-white">ALICI (Müşteri):</strong><br />
                    Web sitesi üzerinden online tahsilat / ödeme formunu doldurarak ödeme gerçekleştiren gerçek veya tüzel kişidir. ALICI, sipariş esnasında beyan ettiği iletişim ve fatura bilgilerinin doğruluğunu taahhüt eder.
                  </p>
                </div>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">MADDE 2 - SÖZLEŞMENİN KONUSU</h5>
                <p>
                  İşbu sözleşmenin konusu; ALICI'nın SATICI'ya ait web sitesi üzerinden elektronik ortamda siparişini ve ödemesini gerçekleştirdiği; nitelikleri, kapsamı ve bedeli sitede veya taraflar arasındaki iş teklifinde belirlenen profesyonel dijital medya, video prodüksiyonu, sosyal medya yönetimi ve danışmanlığı, kurumsal kimlik tasarımı, web tasarımı ve yazılımı, drone çekimi, e-ticaret danışmanlığı, dijital pazarlama ve reklam yönetimi hizmetlerinin satışı, ifası ve teslimi ile ilgili olarak tarafların hak ve yükümlülüklerinin belirlenmesidir.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">MADDE 3 - HİZMETİN NİTELİĞİ VE İFASI</h5>
                <p>
                  3.1. Sözleşme konusu hizmetler fikri mülkiyet, kreatif tasarım, iş gücü ve dijital prodüksiyon mahiyetinde olup fiziksel kargo veya nakliye gönderimi içermez.<br />
                  3.2. Hizmetin ifası ve teslimi; dijital veri aktarımı, e-posta, bulut depolama bağlantısı veya web/sosyal medya ortamında yayına alma şeklinde elektronik ortamda gerçekleştirilir.<br />
                  3.3. ALICI, hizmetin gerektirdiği kurumsal materyalleri (logo, ürün, metin, erişim yetkisi vb.) zamanında SATICI’ya iletmekle yükümlüdür. ALICI kaynaklı gecikmeler teslimat süresine eklenir.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">MADDE 4 - ÖDEME, FATURA VE GÜVENLİK</h5>
                <p>
                  Ödemeler, BDDK lisanslı <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong> sanal POS altyapısı üzerinden 256-Bit SSL şifreleme ve 3D Secure güvencesiyle kredi kartı veya banka kartı ile tahsil edilir. ALICI’nın kart bilgileri SATICI sunucularında asla tutulmaz. Ödeme onayıyla birlikte ilgili yasal e-fatura / e-arşiv fatura ALICI’nın e-posta adresine iletilir.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">MADDE 5 - CAYMA HAKKI İSTİSNASI (YASAL HÜKÜM)</h5>
                <p className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 leading-relaxed">
                  <strong>DİKKAT:</strong> 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesinin 1. fıkrası gereğince;
                  <br />• <em>b) Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan mallara/tasarımlara ilişkin sözleşmeler,</em>
                  <br />• <em>g) Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler,</em>
                  <br />• <em>h) Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile ifasına başlanan hizmet sözleşmeleri,</em>
                  <br />
                  kapsamında <strong>ALICI’nın cayma hakkı bulunmamaktadır.</strong> ALICI, işbu sözleşmeyi onaylayıp ödeme yaparak hizmetin ifasına başlanmasına peşinen onay verdiğini ve cayma hakkından feragat ettiğini gayrikabili rücu kabul, beyan ve taahhüt eder.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">MADDE 6 - YÜKÜMLÜLÜK VE SORUMLULUK MUAFİYETİ</h5>
                <p>
                  6.1. SATICI, üçüncü taraf küresel platformların (Meta/Instagram, Google Ads, YouTube vb.) algoritma değişiklikleri, hesap askıya alma veya reklam reddi kararlarından sorumlu tutulamaz.<br />
                  6.2. ALICI’nın SATICI’ya sağladığı görsel, ticari marka ve içeriklerin telif ve marka hukukuna uygunluğundan münhasıran ALICI sorumludur.<br />
                  6.3. SATICI’nın işbu sözleşmeden doğabilecek azami hukuki ve mali sorumluluğu, her halükarda ALICI tarafından ilgili hizmet için ödenen net hizmet bedelini aşamaz. Dolaylı zararlar, kar kaybı veya ticari itibar kaybı iddiaları ileri sürülemez.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">MADDE 7 - UYUŞMAZLIKLARIN ÇÖZÜMÜ</h5>
                <p>
                  İşbu sözleşmenin uygulanmasından doğabilecek her türlü uyuşmazlıkta Türkiye Cumhuriyeti Kanunları uygulanır; Kayseri Mahkemeleri ve İcra Daireleri yetkilidir.
                </p>
              </section>
            </div>
          )}

          {/* 2. İPTAL VE İADE POLİTİKASI */}
          {currentTab === 'iade' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                <h4 className="font-bold text-white text-sm mb-1">İPTAL VE İADE KOŞULLARI</h4>
                <p className="text-[11px] text-zinc-400">
                  Dijital Kreatif Hizmetler, Prodüksiyon & Danışmanlık İptal ve İade Esasları
                </p>
              </div>

              <section>
                <h5 className="font-bold text-white mb-1">1. HİZMETİN DOĞASI VE CAYMA HAKKI İSTİSNASI</h5>
                <p>
                  İmperya Media Solutions tarafından sunulan hizmetlerin tamamı (sosyal medya yönetimi, video prodüksiyonu, drone çekimi, kurumsal kimlik, web yazılımı ve reklam danışmanlığı); müşterinin özel talebine, markasına ve onayına göre şekillenen kreatif ve dijital hizmetlerdir. Mesafeli Sözleşmeler Yönetmeliği m.15 hükümleri doğrultusunda, ifasına başlanan veya kişiye özel üretilen dijital çalışmalarda <strong>cayma hakkı ve ücret iadesi uygulanmaz.</strong>
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">2. İPTALİN KABUL EDİLEBİLECEĞİ TEK İSTİSNA</h5>
                <p>
                  Ödemesi yapılan bir hizmetin iptali ve iadesi, yalnızca SATICI tarafından proje hazırlığına, çekim planlamasına, kreatif tasarıma veya hesap analizine <strong>henüz hiçbir surette başlanmamış olması</strong> ve ödeme anından itibaren en geç <strong>24 saat içinde</strong> yazılı olarak (info@imperyamediasolutions.com adresine) resmi iptal talebi iletilmesi koşuluyla mümkündür.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">3. İADENİN MÜMKÜN OLMADIĞI DURUMLAR</h5>
                <p>
                  Aşağıdaki durumlarda hiçbir surette iptal, iade veya kısmi geri ödeme talep edilemez:<br />
                  • Çekim ekibi veya ekipman rezervasyonu yapılmış prodüksiyon projelerinde,<br />
                  • İlk konsept, taslak, storyboard veya tasarım çalışması hazırlanmış işlerde,<br />
                  • Kodlama, sunucu kurulumu veya yayına alma süreci başlamış web/yazılım projelerinde,<br />
                  • Google veya Meta reklam bütçesi olarak platformlara aktarılmış harcamalarda,<br />
                  • ALICI’nın projeyi tek taraflı askıya alması, onay vermemesi veya kendi isteğiyle vazgeçmesi durumunda.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">4. İADE USULÜ VE KESİNTİLER</h5>
                <p>
                  Şartları sağlanan onaylı iadelerde; PayTR sanal POS aracı kurum komisyon kesintileri, banka işlem masrafları ve varsa doğan vergisel yükümlülükler düşüldükten sonra kalan net tutar 14 (on dört) iş günü içinde ALICI’nın ödeme yaptığı kart hesabına iade edilir. İadenin kart ekstresine yansıması bankaların taksit ve takas süreçlerine bağlı olup SATICI'nın sorumluluğunda değildir.
                </p>
              </section>
            </div>
          )}

          {/* 3. TESLİMAT VE İFA BİLGİLERİ */}
          {currentTab === 'teslimat' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                <h4 className="font-bold text-white text-sm mb-1">TESLİMAT VE İFA BİLGİLENDİRMESİ</h4>
                <p className="text-[11px] text-zinc-400">
                  Fiziki Kargo İçermeyen Dijital Hizmet Teslimat Şartları ve Revizyon Esasları
                </p>
              </div>

              <section>
                <h5 className="font-bold text-white mb-1">1. FİZİKİ KARGO BULUNMAMAKTADIR</h5>
                <p>
                  İmperya Media Solutions bünyesinde sunulan tüm hizmet ve ürünler dijital, yazılımsal ve gayrimaddi niteliktedir. <strong>Fiziki kargo, ambar veya kurye ile teslimat yapılmamaktadır.</strong> Bu sebeple müşterilerimize herhangi bir kargo, nakliye veya paketleme ücreti yansıtılmaz.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">2. DİJİTAL TESLİMAT KANALLARI</h5>
                <p>
                  Tamamlanan kreatif ve medya çalışmaları ALICI’ya aşağıdaki kanallar üzerinden elektronik ortamda teslim edilir:<br />
                  • Yüksek çözünürlüklü dijital dosya indirme bağlantıları (Google Drive, WeTransfer vb.),<br />
                  • ALICI’nın kayıtlı kurumsal e-posta adresine doğrudan dijital transfer,<br />
                  • Web tasarımı ve yazılım işlerinde ALICI’nın sunucusuna kurulum veya canlıya alma,<br />
                  • Sosyal medya ve reklam yönetiminde doğrudan ilgili kurumsal hesaplarda yayınlama ve raporlama.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">3. TESLİMAT SÜRESİ VE MÜŞTERİ YÜKÜMLÜLÜKLERİ</h5>
                <p>
                  Teslimat süresi, tarafların yazılı iş teklifinde veya sözleşmesinde kararlaştırılan takvime tabidir. Teslimat takviminin başlaması için ALICI'nın işe ilişkin materyalleri (logo, ürün numunesi, metin, kurumsal bilgi vb.) eksiksiz sağlaması şarttır. ALICI kaynaklı gecikmeler taahhüt edilen teslim süresine eklenir.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">4. REVİZYON HAKKI VE OTOMATİK ONAY</h5>
                <p>
                  Kreatif çalışmalarda ALICI’ya teslim tarihinden itibaren 5 (beş) iş günü inceleme süresi tanınır. İş teklifinde aksi kararlaştırılmadıkça çalışmalar en fazla 2 (iki) tur makul revizyon hakkı içerir. Ana konsepti veya onaylanmış senaryoyu kökten değiştiren talepler ek iş olarak ücretlendirilir. 5 iş günü içinde geri bildirim yapılmayan teslimatlar eksiksiz kabul edilmiş sayılır.
                </p>
              </section>
            </div>
          )}

          {/* 4. GİZLİLİK VE GÜVENLİK POLİTİKASI */}
          {currentTab === 'gizlilik' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                <h4 className="font-bold text-white text-sm mb-1">GİZLİLİK VE KART GÜVENLİĞİ POLİTİKASI</h4>
                <p className="text-[11px] text-zinc-400">
                  256-Bit SSL Sertifikası, 3D Secure ve PayTR Altyapı Güvencesi
                </p>
              </div>

              <section>
                <h5 className="font-bold text-white mb-1">1. KREDİ KARTI VE ÖDEME GÜVENLİĞİ</h5>
                <p>
                  Sitemiz üzerinden gerçekleştirilen tüm ödemeler <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong> altyapısı üzerinden 256-Bit SSL (Secure Sockets Layer) şifreleme ve 3D Secure SMS doğrulama protokolüyle gerçekleşir. Kredi kartı numaranız, son kullanma tarihiniz ve CVV kodunuz doğrudan banka sistemine iletilir; sunucularımızda kesinlikle saklanmaz, kaydedilmez ve üçüncü şahıslarca görüntülenemez.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">2. TİCARİ BİLGİLERİN GİZLİLİĞİ</h5>
                <p>
                  Müşterilerimizin iletişim formlarında veya teklif aşamasında paylaştığı kurumsal bilgiler, ticari stratejiler ve marka materyalleri gizli bilgi olarak kabul edilir. Yasal zorunluluklar haricinde hiçbir kurum veya şahısla ticari menfaat amacıyla paylaşılmaz.
                </p>
              </section>
            </div>
          )}

          {/* 5. KVKK AYDINLATMA METNİ */}
          {currentTab === 'kvkk' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                <h4 className="font-bold text-white text-sm mb-1">KVKK AYDINLATMA METNİ</h4>
                <p className="text-[11px] text-zinc-400">
                  6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Bilgilendirme
                </p>
              </div>

              <section>
                <h5 className="font-bold text-white mb-1">1. VERİ SORUMLUSU</h5>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca veri sorumlusu; {settings.address} adresinde mukim <strong>{settings.siteName}</strong>'dir.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">2. VERİLERİN İŞLENME AMACI</h5>
                <p>
                  Ad, soyad, telefon, e-posta ve fatura bilgileriniz; sözleşmenin kurulması, hizmetin ifası, yasal mali yükümlülüklerin yerine getirilmesi (fatura düzenlenmesi) ve müşteri memnuniyeti süreçlerinin yürütülmesi amaçlarıyla KVKK'nın 5. maddesi uyarınca işlenmektedir.
                </p>
              </section>

              <section>
                <h5 className="font-bold text-white mb-1">3. HAKLARINIZ</h5>
                <p>
                  KVKK'nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, yanlış ise düzeltilmesini talep etme ve silinmesini isteme hakkına sahipsiniz. Başvurularınızı {settings.email} adresine yazılı olarak iletebilirsiniz.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">PayTR 256-Bit SSL Koruması Altındadır</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition-colors"
          >
            Anladım & Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
