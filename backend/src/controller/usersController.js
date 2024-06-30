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


    const answers = await prisma.answer.findUnique(
      {
        include: {
          author: true,
          question: true,
          simplifiedIA: true,
        },
        where: {
          id: parseInt(id),
        },

      }
    );

    const formatedData = {
      id: answers.id,
      response: answers.content,
      question: answers.question.content,
      simplifiedMessages: answers.simplifiedIA.content,
      category: answers.simplifiedIA.category,
      firstName: answers.author.firstname,
      name: answers.author.name,
      confidence: answers.simplifiedIA.confidence,
    }


    res.json(formatedData).status(200);
  })
);

app.get(
  '/users/all',
  asyncHandler(async (req, res) => {
    const answers = await prisma.answer.findMany(
      {
        include: {
          author: true,
          question: true,
          simplifiedIA: true,
        },

      }
    );
    

    const formatedData = answers.map((answer) => {
      return {
        id: answer.id,
        content: answer.content,
        question: answer.question.content,
        simplifiedIA: answer?.simplifiedIA?.content ?? "Pas de réponse simplifiée",
        category: answer?.simplifiedIA?.category ?? "N/A",
        confidence: answer?.simplifiedIA?.confidence ?? "0",
        email: answer.author.email,
        name: answer.author.name,
        firstname: answer.author.firstname,
        birthDate: answer.author.birthDate,
        cellphone: answer.author.cellphone,
        numOperation: answer.author.numOperation,
        userId: answer.author.id,
      }
    });

    

    res.json(formatedData).status(200);
  }),
);
export default app;
