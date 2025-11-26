export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS
    if (request.method === "OPTIONS") {
      return new Response("", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    // POST /submit → Save testimonial
    if (url.pathname === "/submit" && request.method === "POST") {
      const body = await request.json();

      if (!body.name || !body.message) {
        return new Response("Invalid submission", { status: 400 });
      }

      const id = Date.now().toString();

      await env.TESTIMONIALS.put(id, JSON.stringify({
        name: body.name,
        company: body.company || "",
        message: body.message,
        date: new Date().toISOString()
      }));

      return new Response("Thank you! Your testimonial has been submitted.", {
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    // GET /all → Return testimonials
    if (url.pathname === "/all" && request.method === "GET") {
      const list = await env.TESTIMONIALS.list();
      const items = await Promise.all(
        list.keys.map(k => env.TESTIMONIALS.get(k.name))
      );

      return new Response(JSON.stringify(items), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response("Not found", { status: 404 });
  }
}
