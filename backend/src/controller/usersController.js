import express from "express";
import { prisma } from "../database/index.js";
import asyncHandler from "express-async-handler";

const app = express();

app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await prisma.patient.findMany();
    res.json(users);
  })
);

app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await prisma.patient.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.json(user);
  })
);

export default app;
