import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "./config/index";
import logger from "./logger";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import utils from "./utils";
import router from "./routes";

export const app = express();

app.use(cors());
app.use(bodyParser.json());

const swaggerOptions = utils.getSwaggerOptions();

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  `${config.USER_SERVICE_BASE_URL}/v1/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(`${config.USER_SERVICE_BASE_URL}/v1`, router);
app.use(`${config.USER_SERVICE_BASE_URL}/v1/auth`, authRouter);
app.use(`${config.USER_SERVICE_BASE_URL}/v1/user`, userRouter);

app.listen(config.PORT, () => {
  logger.info(`Server is running on port: ${config.PORT}`);
  if (config.isDev) utils.listRoutes(app);
});
