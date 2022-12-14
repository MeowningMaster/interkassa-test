import {
  InterkassaPaymentAlertError,
  InterkassaPaymentAlertIncorrectDataError,
  InterkassaPaymentAlertIpError,
  InterkassaPaymentAlertSignatureError,
} from "./errors.ts";
import {
  assertPaymentAlertValidation,
  InterkassaPaymentAlert,
  InterkassaPaymentRequest,
  PaymentDataToCheck,
} from "./types.ts";
import { Sha256 } from "sha256";
import * as base64 from "base64";
import { consts } from "../utils/consts.ts";

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

  const key = consts.INTERKASSA.CHECKOUT.SECRET_KEY;
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

// https://t.ly/91FV
export async function checkPaymentAlert(
  data: PaymentDataToCheck,
  rawAlert: unknown,
  alertSenderIp: string,
) {
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
      throw new InterkassaPaymentAlertError(e.message);
    }
  }
}
