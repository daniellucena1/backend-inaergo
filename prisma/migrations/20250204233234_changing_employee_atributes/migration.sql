/*
  Warnings:

  - You are about to drop the column `password` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registration]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyTime` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `function` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `functionTime` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthProblemaLastYear` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meritalStatus` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolership` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "password",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "companyTime" INTEGER NOT NULL,
ADD COLUMN     "function" TEXT NOT NULL,
ADD COLUMN     "functionTime" INTEGER NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "healthProblemaLastYear" TEXT NOT NULL,
ADD COLUMN     "meritalStatus" TEXT NOT NULL,
ADD COLUMN     "registration" TEXT NOT NULL,
ADD COLUMN     "schoolership" TEXT NOT NULL,
ADD COLUMN     "sector" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_registration_key" ON "Employee"("registration");
