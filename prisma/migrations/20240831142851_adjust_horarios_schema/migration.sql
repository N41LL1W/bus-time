/*
  Warnings:

  - You are about to drop the column `destino` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `horaChegada` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `horaSaida` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `origem` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `trajeto` on the `Horario` table. All the data in the column will be lost.
  - Added the required column `diaDaSemana` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itinerario` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Horario" DROP COLUMN "destino",
DROP COLUMN "horaChegada",
DROP COLUMN "horaSaida",
DROP COLUMN "origem",
DROP COLUMN "trajeto",
ADD COLUMN     "diaDaSemana" TEXT NOT NULL,
ADD COLUMN     "itinerario" TEXT NOT NULL;
