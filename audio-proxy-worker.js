export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing ?url=", { status: 400 });
    }

    try {
      const upstream = await fetch(target, {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      if (!upstream.ok) {
        return new Response("Upstream error", { status: upstream.status });
      }

      return new Response(upstream.body, {
        status: 200,
        headers: {
          "Content-Type":
            upstream.headers.get("Content-Type") || "audio/mpeg",
          "Access-Control-Allow-Origin": "*",
          "Accept-Ranges": "bytes"
        }
      });
    } catch (err) {
      return new Response("Proxy error", { status: 502 });
    }
  }
};
