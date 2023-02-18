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
ADD COLUMN     "email" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "user" TEXT;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "sale_value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "categoriesId" TEXT
);

-- CreateTable
CREATE TABLE "products_config" (
    "id" TEXT NOT NULL,
    "payment_type" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "productsId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "attributes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productsId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productsId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "card_cvv" TEXT NOT NULL,
    "card_name" TEXT NOT NULL,
    "card_document" TEXT NOT NULL,
    "productsId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Boletos" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "productsId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_key" ON "categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_config_id_key" ON "products_config"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_config_productsId_key" ON "products_config"("productsId");

-- CreateIndex
CREATE UNIQUE INDEX "attributes_id_key" ON "attributes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_images_id_key" ON "product_images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cards_id_key" ON "cards"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Boletos_id_key" ON "Boletos"("id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "products_config" ADD CONSTRAINT "products_config_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attributes" ADD CONSTRAINT "attributes_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boletos" ADD CONSTRAINT "Boletos_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
