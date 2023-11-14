/*
  Warnings:

  - You are about to drop the column `CategoryId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_CategoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "CategoryId",
ADD COLUMN     "categoryTab" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryTab_fkey" FOREIGN KEY ("categoryTab") REFERENCES "Category"("tab") ON DELETE SET NULL ON UPDATE CASCADE;
