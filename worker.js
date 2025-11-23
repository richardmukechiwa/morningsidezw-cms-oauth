// =======================================
// Worker.js for Morningside Admin
// =======================================

// Tailwind CSS output (trimmed here for brevity, paste full output.css content)
const adminCSS = `
/*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com */
/* Paste full output.css content here */
`;

// Custom CSS
const customCSS = `
:root { 
  --brand-navy: #0A1B2A;
  --brand-accent: #FF6A00;
}
body { 
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; 
  margin: 0;
  padding: 0;
}
.brand-accent { color: var(--brand-accent); }
.bg-accent { background-color: var(--brand-accent); }
.text-navy { color: var(--brand-navy); }
a:focus { outline: 3px solid rgba(255,106,0,0.25); outline-offset: 2px; }
img { max-width: 100%; height: auto; }
.container { max-width: 68rem; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem; }
footer p { margin: 0; }
`;

// Inlined admin index.html template
function getAdminHTML() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Admin — Morningside Automation</title>
<style>
${adminCSS}
${customCSS}
</style>
<script>
  const tokenCookie = document.cookie.split('; ').find(r => r.startsWith('gh_token='));
  if (!tokenCookie) window.location.href='/auth';
</script>
</head>
<body class="bg-gray-50 text-gray-900">
<header class="bg-white shadow p-4">
  <div class="max-w-5xl mx-auto flex justify-between items-center">
    <h1 class="text-2xl font-bold">Admin Dashboard</h1>
  </div>
</header>
<main class="max-w-5xl mx-auto p-6">
  <section class="bg-white shadow rounded-lg p-6 mb-6">
    <h2 class="text-2xl font-bold mb-4">Welcome, Admin</h2>
    <p class="text-gray-700 mb-4">This area is protected. You are successfully logged in via GitHub OAuth.</p>
    <p class="text-gray-600">Use this page to manage site content, workflows, or monitor activity.</p>
  </section>
  <section class="bg-white shadow rounded-lg p-6">
    <h3 class="text-xl font-semibold mb-3">Placeholder Widgets</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-orange-50 p-4 rounded">Widget 1</div>
      <div class="bg-orange-50 p-4 rounded">Widget 2</div>
      <div class="bg-orange-50 p-4 rounded">Widget 3</div>
      <div class="bg-orange-50 p-4 rounded">Widget 4</div>
    </div>
  </section>
</main>
</body>
</html>`;
}

// =======================================
// Worker Fetch Handler
// =======================================
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // --- Admin routes ---
    if (url.pathname.startsWith("/admin")) {
      return new Response(getAdminHTML(), {
        headers: { "Content-Type": "text/html" },
      });
    }

    // --- OAuth start ---
    if (url.pathname === "/auth") {
      const redirect = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${url.origin}/callback`;
      return Response.redirect(redirect, 302);
    }

    // --- OAuth callback ---
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) return new Response("Missing code", { status: 400 });

      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const tokenData = await tokenRes.json();

      const headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Set-Cookie", `gh_token=${tokenData.access_token}; Path=/; HttpOnly; Secure`);

      return new Response(JSON.stringify(tokenData), { headers });
    }

    // --- Fallback: let GitHub Pages serve homepage and other static files ---
    return fetch(request);
  },
};
