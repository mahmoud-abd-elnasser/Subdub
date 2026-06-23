import {config} from "dotenv";

const nodeEnv = process.env.NODE_ENV || 'development';
if (!nodeEnv) {
    throw new Error("NODE_ENV must be set before loading configuration");
}
config({ path: `.env` });

export const { PORT, NODE_ENV, DATABASE_URL } = process.env