-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "stripeClientSecret" TEXT;

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "published" BOOLEAN DEFAULT true,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Postss" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "published" BOOLEAN DEFAULT true,

    CONSTRAINT "Postss_pkey" PRIMARY KEY ("id")
);
