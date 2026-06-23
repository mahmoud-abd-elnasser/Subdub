import {config} from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";
process.env.NODE_ENV = NODE_ENV;

config({ path: `.env` });

export const { PORT, DATABASE_URL } = process.env
export {NODE_ENV}