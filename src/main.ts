import { appHandler } from "./components/App.tsx";
import { Application, Router } from "i/oak.ts";
import { consts, interactionPath } from "src/consts.ts";
import { checkPaymentAlert } from "./interkassa/functions.ts";

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
  .get("/:rt", (ctx) => {
    ctx.response.body = ctx.params.rt;
  })
  .post(interactionPath, async (ctx) => {
      console.log(await ctx.request.body().value);
  });

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port });
console.log(`Server started on ${consts.PORT}`);