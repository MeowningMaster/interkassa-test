import React from "i/react.ts";
import ReactDOMServer from "i/react-dom/server.ts";
import { Context } from "i/oak.ts";
import { InterkassaPaymentRequest } from "../interkassa/types.ts";
import { signPaymentRequest } from "../interkassa/functions.ts";
import { nanoid } from "i/nanoid.ts";

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
  const paymentProps: InterkassaPaymentRequest = {
    ik_co_id: "61eb4664a9d4f77b7f55e1a4",
    ik_pm_no: nanoid(),
    ik_cur: "UAH",
    ik_am: "115",
    ik_desc: "Описание",
    ik_act: undefined,
    ik_cli: undefined,
    ik_exp: undefined,
    ik_fal_u: undefined,
    ik_ia_u: undefined,
    ik_loc: undefined,
    ik_ltm: undefined,
    ik_pay_token: undefined,
    ik_pnd_u: undefined,
    ik_sign: undefined,
    ik_sub_acc_no: undefined,
    ik_suc_u: undefined,
  };
  signPaymentRequest(paymentProps);

  return (
    <html>
      <head>
        <title>Interkassa test</title>
      </head>
      <body>
        <PaymentForm {...paymentProps} />
      </body>
    </html>
  );
}

export function appHandler(ctx: Context) {
  const html = ReactDOMServer.renderToString(<App />);
  ctx.response.body = html;
}
