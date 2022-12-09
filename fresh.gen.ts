// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[result].tsx";
import * as $1 from "./routes/index.tsx";
import * as $2 from "./routes/interaction.tsx";
import * as $$0 from "./islands/PaymentForm.tsx";

const manifest = {
  routes: {
    "./routes/[result].tsx": $0,
    "./routes/index.tsx": $1,
    "./routes/interaction.tsx": $2,
  },
  islands: {
    "./islands/PaymentForm.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
