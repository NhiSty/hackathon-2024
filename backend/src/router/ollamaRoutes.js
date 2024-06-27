import app from "../controller/ollamaController.js";
import express from "express";

const ollamaRouter = express.Router();

ollamaRouter.use("/api/v1", app);

export default ollamaRouter;
