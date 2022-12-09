import { Handler } from "$fresh/server.ts";
import forwardedParse from "forwarded-parse";
import { paymentPropsToCheck } from "../utils/testData.ts";
import { checkPaymentAlert } from "../interkassa/functions.ts";

class NoForwarderHeaderError extends Error {
  constructor() {
    super("No forwarded header found");
  }
}

const getSenderIp = (req: Request) => {
  const forwardedHeader = req.headers.get("forwarded");
  if (!forwardedHeader) {
    throw new NoForwarderHeaderError();
  }
  const parseResult = forwardedParse(forwardedHeader);
  return parseResult[0].for;
};

export const handler: Handler = async (req, ctx) => {
  const formData = await req.formData();
  const paymentAlert = Object.fromEntries(formData.entries());
  console.dir(paymentAlert);
  const senderIp = getSenderIp(req);
  let replyStatus = 200;
  try {
    await checkPaymentAlert(paymentPropsToCheck, paymentAlert, senderIp);
  } catch (e) {
    console.dir(e);
    replyStatus = 500;
  }
  return new Response(
    null,
    {
      status: replyStatus,
    },
  );
};
