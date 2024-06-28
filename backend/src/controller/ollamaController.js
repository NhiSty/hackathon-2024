import express from "express";
import { prisma } from "../database/index.js";
import {prompt_1, promptToDetermineRate, promptToDetermineRatingQuestion} from "../prompt.js";

const app = express();

app.post("/", async (req, res) => {
  const { qst, answer, rating } = req.body;

  console.log(qst, answer, rating);

  if (!qst || !answer) {
    res.status(400).send("Missing parameters");
    return;
  }


  const iaResponse = await iaMistral(prompt_1(qst, answer));

  console.log(iaResponse);

  const user = await prisma.patient.findUnique({
    where: {
      email: "test@test.com",
    },
  });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const question = await prisma.question.create({
    data: {
      content: qst,
    },
  });

  if (!question) {
    return res.status(422).send("Error creating question");
  }

  const answerReq = await prisma.answer.create({
    data: {
      content: answer,
      question: {
        connect: {
          id: question.id,
        },
      },
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  if (!answerReq) {
    return res.status(422).send("Error creating answer");
  }

  const simplifiedAnswer = await prisma.simplifiedIA.create({
    data: {
      answer: {
        connect: {
          id: answerReq.id,
        },
      },
      category: iaResponse.category,
      confidence: parseInt(iaResponse.confidence),
    },
  });

  if (!simplifiedAnswer) {
    return res.status(422).send("Error creating simplified answer");
  }

  res.status(200).send("Data created successfully");
});

app.post('/test', async (req, res) => {

  const questions = await prisma.question.findMany( {
    include: {
      answers: true,
    },
  });

  if (!questions) {
    return res.status(404).send("Questions not found");
  }

  const questionsFormatted = questions.map((question) => {
    return {
      id: question.id,
      question: question.content,
      answer: question.answers[0].content,
    };
  });

  const findRatingQuestionByIA = [];

  for (const question of questionsFormatted) {
    const response = await iaMistral(promptToDetermineRatingQuestion(question.question, question.id));

    if (response.isRating) {
      findRatingQuestionByIA.push(question.id);
    }
  }

  const ratingAnswers = await prisma.answer.findMany({
    where: {
      questionId: {
        in: findRatingQuestionByIA,
      },
    },
  });

  const ratingQuestionAndAnswer = findRatingQuestionByIA.map((id) => {
    return questionsFormatted.find((question) => question.id === id);
  });

  const ratingAnswersIA = [];
  for (const questionAndAnswer of ratingQuestionAndAnswer) {
    const response = await iaMistral(promptToDetermineRate(questionAndAnswer.question, questionAndAnswer.answer));
    console.log({
        question: questionAndAnswer.question,
        answer: questionAndAnswer.answer,
        response,
    })
    ratingAnswersIA.push(response);
  }



  res.send(ratingAnswersIA).status(200);

})

export default app;

export async function iaMistral(prompt) {
  const response = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral",
      prompt: prompt,
      stream: false,
      format: "json",
    }),
  });

  const data = await response.json();
  return JSON.parse(data.response);
}


