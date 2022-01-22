import * as yup from "i/yup.ts";

const ik_co_id = yup
  .string()
  .matches(/^[\w-]{1,36}$/)
  .required();
const ik_pm_no = yup
  .string()
  .matches(/^[\w-]{1,50}$/)
  .required();
const ik_cur = yup
  .string()
  .matches(/^.{3}$/)
  .required();
const ik_am = yup
  .string()
  .matches(/^[\d]{1,8}([.,][\d]{1,2})?$/)
  .required();
const ik_desc = yup
  .string()
  .matches(/^.{1,255}$/)
  .required();
const ik_exp = yup.string().matches(/^.{0,30}$/);
const ik_ltm = yup.string().matches(/^[\d]{1,10}$/);
const ik_cli = yup.string().matches(/^.{0,64}$/);
const pay_token = yup.string().matches(/[\w/'":;[]{}+=-]{10,}/);
const ik_sign = yup.string().matches(/^.{0,128}$/);
const ik_loc = yup.string().matches(/^.{5}$/);
const url = yup.string().url();
const ik_act = yup.string().oneOf(["process", "payways", "payway"]);
const ik_sub_acc_no = yup.string().matches(/^[\w-]{1,32}$/);

const interkassaPaymentRequest = yup.object({
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
});

/**
 * https://t.ly/fyx7
 */
export type InterkassaPaymentRequest = yup.Asserts<
  typeof interkassaPaymentRequest
>;

const interkassaPaymentAlert = yup.object({
  ik_co_id,
  ik_pm_no,
  ik_desc,
  ik_pw_via: yup.string(),
  ik_am,
  ik_cur,
  ik_act: ik_act.required(),
  ik_sign,
  //* Additional
  ik_inv_id: yup.string(),
  ik_co_prs_id: yup.string(),
  ik_trn_id: yup.string(),
  ik_inv_crt: yup.string(),
  ik_inv_prc: yup.string(),
  ik_inv_st: yup.string(),
  ik_ps_price: yup.string(),
  ik_co_rfn: yup.string(),
  ik_cli,
  //* Special
  ik_p_card_mask: yup.string(),
  ik_p_card_token: pay_token,
});

/**
 * https://t.ly/PYoO
 */
export type InterkassaPaymentAlert = yup.Asserts<typeof interkassaPaymentAlert>;
