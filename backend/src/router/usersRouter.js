import app from "../controller/usersController.js";
import express from "express";

const usersRouter = express.Router();

usersRouter.use("/api/v1", app);

export default usersRouter;
