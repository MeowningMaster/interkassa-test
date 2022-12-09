import { Handler, HandlerContext } from "$fresh/server.ts";
import forwardedParse from "forwarded-parse";
import { paymentPropsToCheck } from "../utils/testData.ts";
import { checkPaymentAlert } from "../interkassa/functions.ts";

class NoForwarderHeaderError extends Error {
  constructor() {
    super("No forwarded header found");
  }
}

const behindProxy = false;

const getSenderIp = (req: Request, ctx: HandlerContext) => {
  if (behindProxy) {
    const forwardedHeader = req.headers.get("forwarded");
    if (!forwardedHeader) {
      throw new NoForwarderHeaderError();
    }
    const parseResult = forwardedParse(forwardedHeader);
    return parseResult[0].for;
  }
  const { remoteAddr } = ctx;
  if (remoteAddr.transport === "tcp") {
    return remoteAddr.hostname;
  }
  return "";
};

export const handler: Handler = async (req, ctx) => {
  console.dir(req);
  console.dir(ctx);

  const formData = await req.formData();
  const paymentAlert = Object.fromEntries(formData.entries());
  console.groupCollapsed("Interaction");
  console.dir(paymentAlert);
  console.groupEnd();
  const senderIp = getSenderIp(req, ctx);
  let replyStatus = 200;
  try {
    await checkPaymentAlert(paymentPropsToCheck, paymentAlert, senderIp);
  } catch (e) {
    console.dir(e);
    replyStatus = 500;
  }
  return new Response(
    "Interaction",
    {
      status: replyStatus,
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
};
