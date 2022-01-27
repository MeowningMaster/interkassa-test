import React from "i/react.ts";
import ReactDOMServer from "i/react-dom/server.ts";
import { Context } from "i/oak.ts";
import { InterkassaPaymentRequest } from "../interkassa/types.ts";
import { signPaymentRequest } from "../interkassa/functions.ts";
import { paymentProps } from "../testData.ts";

function PaymentForm(props: InterkassaPaymentRequest) {
  return (
    <form
      name="payment"
      method="post"
      action="https://sci.interkassa.com/"
      accept-charset="UTF-8"
    >
      {Object.entries(props).map(([key, value]) => {
        return value ? <input type="hidden" name={key} value={value} /> : "";
      })}
      <input type="submit" value="Pay" />
    </form>
  );
}

function App() {
  const req = paymentProps();
  signPaymentRequest(req);

  return (
    <html>
      <head>
        <title>Interkassa test</title>
      </head>
      <body>
        <PaymentForm {...req} />
      </body>
    </html>
  );
}

export function appHandler(ctx: Context) {
  const html = ReactDOMServer.renderToString(<App />);
  ctx.response.body = html;
}
