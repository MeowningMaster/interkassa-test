import "./imports/dotenv.ts";
import { Application } from "./imports/oak.ts";

const env = Deno.env.toObject();
const port = Number(env.PORT);

const app = new Application();

app.use((ctx) => {
    ctx.response.body = "Hello world!";
});

await app.listen({ port });
