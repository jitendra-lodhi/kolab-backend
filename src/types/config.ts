export interface ServiceConfig {
  isDev: boolean;
  PORT: string | number;
  USER_SERVICE_BASE_URL: string;
  LOG_LEVEL: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PWD: string;
  DB_NAME: string;
  DB_PORT: number;
}
