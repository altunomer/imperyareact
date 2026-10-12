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
