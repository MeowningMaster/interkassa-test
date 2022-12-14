import { Static, Type } from "@sinclair/typebox";
import * as ajv from "ajv";
import { InterkassaPaymentAlertValidationError } from "./errors.ts";

const ik_co_id = Type.RegEx(/^[\w-]{1,36}$/);
const ik_pm_no = Type.RegEx(/^[\w-]{1,50}$/);
const ik_cur = Type.RegEx(/^.{3}$/);
const ik_am = Type.RegEx(/^[\d]{1,8}([.,][\d]{1,2})?$/);
const ik_desc = Type.RegEx(/^.{1,255}$/);
const ik_exp = Type.Optional(Type.RegEx(/^.{0,30}$/));
const ik_ltm = Type.Optional(Type.RegEx(/^[\d]{1,10}$/));
const ik_cli = Type.Optional(Type.RegEx(/^.{0,64}$/));
const pay_token = Type.Optional(Type.RegEx(/[\w/'":;[]{}+=-]{10,}/));
const ik_sign = Type.Optional(Type.RegEx(/^.{0,128}$/));
const ik_loc = Type.Optional(Type.RegEx(/^.{5}$/));

const url = Type.Optional(Type.String({ format: "uri" }));

const ik_act = Type.Optional(Type.Union(
  ["process", "payways", "payway"].map((x) => Type.Literal(x)),
));
const ik_sub_acc_no = Type.Optional(Type.RegEx(/^[\w-]{1,32}$/));
const ik_payment_method = Type.Optional(Type.RegEx(/^[a-z0-9]+$/));
const ik_payment_currency = Type.Optional(Type.RegEx(/^[A-Z]{3,7}$/));

export const interkassaPaymentRequestSchema = Type.Object({
  ik_co_id,
  ik_pm_no,
  ik_cur,
  ik_am,
  ik_desc,
  ik_exp,
  ik_ltm,
  ik_cli,
  ik_pay_token: pay_token,
  ik_sign,
  ik_loc,
  ik_ia_u: url,
  ik_suc_u: url,
  ik_pnd_u: url,
  ik_fal_u: url,
  ik_act,
  ik_sub_acc_no,
  ik_payment_method,
  ik_payment_currency,
});

/**
 * https://t.ly/fyx7
 */
export type InterkassaPaymentRequest = Static<
  typeof interkassaPaymentRequestSchema
>;

export const interkassaPaymentAlertSchema = Type.Object({
  ik_co_id,
  ik_pm_no,
  ik_desc,
  ik_pw_via: Type.String(),
  ik_am,
  ik_cur,
  ik_act,
  ik_sign,
  //* Additional
  ik_inv_id: Type.Optional(Type.String()),
  ik_co_prs_id: Type.Optional(Type.String()),
  ik_trn_id: Type.Optional(Type.String()),
  ik_inv_crt: Type.Optional(Type.String()),
  ik_inv_prc: Type.Optional(Type.String()),
  ik_inv_st: Type.Optional(Type.String()),
  ik_ps_price: Type.Optional(Type.String()),
  ik_co_rfn: Type.Optional(Type.String()),
  ik_cli,
  //* Special
  ik_p_card_mask: Type.Optional(Type.String()),
  ik_p_card_token: pay_token,
});

/**
 * https://t.ly/PYoO
 */
export type InterkassaPaymentAlert = Static<
  typeof interkassaPaymentAlertSchema
>;

/**
 * Данные с нашего сервера для проверки
 */
export type PaymentDataToCheck = { ik_co_id: string; ik_am: string };

const validator = new ajv.default();

export const interkassaPaymentAlertValidator = validator.compile<
  InterkassaPaymentAlert
>(
  { ...interkassaPaymentAlertSchema, $async: true },
);

export async function assertPaymentAlertValidation(alert: unknown) {
  try {
    return await interkassaPaymentAlertValidator(alert);
  } catch (e) {
    throw new InterkassaPaymentAlertValidationError(e, alert);
  }
}
