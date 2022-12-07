import "dotenv/load.ts";
const { PORT, CALLBACK_URL, INTERKASSA_SECRET_KEY, INTERKASSA_TEST_KEY } = Deno
  .env
  .toObject();

export const interactionPath = "/interaction";

export const consts = {
  PORT,
  CALLBACK_URL,
  INTERKASSA: {
    KEYS: {
      SECRET: INTERKASSA_SECRET_KEY,
      TEST: INTERKASSA_TEST_KEY,
    },
    URLS: {
      INTERACTION: `${CALLBACK_URL}${interactionPath}`,
      SUCCESS: `${CALLBACK_URL}/success`,
      FAIL: `${CALLBACK_URL}/fail`,
      PENDING: `${CALLBACK_URL}/pending`,
    },
  },
};
