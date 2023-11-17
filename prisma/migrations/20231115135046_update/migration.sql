/*
  Warnings:

  - You are about to drop the column `cartItemId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_cartItemId_fkey";

-- DropIndex
DROP INDEX "Product_cartItemId_key";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "productId" INTEGER;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cartItemId";

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_productId_key" ON "CartItem"("productId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
