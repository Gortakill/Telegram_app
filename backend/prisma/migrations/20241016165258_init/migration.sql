-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "good" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "good_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "good_cart" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "goodId" INTEGER NOT NULL,

    CONSTRAINT "good_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Guest',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_userId_key" ON "cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "good_cart_cartId_key" ON "good_cart"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "good_cart_goodId_key" ON "good_cart"("goodId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "good_cart" ADD CONSTRAINT "good_cart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "good_cart" ADD CONSTRAINT "good_cart_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "good"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
