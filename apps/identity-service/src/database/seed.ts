import { PrismaClient } from '@prisma/client';
import { SYSTEM_PERMISSIONS } from './seeds/Permission.seed';

const prisma = new PrismaClient();

async function main() {
  for (const permission of SYSTEM_PERMISSIONS) {
    await prisma.permission.upsert({
      where: {
        code: permission.code,
      },
      update: {
        description: permission.description,
      },
      create: permission,
    });
  }
  console.log('Permission Seeded Successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
