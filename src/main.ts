import "i/dotenv/load.ts";
import { appHandler } from "./components/App.tsx";
import { Application, Router } from "i/oak.ts";

const env = Deno.env.toObject();
const port = Number(env.PORT);

const app = new Application();
const router = new Router();

const interkassaVerification = {
  filename: "61967d8218feee26d32a0798.txt",
  key: "c638aa4fc2227aa43cc0c6000ef2616c",
};

router
  .get(`/${interkassaVerification.filename}`, (ctx) => {
    ctx.response.body = interkassaVerification.key;
  })
  .get("/", appHandler)
  .get("/:context", (ctx) => {
      ctx.response.body = ctx.params.context;
  });

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port });
