import bodyParser from "body-parser";
import express from "express";
import pinoHttp from "pino-http";
import { logger } from "../helpers/logger.js";
import { configureRouter } from "./router.js";
import { configureValidation } from "./utils/validation.js";
import { errorHandler } from "./utils/error_handler.js";
import { env } from "../helpers/env.js";

export async function startServer() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(pinoHttp({ logger }));
  app.use(configureValidation);

  configureRouter(app);

  app.use(errorHandler);

  const PORT = env.get("PORT");
  app.listen(PORT, () => {
    logger.info(`API running on port ${PORT}`);
  });
}
