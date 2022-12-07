import "dotenv/load.ts";
const { PORT = 8080, THIS_HOST, INTERKASSA_SECRET_KEY, INTERKASSA_TEST_KEY } =
  Deno.env
    .toObject();

export const interactionPath = "/interaction";

export const consts = {
  PORT,
  THIS_HOST,
  INTERKASSA: {
    KEYS: {
      SECRET: INTERKASSA_SECRET_KEY,
      TEST: INTERKASSA_TEST_KEY,
    },
    URLS: {
      INTERACTION: `${THIS_HOST}${interactionPath}`,
      SUCCESS: `${THIS_HOST}/success`,
      FAIL: `${THIS_HOST}/fail`,
      PENDING: `${THIS_HOST}/pending`,
    },
  },
};
