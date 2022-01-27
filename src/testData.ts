import { nanoid } from "i/nanoid.ts";
import { consts } from "src/consts.ts";
import {
  InterkassaPaymentRequest,
  PaymentDataToCheck,
} from "./interkassa/types.ts";

export const paymentPropsToCheck: PaymentDataToCheck = {
  ik_co_id: "61eb4664a9d4f77b7f55e1a4",
  ik_am: "115.00", // always keep 2 places after decimal point
};

export const paymentProps = (): InterkassaPaymentRequest => ({
  ...paymentPropsToCheck,
  ik_pm_no: nanoid(),
  ik_cur: "UAH",
  ik_desc: "Описание",
  ik_act: undefined,
  ik_cli: undefined,
  ik_exp: undefined,
  ik_loc: undefined,
  ik_ltm: undefined,
  ik_pay_token: undefined,
  ik_sub_acc_no: undefined,
  ik_ia_u: consts.INTERKASSA.URLS.INTERACTION,
  ik_suc_u: consts.INTERKASSA.URLS.SUCCESS,
  ik_fal_u: consts.INTERKASSA.URLS.FAIL,
  ik_pnd_u: consts.INTERKASSA.URLS.PENDING,
  ik_sign: undefined,
});
