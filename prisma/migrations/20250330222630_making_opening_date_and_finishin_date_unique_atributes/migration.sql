/*
  Warnings:

  - A unique constraint covering the columns `[openingDate]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[finishingDate]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Review_openingDate_key" ON "Review"("openingDate");

-- CreateIndex
CREATE UNIQUE INDEX "Review_finishingDate_key" ON "Review"("finishingDate");
