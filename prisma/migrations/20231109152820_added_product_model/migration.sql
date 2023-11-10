-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "tab" VARCHAR(255) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "CategoryId" INTEGER,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Category_tab_key" ON "Category"("tab");

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
