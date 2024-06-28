import express from "express";
import { prisma } from "../database/index.js";
import { categorizationPrompt, simplificationPrompt, promptToDetermineRatingQuestion, promptToDetermineRate } from "../prompt.js";
import hacaktonData from "../../utils/hackathonData.json" with {type: "json"}

const app = express();

app.post("/", async (req, res) => {
  let { qst, answer, rating } = req.body;

  console.log(qst, answer, rating);

  if (!qst || !answer) {
    // use the hackathon data to create a random question and answer
    const randomIndex = Math.floor(Math.random() * hacaktonData.length);
    const randomData = hacaktonData[randomIndex];
    qst = randomData.question;
    answer = randomData.reponse;
  }

  const iaResponse = await iaMistral(categorizationPrompt(qst, answer));

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


