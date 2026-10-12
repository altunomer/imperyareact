export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API Handling
    if (url.pathname.startsWith('/api/')) {
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      const storage = env.IMPERYA_STORAGE || env.STORAGE;

      // /api/services
      if (url.pathname === '/api/services') {
        if (request.method === 'GET') {
          try {
            const data = storage ? await storage.get('services') : null;
            return new Response(data || 'null', {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
        if (request.method === 'POST') {
          try {
            const body = await request.text();
            if (storage) await storage.put('services', body);
            return new Response(JSON.stringify({ success: true }), {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
      }

      // /api/references
      if (url.pathname === '/api/references') {
        if (request.method === 'GET') {
          try {
            const data = storage ? await storage.get('references') : null;
            return new Response(data || 'null', {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
        if (request.method === 'POST') {
          try {
            const body = await request.text();
            if (storage) await storage.put('references', body);
            return new Response(JSON.stringify({ success: true }), {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
      }

      // /api/projects
      if (url.pathname === '/api/projects') {
        if (request.method === 'GET') {
          try {
            const data = storage ? await storage.get('projects') : null;
            return new Response(data || 'null', {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
        if (request.method === 'POST') {
          try {
            const body = await request.text();
            if (storage) await storage.put('projects', body);
            return new Response(JSON.stringify({ success: true }), {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
      }

      // /api/settings
      if (url.pathname === '/api/settings') {
        if (request.method === 'GET') {
          try {
            const data = storage ? await storage.get('settings') : null;
            return new Response(data || 'null', {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
        if (request.method === 'POST') {
          try {
            const body = await request.text();
            if (storage) await storage.put('settings', body);
            return new Response(JSON.stringify({ success: true }), {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
      }

      // /api/inquiries
      if (url.pathname === '/api/inquiries') {
        if (request.method === 'GET') {
          try {
            const data = storage ? await storage.get('inquiries') : null;
            return new Response(data || '[]', {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
        if (request.method === 'POST') {
          try {
            const newInq = await request.json();
            const raw = storage ? await storage.get('inquiries') : null;
            const list = raw ? JSON.parse(raw) : [];
            const updated = [newInq, ...list.filter((i) => i.id !== newInq.id)];
            if (storage) await storage.put('inquiries', JSON.stringify(updated));
            return new Response(JSON.stringify({ success: true, count: updated.length }), {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
        if (request.method === 'DELETE') {
          try {
            const { id } = await request.json();
            const raw = storage ? await storage.get('inquiries') : null;
            if (raw && storage) {
              const list = JSON.parse(raw);
              const updated = id ? list.filter((i) => i.id !== id) : [];
              await storage.put('inquiries', JSON.stringify(updated));
            }
            return new Response(JSON.stringify({ success: true }), {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
      }

      // Helper for Web Crypto HMAC SHA-256
      const computeHmacSha256 = async (dataStr, keyStr) => {
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey(
          'raw',
          enc.encode(keyStr),
          { name: 'HMAC', hash: 'SHA-256' },
          false,
          ['sign']
        );
        const signature = await crypto.subtle.sign('HMAC', key, enc.encode(dataStr));
        let binary = '';
        const bytes = new Uint8Array(signature);
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      };

      // /api/paytr/create-link (and alias /api/paytr/create-token)
      if (url.pathname === '/api/paytr/create-link' || url.pathname === '/api/paytr/create-token') {
        if (request.method === 'POST') {
          try {
            const body = await request.json();

            // Load merchant settings from KV storage or request payload
            const settingsRaw = storage ? await storage.get('settings') : null;
            const settings = settingsRaw ? JSON.parse(settingsRaw) : {};

            const merchantId = body.merchant_id || settings.paytrMerchantId || env.PAYTR_MERCHANT_ID;
            const merchantKey = body.merchant_key || settings.paytrMerchantKey || env.PAYTR_MERCHANT_KEY;
            const merchantSalt = body.merchant_salt || settings.paytrMerchantSalt || env.PAYTR_MERCHANT_SALT;

            if (!merchantId || !merchantKey || !merchantSalt) {
              return new Response(JSON.stringify({
                status: 'failed',
                reason: 'PayTR API bilgileri (Mağaza No, Parola, Salt) henüz girilmemiş. Lütfen /welcome-webmaster panelinden bilgilerinizi kaydedin.'
              }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
              });
            }

            let name = (body.name || body.description || 'İmperya Media - Hizmet Bedeli').trim();
            if (name.length < 4) name = `İmperya Media - ${name || 'Hizmet Bedeli'}`;
            if (name.length > 200) name = name.slice(0, 200);

            const price = Math.round(Number(body.amount) * 100); // Kuruş integer
            const currency = body.currency || 'TL';
            const maxInstallment = body.max_installment ? String(body.max_installment) : '12';
            const linkType = 'collection'; // Tahsilat modu
            const lang = body.lang || 'tr';
            const email = (body.email || 'musteri@imperyamediasolutions.com').trim();
            const minCount = '';
            const maxCount = '1';
            const debugOn = '1';

            // PayTR Dokümantasyon İmzası:
            // required = name + price + currency + max_installment + link_type + lang + email;
            const required = `${name}${price}${currency}${maxInstallment}${linkType}${lang}${email}`;
            const paytrToken = await computeHmacSha256(required + merchantSalt, merchantKey);

            // PayTR Kuralları:
            // 1) callback_link en fazla 400 karakter, http/https ile başlamalı, localhost olmamalı ve port (:3000 vb.) içermemelidir.
            // 2) callback_id en fazla 64 karakter ve KESİNLİKLE alfanümerik olmalıdır (alt çizgi, tire vb. yasaktır).
            // 3) Opsiyonel alanlardır. Eğer geçerli bir canlı domain yoksa boş geçilmelidir.
            let callbackLink = '';
            let callbackId = '';

            if (body.callback_link && !body.callback_link.includes('localhost') && !body.callback_link.includes(':')) {
              callbackLink = body.callback_link;
              callbackId = (body.callback_id || `IMP${Date.now()}`).replace(/[^a-zA-Z0-9]/g, '');
            } else if (url.hostname !== 'localhost' && !url.host.includes(':') && url.protocol.startsWith('http')) {
              callbackLink = `${url.origin}/api/paytr/callback`;
              callbackId = (body.callback_id || `IMP${Date.now()}`).replace(/[^a-zA-Z0-9]/g, '');
            }

            const postParams = new URLSearchParams({
              merchant_id: merchantId,
              name: name,
              price: String(price),
              currency: currency,
              max_installment: maxInstallment,
              link_type: linkType,
              lang: lang,
              min_count: minCount,
              email: email,
              max_count: maxCount,
              debug_on: debugOn,
              paytr_token: paytrToken,
            });

            if (callbackLink && callbackId) {
              postParams.append('callback_link', callbackLink);
              postParams.append('callback_id', callbackId);
            }

            const paytrRes = await fetch('https://www.paytr.com/odeme/api/link/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: postParams.toString(),
            });

            const paytrData = await paytrRes.json();
            return new Response(JSON.stringify(paytrData), {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ status: 'failed', reason: e.message }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
      }

      // /api/paytr/delete-link
      if (url.pathname === '/api/paytr/delete-link') {
        if (request.method === 'POST') {
          try {
            const body = await request.json();
            const settingsRaw = storage ? await storage.get('settings') : null;
            const settings = settingsRaw ? JSON.parse(settingsRaw) : {};

            const merchantId = body.merchant_id || settings.paytrMerchantId || env.PAYTR_MERCHANT_ID;
            const merchantKey = body.merchant_key || settings.paytrMerchantKey || env.PAYTR_MERCHANT_KEY;
            const merchantSalt = body.merchant_salt || settings.paytrMerchantSalt || env.PAYTR_MERCHANT_SALT;

            const id = body.id;
            const signStr = `${id}${merchantId}${merchantSalt}`;
            const paytrToken = await computeHmacSha256(signStr, merchantKey);

            const postParams = new URLSearchParams({
              merchant_id: merchantId,
              id: id,
              debug_on: '1',
              paytr_token: paytrToken,
            });

            const paytrRes = await fetch('https://www.paytr.com/odeme/api/link/delete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: postParams.toString(),
            });

            const paytrData = await paytrRes.json();
            return new Response(JSON.stringify(paytrData), {
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          } catch (e) {
            return new Response(JSON.stringify({ status: 'failed', reason: e.message }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
        }
      }

      // /api/paytr/callback (PayTR Webhook Bildirimi)
      if (url.pathname === '/api/paytr/callback') {
        if (request.method === 'POST') {
          try {
            const formData = await request.formData();
            const post = Object.fromEntries(formData.entries());

            const settingsRaw = storage ? await storage.get('settings') : null;
            const settings = settingsRaw ? JSON.parse(settingsRaw) : {};
            const merchantKey = settings.paytrMerchantKey || env.PAYTR_MERCHANT_KEY;
            const merchantSalt = settings.paytrMerchantSalt || env.PAYTR_MERCHANT_SALT;

            if (merchantKey && merchantSalt && post.hash) {
              const hashStr = `${post.callback_id || ''}${post.merchant_oid || ''}${merchantSalt}${post.status || ''}${post.total_amount || ''}`;
              const expectedHash = await computeHmacSha256(hashStr, merchantKey);
              if (expectedHash !== post.hash) {
                return new Response('PAYTR notification failed: bad hash', { status: 400 });
              }
            }

            if (post.status === 'success' && storage) {
              const raw = await storage.get('transactions');
              const txs = raw ? JSON.parse(raw) : [];
              txs.unshift({
                id: post.callback_id || String(Date.now()),
                merchantOid: post.merchant_oid || '',
                amount: post.total_amount ? Number(post.total_amount) / 100 : 0,
                status: 'success',
                date: new Date().toISOString(),
              });
              await storage.put('transactions', JSON.stringify(txs.slice(0, 100)));
            }

            return new Response('OK');
          } catch {
            return new Response('OK');
          }
        }
      }

      // /api/paytr/transactions
      if (url.pathname === '/api/paytr/transactions') {
        if (request.method === 'GET') {
          const raw = storage ? await storage.get('transactions') : null;
          return new Response(raw || '[]', {
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
      }

      return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Default: serve static assets from ./out
    if (env.ASSETS) {
      const assetRes = await env.ASSETS.fetch(request);
      if (assetRes.ok && request.method === 'GET') {
        const pathname = url.pathname;
        let cacheHeader = '';
        if (pathname.startsWith('/_next/static/')) {
          cacheHeader = 'public, max-age=31536000, immutable';
        } else if (pathname.match(/\.(webp|png|jpg|jpeg|svg|ico|woff|woff2|ttf)$/i)) {
          cacheHeader = 'public, max-age=2592000, stale-while-revalidate=86400';
        }
        if (cacheHeader) {
          const newHeaders = new Headers(assetRes.headers);
          newHeaders.set('Cache-Control', cacheHeader);
          return new Response(assetRes.body, {
            status: assetRes.status,
            statusText: assetRes.statusText,
            headers: newHeaders,
          });
        }
      }
      return assetRes;
    }

    return new Response('Not Found', { status: 404 });
  },
};
