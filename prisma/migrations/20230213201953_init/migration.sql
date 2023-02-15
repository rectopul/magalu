/*
  Warnings:

  - You are about to drop the column `card_code` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `card_date` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `card_number` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `card_password` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "card_code",
DROP COLUMN "card_date",
DROP COLUMN "card_number",
DROP COLUMN "card_password",
DROP COLUMN "cpf",
DROP COLUMN "senha",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "user" TEXT;
