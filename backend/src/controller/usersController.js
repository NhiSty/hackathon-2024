import express from 'express';
import { prisma } from '../database/index.js';
import asyncHandler from 'express-async-handler';

const app = express();

app.get(
  '/users',
  asyncHandler(async (req, res) => {
    const users = await prisma.patient.findMany();
    res.json(users);
  }),
);

app.get(
  '/users/:id/messages',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = parseInt(id);


    const patient = await prisma.patient.findUnique({
      where: { id: userId },
    });

    if (!patient) {
      return res.status(404).json({ error: 'User not found' });
    }


    const answers = await prisma.answer.findMany({
      where: { authorId: userId },
    });


    const questions = await Promise.all(
      answers.map(async (answer) => {
        const question = await prisma.question.findUnique({
          where: { id: answer.questionId },
        });
        return { ...answer, question };
      })
    );


    const simplifiedMessages = await Promise.all(
      answers.map(async (answer) => {
        const simplifiedMessage = await prisma.simplifiedIA.findUnique({
          where: { answerId: answer.id },
        });
        return simplifiedMessage;
      })
    );


    const response = {
      patient,
      answers: questions,
      simplifiedMessages: simplifiedMessages.filter((msg) => msg !== null),
    };

    res.json(response);
  })
);

app.get(
  '/users/all',
  asyncHandler(async (req, res) => {
    const users = await prisma.patient.findMany({
      include: {
        answers: {
          include: {
            simplifiedIA: true
          }
        }
      }
    });
    res.json(users);
  }),
);
export default app;
