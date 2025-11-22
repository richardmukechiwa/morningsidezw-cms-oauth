// worker.js
const adminFiles = {
  "/admin/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Admin — Morningside Automation</title>
  <link rel="stylesheet" href="/admin/styles/tailwind-custom.css">
  <script>
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('gh_token='));
    if (!tokenCookie) {
      window.location.href = '/auth';
    }
  </script>
</head>
<body>
  <h1>Admin Dashboard</h1>
</body>
</html>`,

  "/admin/styles/tailwind-custom.css": `/* your admin CSS here */`,
  // add more admin static assets if needed
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve admin static files
    if (url.pathname.startsWith("/admin")) {
      const path = url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname;
      if (adminFiles[path]) {
        const contentType = path.endsWith(".css") ? "text/css" : "text/html";
        return new Response(adminFiles[path], { headers: { "Content-Type": contentType } });
      }
      return new Response("Not Found", { status: 404 });
    }

    // OAuth start
    if (url.pathname === "/auth") {
      const redirect = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${url.origin}/callback`;
      return Response.redirect(redirect, 302);
    }

    // OAuth callback
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
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

      // Set cookie and redirect to /admin
      return new Response("Redirecting...", {
        status: 302,
        headers: {
          "Location": "/admin",
          "Set-Cookie": `gh_token=${tokenData.access_token}; Path=/; HttpOnly`
        }
      });
    }

    // Let all other requests pass to your main site
    return fetch(request);
  }
};
