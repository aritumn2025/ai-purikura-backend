-- CreateTable
CREATE TABLE "Style" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "Style_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(100) NOT NULL,
    "style_id" INTEGER NOT NULL,
    "submitted_at" TIMESTAMP(6) NOT NULL,
    "submitted_by" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserImage" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "image_id" TEXT NOT NULL,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_style_id_fkey" FOREIGN KEY ("style_id") REFERENCES "Style"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
