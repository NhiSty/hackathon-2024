import { prisma } from "../src/database/index.js";
import fs from "fs";
import { iaMistral } from "../src/controller/ollamaController.js";

async function main() {
  const data = JSON.parse(fs.readFileSync("hackathonData.json", "utf-8"));

  for (const item of data) {
    const index = Math.random().toString(36);
    const newUser = await prisma.patient.create({
      data: {
        name: "Hackathon" + index,
        email: "hackathon" + index + "@gmail.com",
        firstname: "hacka" + index,
        birthDate: new Date(Date.now()),
        cellphone: index + "003",
        numOperation: index,
      },
    });

    const newQuestion = await prisma.question.create({
      data: {
        content: item.question,
      },
    });

    const newAwnser = await prisma.answer.create({
      data: {
        content: `${item.reponse}`,
        questionId: newQuestion.id,
        authorId: newUser.id,
      },
    });

    const iaResponse = await iaMistral(item.question, item.reponse);

    await prisma.simplifiedIA.create({
      data: {
        answer: {
          connect: {
            id: newAwnser.id,
          },
        },
        category: iaResponse.category,
        confidence: parseInt(iaResponse.confidence),
      },
    });
  }

  console.log("Données importées avec succès");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
