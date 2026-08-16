-- AlterTable
ALTER TABLE "invitations" ADD COLUMN     "revoked_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "status" SET DEFAULT 'CREATED';
