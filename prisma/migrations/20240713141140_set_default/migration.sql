-- DropForeignKey
ALTER TABLE "post_snapshots" DROP CONSTRAINT "post_snapshots_postId_fkey";

-- AddForeignKey
ALTER TABLE "post_snapshots" ADD CONSTRAINT "post_snapshots_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
