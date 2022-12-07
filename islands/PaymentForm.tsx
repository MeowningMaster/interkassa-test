import { InterkassaPaymentRequest } from "../interkassa/types.ts";

export default function PaymentForm(props: InterkassaPaymentRequest) {
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
