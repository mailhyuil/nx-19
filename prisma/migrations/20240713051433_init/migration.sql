-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_snapshots" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" TEXT NOT NULL,

    CONSTRAINT "post_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_snapshots" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "comment_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachment_snapshots" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "extension" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attachmentId" TEXT NOT NULL,

    CONSTRAINT "attachment_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AttachmentSnapshotToPostSnapshot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttachmentSnapshotToCommentSnapshot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AttachmentSnapshotToPostSnapshot_AB_unique" ON "_AttachmentSnapshotToPostSnapshot"("A", "B");

-- CreateIndex
CREATE INDEX "_AttachmentSnapshotToPostSnapshot_B_index" ON "_AttachmentSnapshotToPostSnapshot"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttachmentSnapshotToCommentSnapshot_AB_unique" ON "_AttachmentSnapshotToCommentSnapshot"("A", "B");

-- CreateIndex
CREATE INDEX "_AttachmentSnapshotToCommentSnapshot_B_index" ON "_AttachmentSnapshotToCommentSnapshot"("B");

-- AddForeignKey
ALTER TABLE "post_snapshots" ADD CONSTRAINT "post_snapshots_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_snapshots" ADD CONSTRAINT "comment_snapshots_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment_snapshots" ADD CONSTRAINT "attachment_snapshots_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentSnapshotToPostSnapshot" ADD CONSTRAINT "_AttachmentSnapshotToPostSnapshot_A_fkey" FOREIGN KEY ("A") REFERENCES "attachment_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentSnapshotToPostSnapshot" ADD CONSTRAINT "_AttachmentSnapshotToPostSnapshot_B_fkey" FOREIGN KEY ("B") REFERENCES "post_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentSnapshotToCommentSnapshot" ADD CONSTRAINT "_AttachmentSnapshotToCommentSnapshot_A_fkey" FOREIGN KEY ("A") REFERENCES "attachment_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentSnapshotToCommentSnapshot" ADD CONSTRAINT "_AttachmentSnapshotToCommentSnapshot_B_fkey" FOREIGN KEY ("B") REFERENCES "comment_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
