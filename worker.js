// Import all admin assets
import adminHTML from './admin/index.html?raw';
import tailwindCSS from './output.css?raw';
import customCSS from './styles/tailwind-custom.css?raw';

// Map of all files to serve under /admin
const adminFiles = {
  '/admin/index.html': { content: adminHTML, type: 'text/html' },
  '/output.css': { content: tailwindCSS, type: 'text/css' },
  '/styles/tailwind-custom.css': { content: customCSS, type: 'text/css' },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve admin files
    if (url.pathname.startsWith('/admin')) {
      const file =
        adminFiles[url.pathname] ||
        adminFiles[url.pathname + '/index.html'];
      if (file) {
        return new Response(file.content, {
          headers: { 'Content-Type': file.type },
        });
      }
      return new Response('Not Found', { status: 404 });
    }

    // OAuth start
    if (url.pathname === '/auth') {
      const redirect = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${url.origin}/callback`;
      return Response.redirect(redirect, 302);
    }

    // OAuth callback
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const tokenRes = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
          }),
        }
      );
      const tokenData = await tokenRes.json();
      return new Response(JSON.stringify(tokenData), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('OAuth proxy running.');
  },
};
