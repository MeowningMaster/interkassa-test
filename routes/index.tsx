import { Head } from "$fresh/runtime.ts";
import { signPaymentRequest } from "../interkassa/functions.ts";
import { paymentProps } from "../utils/testData.ts";
import PaymentForm from "../islands/PaymentForm.tsx";

export default function Home() {
  const req = paymentProps();
  signPaymentRequest(req);

  return (
    <>
      <Head>
        <title>Interkassa test</title>
      </Head>
      <div>
        <p>
          <PaymentForm {...req} />
        </p>
      </div>
    </>
  );
}
