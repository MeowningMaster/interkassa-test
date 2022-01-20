import { React, ReactDOMServer } from "../imports/react.ts";
import { Context } from "../imports/oak.ts";
import { InterkassaPaymentRequest } from "../interkassa/types.ts";
import { signPaymentRequest } from "../interkassa/functions.ts";

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
    ik_co_id: "61967d8218feee26d32a0798",
    ik_pm_no: "ID_32421",
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
