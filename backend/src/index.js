import "dotenv/config";

import { startServer } from "./http/index.js";

import { prisma } from "./database/index.js";

startServer()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

console.log('Server started!')
