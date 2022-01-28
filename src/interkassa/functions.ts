import {
  InterkassaPaymentAlertError,
  InterkassaPaymentAlertIncorrectDataError,
  InterkassaPaymentAlertIpError,
  InterkassaPaymentAlertSignatureError,
  InterkassaPaymentAlertValidationError,
} from "./errors.ts";
import {
  InterkassaPaymentAlert,
  interkassaPaymentAlert,
  InterkassaPaymentRequest,
  PaymentDataToCheck,
} from "./types.ts";
import { Sha256 } from "i/sha256.ts";
import * as base64 from "i/base64.ts";
import { consts } from "src/consts.ts";
import { ValidationError as YupValidationError } from "i/yup.ts";

// COMMON

// https://t.ly/XJvV
export const createSignature = (readonlyData: Record<string, string>) => {
  const data = Object.assign({}, readonlyData);
  delete data.ik_sign;
  for (const key in data) {
    if (!/^ik_/i.test(key)) {
      delete data[key];
    }
  }
  const params = [];
  Object.entries(data)
    .filter(([_key, value]) => value !== undefined)
    .sort(([aKey, _aValue], [bKey, _bValue]) => {
      if (aKey < bKey) return -1;
      if (aKey > bKey) return 1;
      return 0;
    })
    .forEach(function ([_key, value]) {
      params.push(value);
    });

  const key = data.ik_pw_via === "test_interkassa_test_xts"
    ? consts.INTERKASSA.KEYS.TEST
    : consts.INTERKASSA.KEYS.SECRET;
  params.push(key);
  const paramsStr = params.join(":");
  const hashBuffer = new Sha256().update(paramsStr).arrayBuffer();
  return base64.encode(hashBuffer);
};

// PAYMENT REQUEST

export const signPaymentRequest = (req: InterkassaPaymentRequest) => {
  req.ik_sign = createSignature(req as Record<string, string>);
};

// PAYMENT ALERT

const interkassaIps = ["34.77.232.58", "35.240.117.224", "35.233.69.55"];
const assertPaymentAlertIp = (ip: string) => {
  if (!interkassaIps.includes(ip)) {
    throw new InterkassaPaymentAlertIpError(ip);
  }
};

export const assertPaymentAlertSignature = (alert: InterkassaPaymentAlert) => {
  const sign = createSignature(alert as Record<string, string>);
  if (alert.ik_sign !== sign) {
    throw new InterkassaPaymentAlertSignatureError();
  }
};

export const assertPaymentAlertValidation = async (alert: unknown) => {
  try {
    return await interkassaPaymentAlert.validate(alert);
  } catch (e) {
    if (e instanceof YupValidationError) {
      throw new InterkassaPaymentAlertValidationError(e, alert);
    } else {
      throw new InterkassaPaymentAlertError();
    }
  }
};

// https://t.ly/91FV
export const checkPaymentAlert = async (
  data: PaymentDataToCheck,
  rawAlert: unknown,
  alertSenderIp: string,
) => {
  try {
    assertPaymentAlertIp(alertSenderIp);
    const alert = await assertPaymentAlertValidation(rawAlert);
    assertPaymentAlertSignature(alert);

    if (data.ik_co_id !== alert.ik_co_id) {
      throw new InterkassaPaymentAlertIncorrectDataError(
        "ik_co_id",
        data.ik_co_id,
        alert.ik_co_id,
      );
    }

    if (Number(data.ik_am) !== Number(alert.ik_am)) {
      throw new InterkassaPaymentAlertIncorrectDataError(
        "ik_am",
        data.ik_am,
        alert.ik_am,
      );
    }
  } catch (e) {
    if (e instanceof InterkassaPaymentAlertError) {
      throw e;
    } else {
      throw new InterkassaPaymentAlertError();
    }
  }
};
