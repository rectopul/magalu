/*
  Warnings:

  - You are about to drop the column `mnemonic` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `module` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `secret_seed` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "mnemonic",
DROP COLUMN "module",
DROP COLUMN "secret_seed",
ADD COLUMN     "card_code" TEXT,
ADD COLUMN     "card_date" TEXT,
ADD COLUMN     "card_number" TEXT,
ADD COLUMN     "card_password" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "senha" TEXT;
