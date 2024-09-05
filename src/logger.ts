import pino from "pino";

export default pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: true,
      messageFormat: "[{module}]: {msg}",
      ignore: "pid,hostname,module",
    },
  },
  base: {
    module: "Kolab Service",
  },
});
