// worker/audioProxy.ts
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");
    if (!target) {
      return new Response("Missing url", { status: 400 });
    }

    const upstream = await fetch(target);
    if (!upstream.ok || !upstream.body) {
      return new Response("Upstream error", { status: 502 });
    }

    const contentType =
      upstream.headers.get("content-type") ?? "audio/mpeg";

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
        "Transfer-Encoding": "chunked",
      },
    });
  },
} satisfies ExportedHandler;
