// Define your admin files here
// You can inline index.html content or load from KV/other storage
const adminFiles = {
  "/admin/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Admin — Morningside Automation</title>
  <link rel="stylesheet" href="/output.css">
  <link rel="stylesheet" href="/styles/tailwind-custom.css">
  <script>
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('gh_token='));
    if (!tokenCookie) window.location.href = '/auth';
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
</html>`
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve admin files
    if (url.pathname.startsWith("/admin")) {
      const path = url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname;
      if (adminFiles[path]) {
        return new Response(adminFiles[path], { headers: { "Content-Type": "text/html" } });
      }
      return new Response("Not Found", { status: 404 });
    }

    // Start OAuth
    if (url.pathname === "/auth") {
      const redirect = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${url.origin}/callback`;
      return Response.redirect(redirect, 302);
    }

    // OAuth callback
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

      // Set a cookie for your admin page
      const headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Set-Cookie", `gh_token=${tokenData.access_token}; Path=/; HttpOnly`);
      return new Response(JSON.stringify(tokenData), { headers });
    }

    // Fallback: just return a message (GitHub Pages still serves public pages)
    return new Response("OAuth proxy running.");
  }
};
