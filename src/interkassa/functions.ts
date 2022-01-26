import {
  InvalidInterkassaIpError,
  InterkassaPaymentAlertValidationError,
} from "./errors.ts";
import { InterkassaPaymentAlert, InterkassaPaymentRequest } from "./types.ts";
import { Sha256 } from "i/sha256.ts";
import * as base64 from "i/base64.ts";
import {consts} from "src/consts.ts";

const interkassaIps = ["34.77.232.58", "35.240.117.224", "35.233.69.55"];
const assertInterkassaIp = (ip: string) => {
  if (!interkassaIps.includes(ip)) {
    throw new InvalidInterkassaIpError(ip);
  }
};

/**
 * Данные с нашего сервера для проверки
 */
type PaymentData = { ik_co_id: string; ik_am: string; ik_sign: string };

export const checkPaymentAlert = (
  data: PaymentData,
  alert: InterkassaPaymentAlert,
  alertSenderIp: string
) => {
  assertInterkassaIp(alertSenderIp);
  for (const key in data) {
    if (data[key as keyof PaymentData] !== alert[key as keyof PaymentData]) {
      throw new InterkassaPaymentAlertValidationError();
    }
  }
  if (alert.ik_inv_st !== "success") {
    throw new InterkassaPaymentAlertValidationError();
  }
};

export const signPaymentRequest = (req: InterkassaPaymentRequest) => {
  delete req.ik_sign;
  for (const key in req) {
    if (!/^ik_/i.test(key)) {
      delete req[key as keyof InterkassaPaymentRequest];
    }
  }
  const params = [];
  Object.entries(req)
    .filter(([_key, value]) => value !== undefined)
    .sort(([aKey, _aValue], [bKey, _bValue]) => {
      if (aKey < bKey) return -1;
      if (aKey > bKey) return 1;
      return 0;
    })
    .forEach(function ([_key, value]) {
      params.push(value);
    });
  params.push(consts.INTERKASSA.KEYS.SECRET);
  const paramsStr = params.join(":");
  const hashBuffer = new Sha256().update(paramsStr).arrayBuffer();
  const hashBase64 = base64.encode(hashBuffer);
  req.ik_sign = hashBase64;
};
