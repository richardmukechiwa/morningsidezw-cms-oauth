const ADMIN_REPO = "richardmukechiwa/morningsidezw-site";
const ADMIN_BRANCH = "main";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // --- OAuth Start ---
    if (url.pathname === "/auth") {
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

      // Set secure cookie for admin
      const headers = new Headers({ "Location": "/admin" });
      headers.append("Set-Cookie", `gh_token=${tokenData.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`);
      return new Response(null, { status: 302, headers });
    }

    // --- Serve Admin Files ---
    if (url.pathname.startsWith("/admin")) {
      // Map /admin and /admin/ to /admin/index.html
      const path = url.pathname.endsWith("/") || url.pathname === "/admin" ? "/admin/index.html" : url.pathname;

      const rawUrl = `https://raw.githubusercontent.com/${ADMIN_REPO}/${ADMIN_BRANCH}${path}`;
      const resp = await fetch(rawUrl);
      if (!resp.ok) return new Response("Not Found", { status: 404 });

      // Determine content type
      let contentType = "text/html";
      if (path.endsWith(".css")) contentType = "text/css";
      if (path.endsWith(".js")) contentType = "application/javascript";
      if (path.endsWith(".png")) contentType = "image/png";
      if (path.endsWith(".jpg") || path.endsWith(".jpeg")) contentType = "image/jpeg";

      return new Response(await resp.arrayBuffer(), { headers: { "Content-Type": contentType } });
    }

    // --- Fallback ---
    // Any other request returns a simple message
    return new Response("OAuth proxy running. Public pages still served by GitHub Pages.");
  }
};
