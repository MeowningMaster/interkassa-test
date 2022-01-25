import "i/dotenv/load.ts";
const { PORT, THIS_HOST, INTERKASSA_SECRET_KEY } = Deno.env.toObject();

export const interactionPath = '/interaction';

export const consts = {
    PORT,
    INTERKASSA_SECRET_KEY,
    URLS: {
        INTERACTION: `${THIS_HOST}${interactionPath}`,
        SUCCESS: `${THIS_HOST}/success`,
        FAIL: `${THIS_HOST}/fail`,
        PENDING: `${THIS_HOST}/pending`
    }
}