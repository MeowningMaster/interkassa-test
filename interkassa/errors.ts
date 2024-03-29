import * as ajv from "ajv";

export class InterkassaPaymentAlertError extends Error {
  constructor(message?: string) {
    super(message ?? "Uspecified error");
  }
}

export class InterkassaPaymentAlertValidationError
  extends InterkassaPaymentAlertError {
  constructor(error: ajv.ValidationError, data: unknown) {
    super(`Validation failed\ndata:${data}\nerror:${error.message}`);
  }
}

export class InterkassaPaymentAlertIncorrectDataError
  extends InterkassaPaymentAlertError {
  constructor(key: string, ourValue: string, theirValue: string) {
    super(`Incorrect ${key} (our ${ourValue} != their ${theirValue})`);
  }
}

export class InterkassaPaymentAlertSignatureError
  extends InterkassaPaymentAlertError {
  constructor() {
    super("Signature error");
  }
}

export class InterkassaPaymentAlertIpError extends InterkassaPaymentAlertError {
  constructor(ip: string) {
    super(`Invalid ip: ${ip}`);
  }
}
