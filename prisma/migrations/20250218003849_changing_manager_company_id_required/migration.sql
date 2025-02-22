/*
  Warnings:

  - Made the column `companyId` on table `Manager` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Manager" ALTER COLUMN "companyId" SET NOT NULL;
