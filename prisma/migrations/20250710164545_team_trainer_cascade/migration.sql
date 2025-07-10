-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_trainerId_fkey";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
