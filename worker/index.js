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

      // /api/paytr/create-token
      if (url.pathname === '/api/paytr/create-token') {
        if (request.method === 'POST') {
          try {
            const body = await request.json();
            const { name, email, phone, amount, description } = body;

            // Load merchant settings from storage
            const settingsRaw = storage ? await storage.get('settings') : null;
            const settings = settingsRaw ? JSON.parse(settingsRaw) : {};

            const merchantId = settings.paytrMerchantId || env.PAYTR_MERCHANT_ID;
            const merchantKey = settings.paytrMerchantKey || env.PAYTR_MERCHANT_KEY;
            const merchantSalt = settings.paytrMerchantSalt || env.PAYTR_MERCHANT_SALT;
            const testMode = settings.paytrTestMode ? '1' : '0';

            if (!merchantId || !merchantKey || !merchantSalt) {
              return new Response(JSON.stringify({
                simulated: true,
                message: 'PayTR bilgileri henüz girilmedi, test simülasyonu çalışıyor.'
              }), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
              });
            }

            const merchantOid = 'IMP' + Date.now();
            const userIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
            const paymentAmount = Math.round(Number(amount) * 100); // Kuruş cinsinden
            const userBasket = JSON.stringify([[description || 'Hizmet Bedeli', String(amount), 1]]);
            const noInstallment = '0';
            const maxInstallment = '12';
            const currency = 'TL';
            const merchantOkUrl = new URL('/odeme?status=success', request.url).toString();
            const merchantFailUrl = new URL('/odeme?status=fail', request.url).toString();

            // Hash calculation: merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket + no_installment + max_installment + currency + test_mode + merchant_salt
            const hashStr = `${merchantId}${userIp}${merchantOid}${email}${paymentAmount}${userBasket}${noInstallment}${maxInstallment}${currency}${testMode}${merchantSalt}`;

            const enc = new TextEncoder();
            const key = await crypto.subtle.importKey(
              'raw',
              enc.encode(merchantKey),
              { name: 'HMAC', hash: 'SHA-256' },
              false,
              ['sign']
            );
            const signature = await crypto.subtle.sign('HMAC', key, enc.encode(hashStr));
            const paytrTokenHash = btoa(String.fromCharCode(...new Uint8Array(signature)));

            const postParams = new URLSearchParams({
              merchant_id: merchantId,
              user_ip: userIp,
              merchant_oid: merchantOid,
              email: email,
              payment_amount: String(paymentAmount),
              paytr_token: paytrTokenHash,
              user_basket: userBasket,
              user_name: name,
              user_address: settings.address || 'Kayseri',
              user_phone: phone,
              merchant_ok_url: merchantOkUrl,
              merchant_fail_url: merchantFailUrl,
              timeout_limit: '30',
              currency: currency,
              test_mode: testMode,
              no_installment: noInstallment,
              max_installment: maxInstallment,
            });

            const paytrRes = await fetch('https://www.paytr.com/odeme/api/get-token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: postParams.toString(),
            });

            const paytrData = await paytrRes.json();
            return new Response(JSON.stringify(paytrData), {
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

      // /api/paytr/callback
      if (url.pathname === '/api/paytr/callback') {
        if (request.method === 'POST') {
          // PayTR notification callback returns OK
          return new Response('OK', { headers: corsHeaders });
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
