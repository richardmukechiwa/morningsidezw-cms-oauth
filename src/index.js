export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1️⃣ Serve /admin/ from GitHub Pages
    if (url.pathname.startsWith("/admin")) {
      const ghPagesBase = "https://richardmukechiwa.github.io/morningsidezw-site";
      const targetUrl = ghPagesBase + url.pathname;
      return Response.redirect(targetUrl, 302);
    }

    // 2️⃣ Start OAuth
    if (url.pathname === "/auth") {
      const redirect = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${url.origin}/callback`;
      return Response.redirect(redirect, 302);
    }

    // 3️⃣ OAuth callback
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
      return new Response(JSON.stringify(tokenData), { headers: { "Content-Type": "application/json" } });
    }

    // 4️⃣ Default response
    return new Response("OAuth proxy running.");
  }
};
