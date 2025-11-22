const adminFiles = {
  "/admin/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="n8n automation services for finance and small business teams" />
  <title>Richard Mukechiwa | n8n Automation</title>
  <link rel="stylesheet" href="/admin/output.css">
  <link rel="stylesheet" href="/admin/tailwind-custom.css">
  <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
</head>
<body class="bg-gray-50 text-gray-900">
  <header class="bg-white shadow w-full">
    <div class="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3" aria-label="Home">
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="64" height="64" rx="12" fill="#0A1B2A" />
          <text x="50%" y="54%" text-anchor="middle" fill="#FF6A00" font-family="Inter, sans-serif" font-size="28" font-weight="700">RM</text>
        </svg>
      </a>
      <nav class="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
        <a href="/" class="hover:text-gray-900">Home</a>
        <a href="services.html" class="hover:text-gray-900">Services</a>
        <a href="blog/index.html" class="hover:text-gray-900">Blog</a>
        <a href="about.html" class="hover:text-gray-900">About</a>
        <a href="contact.html" class="hover:text-gray-900">Contact</a>
        <a href="/admin/" class="ml-4 inline-flex items-center px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Admin</a>
      </nav>
    </div>
  </header>

  <main class="w-full">
    <section class="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 items-center">
      <div class="flex-1">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">n8n Workflow Automation for Small Finance Teams</h1>
        <p class="text-lg text-gray-700 mb-6 leading-relaxed">Save time, reduce errors, and automate repetitive tasks using reliable workflows built with n8n.</p>
        <div class="flex gap-4 flex-wrap">
          <a href="#" class="inline-block px-5 py-3 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/your-link'});return false;">Book a Free 15‑min Consultation</a>
          <a href="services.html" class="inline-block px-5 py-3 border border-transparent text-orange-600 rounded-md font-medium hover:bg-orange-50">View Services</a>
        </div>
      </div>
      <div class="flex-1">
        <img src="/admin/assets/hero.jpg" alt="Automation Workflow" class="w-full h-80 md:h-96 object-cover rounded-lg shadow-sm">
      </div>
    </section>

    <section id="services-preview" class="mt-12 max-w-6xl mx-auto px-6">
      <h2 class="text-2xl font-semibold mb-4">Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-8 rounded-lg shadow-sm">
          <h3 class="font-semibold mb-2">Workflow Setup</h3>
          <p class="text-sm text-gray-600 leading-relaxed">Design and implement custom n8n workflows tailored for finance operations.</p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-sm">
          <h3 class="font-semibold mb-2">System Integrations</h3>
          <p class="text-sm text-gray-600 leading-relaxed">Connect apps, databases and third-party services into unified systems.</p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-sm">
          <h3 class="font-semibold mb-2">Troubleshooting</h3>
          <p class="text-sm text-gray-600 leading-relaxed">Debug, optimize and maintain workflows for peak performance.</p>
        </div>
      </div>
    </section>

    <section id="case-preview" class="mt-12 max-w-6xl mx-auto px-6">
      <h2 class="text-2xl font-semibold mb-4">Case Study</h2>
      <div class="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row gap-6">
        <img src="/admin/assets/workflow-example.png" alt="Workflow Example" class="w-full md:w-1/3 h-48 object-cover rounded">
        <div>
          <p class="text-sm text-gray-600 leading-relaxed"><strong>Problem:</strong> Manual data entry caused frequent errors.<br><strong>Solution:</strong> Automated the workflow with n8n.<br><strong>Outcome:</strong> Reduced steps from 9 to 2, saving 10+ hours per week.</p>
        </div>
      </div>
    </section>

    <section class="mt-12 max-w-6xl mx-auto px-6">
      <div class="bg-orange-50 border-t border-b border-orange-100 py-8 rounded-lg">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 class="text-xl font-semibold">Ready to save time?</h3>
            <p class="text-sm text-gray-700 leading-relaxed">Book a short consultation and let's map your first automation.</p>
          </div>
          <div>
            <a href="#" onclick="Calendly.initPopupWidget({url:'https://calendly.com/your-link'});return false;" class="px-5 py-3 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600">Book a Consultation</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="bg-white border-t mt-12 w-full">
    <div class="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
      <p>© 2025 Richard Mukechiwa</p>
      <p><a href="mailto:hello@morningsidezw.com" class="text-orange-500">hello@morningsidezw.com</a></p>
    </div>
  </footer>

  <a href="https://wa.me/+263717605044" target="_blank" rel="noopener" class="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg z-50 hover:bg-green-600">WhatsApp</a>
</body>
</html>`,

  "/admin/output.css": `/* Paste your compiled Tailwind CSS here */`,
  "/admin/tailwind-custom.css": `/* Paste your custom Tailwind overrides here */`
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve admin files
    if (url.pathname.startsWith("/admin")) {
      const path = url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname;
      if (adminFiles[path]) {
        let contentType = path.endsWith(".css") ? "text/css" : "text/html";
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
      return new Response(JSON.stringify(tokenData), { headers: { "Content-Type": "application/json" } });
    }

    return new Response("OAuth proxy running.");
  }
};
