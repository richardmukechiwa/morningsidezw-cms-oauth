// Worker.js
// Admin content inlined for internal serving
const adminFiles = {
  "/admin/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Admin — Morningside Automation</title>
<link rel="stylesheet" href="/admin/output.css">
<link rel="stylesheet" href="/admin/tailwind-custom.css">
<script>
const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('gh_token='));
if (!tokenCookie) window.location.href='/auth';
</script>
</head>
<body>
<header>
<h1>Admin Dashboard</h1>
</header>
<main>
<p>Welcome, Admin. You are logged in via GitHub OAuth.</p>
</main>
</body>
</html>`,

  "/admin/output.css": `/*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com */`,

  "/admin/tailwind-custom.css": `:root { 
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
footer p { margin: 0; }`
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // --- Serve Admin Files ---
    if (url.pathname.startsWith("/admin")) {
      const path = url.pathname.endsWith("/") ? "/admin/index.html" : url.pathname;
      if (adminFiles[path]) {
        // Determine content type
        let type = "text/html";
        if (path.endsWith(".css")) type = "text/css";
        return new Response(adminFiles[path], { headers: { "Content-Type": type } });
      }
      return new Response("Not Found", { status: 404 });
    }

    // --- OAuth Start ---
    if (url.pathname === "/") {
      const redirect = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${url.origin}/callback`;
      return Response.redirect(redirect, 302);
    }

    // --- OAuth Callback ---
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) return new Response("Missing code", { status: 400 });

      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code
        })
      });

      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) return new Response("Failed to get token", { status: 500 });

      // Set secure cookie and redirect to /admin
      const headers = new Headers({ "Location": "/admin" });
      headers.append("Set-Cookie", `gh_token=${tokenData.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`);
      return new Response(null, { status: 302, headers });
    }

    // --- Fallback: GitHub Pages serves public site ---
    return fetch(request);
  }
};
