import "https://deno.land/x/dotenv@v3.1.0/load.ts";

const env = Deno.env.toObject();
const port = Number(env.PORT);

const listener = Deno.listen({ port });

for await (const connection of listener) {
    const httpConnection = Deno.serveHttp(connection);
    for await (const { request: _req, respondWith: res } of httpConnection) {
        res(new Response("Interkassa testing platform is running"));
    }
}
