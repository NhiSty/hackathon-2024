import express from "express";
import { prisma } from "../database/index.js";
import { categorizationPrompt, simplificationPrompt, promptToDetermineRatingQuestion, promptToDetermineRate } from "../prompt.js";
import hacaktonData from "../../utils/hackathonData.json" assert {type: "json"}

const app = express();

app.post("/", async (req, res) => {
  let { qst, answer, rating } = req.body;

  console.log(qst, answer, rating);

  if (!qst || !answer) {
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

app.get('/kpi', async (req, res) => {

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

  if (!ratingAnswers) {
    return res.status(404).send("Rating answers not found");
  }

  const ratingQuestionAndAnswer = findRatingQuestionByIA.map((id) => {
    return questionsFormatted.find((question) => question.id === id);
  });

  const ratingAnswersIA = [];
  for (const questionAndAnswer of ratingQuestionAndAnswer) {
    const response = await iaMistral(promptToDetermineRate(questionAndAnswer.question, questionAndAnswer.answer));
    const { iaNote, maxNote } = response;
    const noteInt = typeof iaNote === 'string' ? parseInt(iaNote) : iaNote;
    const maxNoteInt = typeof maxNote === 'string' ? parseInt(maxNote) : maxNote;

    ratingAnswersIA.push({
      question: questionAndAnswer.question,
      answer: questionAndAnswer.answer,
      simplifiedRatingAnswer: Math.round((noteInt / maxNoteInt) * 10),
    });
  }

  const ratingBetweenZeroAndFive = ratingAnswersIA.filter((answer) => answer.simplifiedRatingAnswer >= 0 && answer.simplifiedRatingAnswer <= 5);
  const ratingBetweenSixAndTen = ratingAnswersIA.filter((answer) => answer.simplifiedRatingAnswer >= 6 && answer.simplifiedRatingAnswer <= 10);

  const kpi = {
    numberOfRatingQuestions: findRatingQuestionByIA.length,
    numberOfRatingQuestionsWithAnswer: ratingAnswersIA.length,
    ratingBetweenZeroAndFive,
    ratingBetweenSixAndTen,
    numberOfRatingBetweenZeroAndFive: ratingBetweenZeroAndFive.length,
    numberOfRatingBetweenSixAndTen: ratingBetweenSixAndTen.length,
  }


  res.send(kpi).status(200);

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

  if (!response.ok) {
    throw new Error("Error fetching IA data");
  }

  const data = await response.json();
  return JSON.parse(data.response);
}


