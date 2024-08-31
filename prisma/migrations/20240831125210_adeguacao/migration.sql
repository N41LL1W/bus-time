/*
  Warnings:

  - Added the required column `horario` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trajeto` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "horario" TEXT NOT NULL,
ADD COLUMN     "trajeto" TEXT NOT NULL,
ALTER COLUMN "horaSaida" SET DATA TYPE TEXT,
ALTER COLUMN "horaChegada" SET DATA TYPE TEXT;
