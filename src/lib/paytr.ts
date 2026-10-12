/**
 * PayTR Link API Entegrasyonu (Official Implementation)
 * Materials/Türkçe/PayTR Link API dokümantasyonuna birebir uygun olarak hazırlanmıştır.
 */

export interface PayTRLinkParams {
  merchantId: string;
  merchantKey: string;
  merchantSalt: string;
  name: string; // Ürün / Hizmetin açıklaması (En az 4, en fazla 200 karakter)
  amount: number; // TL cinsinden (örn: 1450.50)
  email: string; // collection modu için zorunlu
  phone?: string;
  currency?: 'TL' | 'USD' | 'EUR' | 'GBP';
  maxInstallment?: string; // '1' (peşin) veya '2'-'12'
  callbackUrl?: string;
  callbackId?: string;
}

export interface PayTRLinkResult {
  status: 'success' | 'failed' | 'error';
  link?: string;
  id?: string;
  reason?: string;
  error?: string;
}

/**
 * Web Crypto kullanarak HMAC-SHA256 imzası (paytr_token) üretir.
 */
export async function computePayTRLinkToken(params: {
  name: string;
  priceInKurus: number;
  currency: string;
  maxInstallment: string;
  linkType: 'collection' | 'product';
  lang: string;
  email: string;
  merchantKey: string;
  merchantSalt: string;
}): Promise<string> {
  const {
    name,
    priceInKurus,
    currency,
    maxInstallment,
    linkType,
    lang,
    email,
    merchantKey,
    merchantSalt,
  } = params;

  // PayTR Dökümanı:
  // required = name + price + currency + max_installment + link_type + lang;
  // if (link_type == 'collection') required += email;
  const required = `${name}${priceInKurus}${currency}${maxInstallment}${linkType}${lang}${email}`;
  const dataToSign = required + merchantSalt;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(merchantKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(dataToSign));
  let binary = '';
  const bytes = new Uint8Array(signature);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * PayTR Link API üzerinden yeni bir ödeme bağlantısı oluşturur.
 * Öncelikle sunucu (Cloudflare Worker) API'sini çağırır.
 * Yerel test ortamında veya doğrudan çağrıda ise PayTR API'sine doğrudan bağlanır.
 */
export async function requestPayTRLink(params: PayTRLinkParams): Promise<PayTRLinkResult> {
  // Önce sunucu / Cloudflare Worker üzerindeki /api/paytr/create-link uç noktasını dene
  try {
    const res = await fetch('/api/paytr/create-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: params.merchantId,
        merchant_key: params.merchantKey,
        merchant_salt: params.merchantSalt,
        name: params.name,
        amount: params.amount,
        email: params.email,
        phone: params.phone,
        currency: params.currency || 'TL',
        max_installment: params.maxInstallment || '12',
        callback_id: params.callbackId,
        callback_link: params.callbackUrl,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && (data.status === 'success' || data.status === 'failed')) {
        return data;
      }
    }
  } catch {
    // Sunucu uç noktası erişilemezse (örn. yerel geliştirme ortamında) doğrudan PayTR API çağrısına devam et
  }

  // Doğrudan PayTR API çağrısı (Client-side / Fallback)
  if (!params.merchantId || !params.merchantKey || !params.merchantSalt) {
    return {
      status: 'failed',
      reason: 'PayTR API bilgileri (Mağaza No, Parola, Salt) henüz tanımlanmadı. Lütfen yönetim panelinden ayarlayın.',
    };
  }

  try {
    let cleanName = params.name.trim();
    if (cleanName.length < 4) {
      cleanName = `İmperya Media - ${cleanName || 'Hizmet Bedeli'}`;
    }
    if (cleanName.length > 200) {
      cleanName = cleanName.slice(0, 200);
    }

    const priceInKurus = Math.round(Number(params.amount) * 100);
    const currency = params.currency || 'TL';
    const maxInstallment = params.maxInstallment || '12';
    const linkType = 'collection';
    const lang = 'tr';
    const email = params.email.trim();

    // PayTR Kuralları:
    // 1) callback_link en fazla 400 karakter, http/https ile başlamalı, localhost olmamalı ve port (:3000 vb.) içermemelidir.
    // 2) callback_id en fazla 64 karakter ve KESİNLİKLE alfanümerik olmalıdır (alt çizgi, tire vs. kabul edilmez).
    // 3) Opsiyonel alanlardır. Eğer geçerli bir canlı domain yoksa boş gönderilmelidir.
    let callbackLink = '';
    let callbackId = '';

    if (params.callbackUrl && !params.callbackUrl.includes('localhost') && !params.callbackUrl.includes(':')) {
      callbackLink = params.callbackUrl;
      callbackId = (params.callbackId || `IMP${Date.now()}`).replace(/[^a-zA-Z0-9]/g, '');
    } else if (
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost' &&
      !window.location.host.includes(':') &&
      window.location.protocol.startsWith('http')
    ) {
      callbackLink = `${window.location.origin}/api/paytr/callback`;
      callbackId = (params.callbackId || `IMP${Date.now()}`).replace(/[^a-zA-Z0-9]/g, '');
    }

    const paytrToken = await computePayTRLinkToken({
      name: cleanName,
      priceInKurus,
      currency,
      maxInstallment,
      linkType,
      lang,
      email,
      merchantKey: params.merchantKey,
      merchantSalt: params.merchantSalt,
    });

    const formData = new URLSearchParams();
    formData.append('merchant_id', params.merchantId);
    formData.append('name', cleanName);
    formData.append('price', String(priceInKurus));
    formData.append('currency', currency);
    formData.append('max_installment', maxInstallment);
    formData.append('link_type', linkType);
    formData.append('lang', lang);
    formData.append('email', email);
    formData.append('min_count', '');
    formData.append('max_count', '1');
    formData.append('debug_on', '1');
    formData.append('paytr_token', paytrToken);

    if (callbackLink && callbackId) {
      formData.append('callback_link', callbackLink);
      formData.append('callback_id', callbackId);
    }

    const response = await fetch('https://www.paytr.com/odeme/api/link/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      status: 'failed',
      reason: error?.message || 'PayTR sunucusuna bağlanırken bir hata oluştu.',
    };
  }
}

