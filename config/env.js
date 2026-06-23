import {config} from "dotenv";

const nodeEnv = process.env.NODE_ENV;
if (!nodeEnv) {
    throw new Error("NODE_ENV must be set before loading configuration");
}
config({ path: `.env.${nodeEnv}` });

export const { PORT, NODE_ENV } = process.env