-- DropForeignKey
ALTER TABLE "attachment_snapshots" DROP CONSTRAINT "attachment_snapshots_attachmentId_fkey";

-- DropForeignKey
ALTER TABLE "comment_snapshots" DROP CONSTRAINT "comment_snapshots_commentId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_snapshots" ADD CONSTRAINT "comment_snapshots_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment_snapshots" ADD CONSTRAINT "attachment_snapshots_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
