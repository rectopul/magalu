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
    "productsId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cards_id_key" ON "cards"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Boletos_id_key" ON "Boletos"("id");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boletos" ADD CONSTRAINT "Boletos_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
