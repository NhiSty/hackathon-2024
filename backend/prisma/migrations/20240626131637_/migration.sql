/*
  Warnings:

  - You are about to drop the column `questionId` on the `SimplifiedIA` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SimplifiedIA" DROP CONSTRAINT "SimplifiedIA_questionId_fkey";

-- DropIndex
DROP INDEX "SimplifiedIA_questionId_key";

-- AlterTable
ALTER TABLE "SimplifiedIA" DROP COLUMN "questionId";
