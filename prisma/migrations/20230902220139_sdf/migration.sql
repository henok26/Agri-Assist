/*
  Warnings:

  - You are about to drop the `Postss` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Postss";

-- CreateTable
CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Input" (
    "id" TEXT NOT NULL,
    "n" DOUBLE PRECISION,
    "p" DOUBLE PRECISION,
    "k" DOUBLE PRECISION,
    "ph" DOUBLE PRECISION,
    "rainfall" DOUBLE PRECISION,
    "wind" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "crop" TEXT,

    CONSTRAINT "Input_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_username_key" ON "Farmer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_phone_key" ON "Farmer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_email_key" ON "Farmer"("email");
