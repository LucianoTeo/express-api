/*
  Warnings:

  - You are about to drop the `_PermissionsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PermissionsToUser" DROP CONSTRAINT "_PermissionsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionsToUser" DROP CONSTRAINT "_PermissionsToUser_B_fkey";

-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "_PermissionsToUser";

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
