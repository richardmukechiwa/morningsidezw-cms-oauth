export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const ADMIN_REPO = "richardmukechiwa/morningsidezw-site";
    const ADMIN_BRANCH = "main";

    // --- OAuth Start ---
    if (url.pathname === "/auth") {
      const redirect = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${url.origin}/callback`;
      return Response.redirect(redirect, 302);
    }

    // --- OAuth Callback ---
    if (url.pathname === "/callback") {
      // existing callback logic
      return new Response("Callback logic placeholder"); // simplified for now
    }

    // --- Serve files ---
    let path = url.pathname;
    if (path.endsWith("/")) path += "index.html"; // map folder requests

    const rawUrl = `https://raw.githubusercontent.com/${ADMIN_REPO}/${ADMIN_BRANCH}${path}`;
    const resp = await fetch(rawUrl, {
      headers: { Authorization: `token ${env.GITHUB_PERSONAL_TOKEN}` } // required for private repo
    });
    if (!resp.ok) return new Response("Not Found", { status: 404 });

    // Determine content type
    let contentType = "text/html";
    if (path.endsWith(".css")) contentType = "text/css";
    if (path.endsWith(".js")) contentType = "application/javascript";
    if (path.endsWith(".png")) contentType = "image/png";
    if (path.endsWith(".jpg") || path.endsWith(".jpeg")) contentType = "image/jpeg";

    return new Response(await resp.arrayBuffer(), { headers: { "Content-Type": contentType } });
  }
};
