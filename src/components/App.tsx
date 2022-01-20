/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";

function App() {
    return (
      <html>
        <head>
          <title>Interkassa test</title>
        </head>
        <body>
          <h1>Hello world</h1>
        </body>
      </html>
    );
  }

export function handler(req: Request) {
    const html = renderSSR(<App />);
    return new Response(html, {
        headers: {
            "content-type": "text/html",
        },
    });
}
