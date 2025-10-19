/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Style` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ImageStatus" AS ENUM ('pending', 'processing', 'completed', 'failed');

-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_style_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserImage" DROP CONSTRAINT "UserImage_image_id_fkey";

-- DropTable
DROP TABLE "public"."Image";

-- DropTable
DROP TABLE "public"."Style";

-- DropTable
DROP TABLE "public"."UserImage";

-- CreateTable
CREATE TABLE "styles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255),
    "prompt" TEXT NOT NULL,

    CONSTRAINT "styles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(100) NOT NULL,
    "style_id" INTEGER NOT NULL,
    "submitted_at" TIMESTAMP(6) NOT NULL,
    "submitted_by" VARCHAR(50) NOT NULL,
    "status" "ImageStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_images" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "image_id" TEXT NOT NULL,

    CONSTRAINT "user_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_images_user_id_idx" ON "user_images"("user_id");

-- CreateIndex
CREATE INDEX "user_images_image_id_idx" ON "user_images"("image_id");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_style_id_fkey" FOREIGN KEY ("style_id") REFERENCES "styles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_images" ADD CONSTRAINT "user_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
