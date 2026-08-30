-- AlterTable
ALTER TABLE "invitations"
ADD COLUMN "invited_by_email" TEXT;

ALTER TABLE "invitations"
ALTER COLUMN "invited_by_user_id" DROP NOT NULL;
