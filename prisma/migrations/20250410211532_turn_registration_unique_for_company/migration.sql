/*
  Warnings:

  - A unique constraint covering the columns `[registration,companyId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Employee_registration_key";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_registration_companyId_key" ON "Employee"("registration", "companyId");
