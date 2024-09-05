import dotenv from "dotenv";

import { ServiceConfig } from "../types/config";

dotenv.config();

const isDev = process.env.NODE_ENV !== "production";
const sync = process.env.DB_SYNC === "true" ? true : false;

interface AuthServiceConfig extends ServiceConfig {
  [key: string]: any;
}
const config: AuthServiceConfig = {
  isDev,
  PORT: process.env.PORT!,
  USER_SERVICE_BASE_URL: process.env.USER_SERVICE_BASE_URL! || "/kolab",
  LOG_LEVEL: process.env.LOG_LEVEL!,
  DB_HOST: process.env.DB_HOST!,
  DB_USER: process.env.DB_USER!,
  DB_PWD: process.env.DB_PWD!,
  DB_NAME: process.env.DB_NAME!,
  DB_PORT: parseInt(process.env.DB_PORT!),
};

export default config;
