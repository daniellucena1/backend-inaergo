/*
  Warnings:

  - You are about to drop the column `senha` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the `Formulario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pergunta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resposta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pergunta" DROP CONSTRAINT "Pergunta_formularioId_fkey";

-- DropForeignKey
ALTER TABLE "Resposta" DROP CONSTRAINT "Resposta_perguntaId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "senha",
ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "senha",
ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "senha",
ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "Formulario";

-- DropTable
DROP TABLE "Pergunta";

-- DropTable
DROP TABLE "Resposta";

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "formId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
