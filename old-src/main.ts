// import { consts, interactionPath } from "../utils/consts.ts";
// import { checkPaymentAlert } from "../interkassa/functions.ts";
// import { paymentPropsToCheck } from "../utils/testData.ts";
// import forwardedParse from "forwarded-parse";

// const port = Number(consts.PORT);

// const interkassaVerification = {
//   filename: "61967d8218feee26d32a0798.txt",
//   key: "c638aa4fc2227aa43cc0c6000ef2616c",
// };

// class NoForwarderHeaderError extends Error {
//   constructor() {
//     super("No forwarded header found");
//   }
// }
// const getSenderIp = (req: Request) => {
//   const forwardedHeader = req.headers.get("forwarded");
//   if (!forwardedHeader) {
//     throw new NoForwarderHeaderError();
//   }
//   const parseResult = forwardedParse(forwardedHeader);
//   return parseResult[0].for;
// };

// router
//   .get("/:rt", (ctx) => {
//     ctx.response.headers.set("Content-Type", "text/html");
//     ctx.response.body = `
//       <p>${ctx.params.rt}</p>
//       <a href="${consts.THIS_HOST}">Return to main</a>
//     `;
//   })
//   .post(interactionPath, async (ctx) => {
//     const formParams = await ctx.request.body({ type: "form" }).value;
//     const paymentAlert = Object.fromEntries(
//       formParams.entries(),
//     );
//     console.log("interaction", paymentAlert);
//     const senderIp = getSenderIp(ctx.request);
//     try {
//       await checkPaymentAlert(paymentPropsToCheck, paymentAlert, senderIp);
//       ctx.response.status = 200;
//     } catch (e) {
//       console.log(e.message);
//       ctx.response.status = 500;
//     }
//   });

// app.use(router.routes());
// app.use(router.allowedMethods());
// app.listen({ port });
// console.log(`Server started on ${consts.PORT}`);
