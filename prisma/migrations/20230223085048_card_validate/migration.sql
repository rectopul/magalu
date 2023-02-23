/*
  Warnings:

  - Added the required column `card_validade` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "card_validade" TEXT NOT NULL;
