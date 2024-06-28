import express from "express";
import { prisma } from "../database/index.js";
import { categorizationPrompt, notationPrompt, simplificationPrompt } from "../prompt.js";
import hacaktonData from "../../utils/hackathonData.json" with {type: "json"}

const app = express();

app.post("/", async (req, res) => {
  let { qst, answer, rating } = req.body;

  if (!qst || !answer) {
    const randomIndex = Math.floor(Math.random() * hacaktonData.length);
    const randomData = hacaktonData[randomIndex];
    qst = randomData.question;
    answer = randomData.reponse;
  }


  const iaResponse = await iaMistral(categorizationPrompt(qst, answer));

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
      isRating: rating ? true : false,
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

  const iaResponseSimplify = await iaMistral(simplificationPrompt(qst, answer));

  const simplifiedAnswer = await prisma.simplifiedIA.create({
    data: {
      content: iaResponseSimplify.resume,
      answer: {
        connect: {
          id: answerReq.id,
        },
      },
      category: iaResponse.category,
      confidence: `${iaResponseSimplify.precision}%`,
    },
  });

  if (!simplifiedAnswer) {
    return res.status(422).send("Error creating simplified answer");
  }

  res.status(200).send("Data created successfully");
});

app.post('/test', async (req, res) => {

  const questions = await prisma.question.findMany({
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

  const iaResponse = await iaMistral(notationPrompt(JSON.stringify(questionsFormatted)));

  console.log(iaResponse);

  res.send("ok").status(200);

})

export default app;

export async function iaMistral(prompt) {
  const response = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3",
      prompt: prompt,
      stream: false,
    }),
  });

  const data = await response.json();
  return JSON.parse(data.response);
}


