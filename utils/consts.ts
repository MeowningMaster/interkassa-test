import "dotenv/load.ts";
const { PORT, CALLBACK_URL, INTERKASSA_SECRET_KEY, INTERKASSA_CHECKOUT_ID } =
  Deno
    .env
    .toObject();

export const interactionPath = "/interaction";

export const consts = {
  PORT,
  CALLBACK_URL,
  INTERKASSA: {
    CHECKOUT: {
      ID: INTERKASSA_CHECKOUT_ID,
      SECRET_KEY: INTERKASSA_SECRET_KEY,
    },
    URLS: {
      INTERACTION: `${CALLBACK_URL}${interactionPath}`,
      SUCCESS: `${CALLBACK_URL}/success`,
      FAIL: `${CALLBACK_URL}/fail`,
      PENDING: `${CALLBACK_URL}/pending`,
    },
  },
};
