/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, renderSSR } from "../imports/nano.ts";
import { Context } from "../imports/oak.ts";

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

export function handler(_ctx: Context) {
    const html = renderSSR(<App />);
    return new Response(html, {
        headers: {
            "content-type": "text/html",
        },
    });
}
