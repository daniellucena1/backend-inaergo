/*
  Warnings:

  - You are about to drop the column `formId` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_formId_fkey";

-- DropIndex
DROP INDEX "Review_finishingDate_key";

-- DropIndex
DROP INDEX "Review_formId_key";

-- DropIndex
DROP INDEX "Review_openingDate_key";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "formId";
