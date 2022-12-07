import { nanoid } from "nanoid";
import { consts } from "./consts.ts";
import {
  InterkassaPaymentRequest,
  PaymentDataToCheck,
} from "../interkassa/types.ts";

export const paymentPropsToCheck: PaymentDataToCheck = {
  ik_co_id: consts.INTERKASSA.CHECKOUT.ID,
  ik_am: "115",
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
