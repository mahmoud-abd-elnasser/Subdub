import {config} from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";
const REQUIRED_ENV_VARS = ["DATABASE_URL", "JWT_SECRET", "JWT_EXPIRES_IN","ARCJET_KEY","ARCJET_ENV","QSTASH_URL","QSTASH_TOKEN", "SERVER_URL", "EMAIL_PASSWORD", "EMAIL_SENDER"];

config({ path: `.env` });

for (const key of REQUIRED_ENV_VARS) {
    if (!process.env[key] || String(process.env[key]).trim() === "") {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

export const { PORT, DATABASE_URL, JWT_EXPIRES_IN, JWT_SECRET, ARCJET_KEY, ARCJET_ENV, QSTASH_URL, QSTASH_TOKEN, SERVER_URL, EMAIL_PASSWORD, EMAIL_SENDER } = process.env
export {NODE_ENV}