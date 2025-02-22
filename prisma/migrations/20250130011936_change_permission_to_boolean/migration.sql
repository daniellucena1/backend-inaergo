-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "permission" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Funcionario" ADD COLUMN     "permission" BOOLEAN NOT NULL DEFAULT false;
