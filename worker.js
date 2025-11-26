export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Step 1: Redirect user to GitHub OAuth
    if (url.pathname === "/admin/auth") {
      const redirect_uri = "https://morningsidezw.com/admin/callback";
      const githubAuth = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=repo,user`;

      return Response.redirect(githubAuth, 302);
    }

    // Step 2: GitHub redirects back here
    if (url.pathname === "/admin/callback") {
      const code = url.searchParams.get("code");
      if (!code) return new Response("Missing ?code", { status: 400 });

      // Exchange code for access token
      const tokenRes = await fetch(
        `https://github.com/login/oauth/access_token`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code
          })
        }
      );

      const data = await tokenRes.json();

      if (!data.access_token) {
        return new Response(JSON.stringify(data), { status: 500 });
      }

      // Redirect token back to Decap CMS
      return Response.redirect(
        `/admin/#access_token=${data.access_token}`,
        302
      );
    }

    return new Response("Not found", { status: 404 });
  }
};
