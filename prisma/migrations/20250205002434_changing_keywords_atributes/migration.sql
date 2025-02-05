/*
  Warnings:

  - You are about to drop the column `function` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `functionTime` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `healthProblemaLastYear` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `healthProblemLastYear` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionTime` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "function",
DROP COLUMN "functionTime",
DROP COLUMN "healthProblemaLastYear",
ADD COLUMN     "healthProblemLastYear" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "positionTime" INTEGER NOT NULL;
