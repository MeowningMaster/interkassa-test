const env = Deno.env.toObject();
const { THIS_HOST } = env;

export const consts = {
    URLS: {
        INTERACTION: THIS_HOST,
        SUCCESS: `${THIS_HOST}/success`,
        FAIL: `${THIS_HOST}/fail`,
        PENDING: `${THIS_HOST}/pending`
    }
}