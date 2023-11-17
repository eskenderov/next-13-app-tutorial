/*
  Warnings:

  - You are about to alter the column `totalCoast` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "totalCoast" SET DATA TYPE INTEGER;
