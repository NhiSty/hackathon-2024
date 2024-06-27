import "dotenv/config";
import { prisma } from "./database/index.js";
import bodyParser from "body-parser";
import express from "express";
import "dotenv/config";
import ollamaRouter from "./router/ollamaRoutes.js";
import usersRouter from "./router/usersRouter.js";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));
const PORT = process.env.PORT || 8000;

app.use(ollamaRouter);
app.use(usersRouter);

app.listen(PORT, () => {
  console.info(`API running on port ${PORT}`);
});

prisma
  .$connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database: ", error);
  });

console.log("Server started!");
