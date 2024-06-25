import { Env } from "@adonisjs/env";
import { logger } from "./logger.js";

export const env = await loadEnv();

async function loadEnv() {
  try {
    return await Env.create(new URL("../../", import.meta.url), {
      NODE_ENV: Env.schema.enum(["development", "production"]),
      PORT: Env.schema.number(),

      DATABASE_URL: Env.schema.string(),
    });
  } catch (error) {
    logger.error(`${error.message}:\n${error.help}`);
    process.exit(1);
  }
}
