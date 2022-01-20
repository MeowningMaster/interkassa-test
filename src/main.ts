import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { serve } from "https://deno.land/std@0.121.0/http/server.ts";

const env = Deno.env.toObject();
const port = Number(env.PORT);

import { handler } from "./components/App.tsx";
serve(handler, { port });
