import { appHandler } from "./components/App.tsx";
import { Application, Router } from "i/oak.ts";
import { consts } from "src/consts.ts";

const port = Number(consts.PORT);

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
      const context = ctx.params.context;
      console.log(context, ctx.request.body);
      ctx.response.body = context;
  });

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port });
