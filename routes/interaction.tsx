import { PageProps } from "$fresh/server.ts";
import { Handler } from "$fresh/server.ts";

export const handler: Handler = async (req, ctx) => {
  // const formParams = await ctx.request.body({ type: "form" }).value;
  // const paymentAlert = Object.fromEntries(
  //   formParams.entries(),
  // );
  // console.log("interaction", paymentAlert);
  // const senderIp = getSenderIp(ctx.request);
  // try {
  //   await checkPaymentAlert(paymentPropsToCheck, paymentAlert, senderIp);
  //   ctx.response.status = 200;
  // } catch (e) {
  //   console.log(e.message);
  //   ctx.response.status = 500;
  // }

  console.dir(await req.text());
  return new Response(
    null,
    {
      status: 200,
    },
  );
};

// export default function (props: PageProps) {

// }