/**
 * PayTR Link API silme işlemi (Materials/PayTR Link API - Delete)
 */
export async function deletePayTRLink(
  linkId: string,
  merchantId: string,
  merchantKey: string,
  merchantSalt: string
): Promise<{ status: string; reason?: string }> {
  try {
    const apiRes = await fetch('/api/paytr/delete-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: linkId,
        merchant_id: merchantId,
        merchant_key: merchantKey,
        merchant_salt: merchantSalt,
      }),
    });
    if (apiRes.ok) {
      const data = await apiRes.json();
      return data;
    }
  } catch {}

  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(merchantKey),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signData = `${linkId}${merchantId}${merchantSalt}`;
    const signature = await crypto.subtle.sign('HMAC', key, enc.encode(signData));
    let binary = '';
    const bytes = new Uint8Array(signature);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const paytrToken = btoa(binary);

    const formData = new URLSearchParams();
    formData.append('merchant_id', merchantId);
    formData.append('id', linkId);
    formData.append('debug_on', '1');
    formData.append('paytr_token', paytrToken);

    const res = await fetch('https://www.paytr.com/odeme/api/link/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });
    return await res.json();
  } catch (e: any) {
    return { status: 'failed', reason: e?.message };
  }
}

/**
 * PayTR API kimlik bilgilerini canlı test etmek için 10 TL'lik geçici link oluşturur ve hemen siler.
 */
export async function testPayTRCredentials(
  merchantId: string,
  merchantKey: string,
  merchantSalt: string
): Promise<{ success: boolean; message: string; sampleLink?: string }> {
  if (!merchantId || !merchantKey || !merchantSalt) {
    return {
      success: false,
      message: 'Lütfen Mağaza No, Parola ve Gizli Anahtar alanlarının hepsini doldurun.',
    };
  }

  const result = await requestPayTRLink({
    merchantId,
    merchantKey,
    merchantSalt,
    name: 'İmperya Media POS Test',
    amount: 10,
    email: 'test@imperyamediasolutions.com',
  });

  if (result.status === 'success' && result.link) {
    // Test linkini temizle (sil)
    if (result.id) {
      deletePayTRLink(result.id, merchantId, merchantKey, merchantSalt).catch(() => {});
    }
    return {
      success: true,
      message: 'Tebrikler! PayTR API bağlantısı başarıyla kuruldu. Mağaza bilgileri geçerli.',
      sampleLink: result.link,
    };
  }

  return {
    success: false,
    message: result.reason || result.error || 'PayTR kimlik doğrulaması başarısız oldu.',
  };
}
