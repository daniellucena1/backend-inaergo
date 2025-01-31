/*
  Warnings:

  - Made the column `password` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Manager` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "Manager" ALTER COLUMN "password" SET NOT NULL;
