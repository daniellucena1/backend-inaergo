/*
  Warnings:

  - Added the required column `profile` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Profile" AS ENUM ('COLLECTIVIST', 'INDIVIDUALIST', 'NORMAL');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "profile" "Profile" NOT NULL;
