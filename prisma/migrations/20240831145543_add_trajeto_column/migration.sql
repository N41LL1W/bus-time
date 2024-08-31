/*
  Warnings:

  - Added the required column `trajeto` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "trajeto" TEXT NOT NULL;
