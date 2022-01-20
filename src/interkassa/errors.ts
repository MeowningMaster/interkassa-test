export class InterkassaPaymentAlertValidationError extends Error {
    constructor(message?: string) {
        super(message ?? "Interkassa payment alert validation error");
    }
}

export class InvalidInterkassaIpError extends Error {
    constructor(ip: string) {
        super(`Invalid interkassa ip: ${ip}`);
    }
}
