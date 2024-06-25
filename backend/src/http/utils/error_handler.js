import { Exception } from "@poppinss/utils";
import { logger } from "../../helpers/logger.js";
import { errors as vineErrors } from "@vinejs/vine";

/**
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function errorHandler(err, req, res) {
  if (err instanceof vineErrors.E_VALIDATION_ERROR) {
    return res.status(400).json({
      error: "Validation error",
      messages: err.messages,
    });
  }

  if (err instanceof Exception) {
    return res.status(err.status).json({ error: err.message });
  }

  logger.error(err);
  res.status(500).json({ error: "Internal server error" });
}
