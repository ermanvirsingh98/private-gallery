import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb'; // Import ObjectId to generate valid IDs

const prisma = new PrismaClient();

async function main() {
  const hashedAdminPassword = await bcrypt.hash('admin_password', 10); // Replace with a secure password

  await prisma.user.upsert({
    where: { email: 'admin1@example.com' },
    update: {},
    create: {
      email: 'admin1@example.com',
      password: hashedAdminPassword,
      name: 'User One',
      createdBy: new ObjectId().toString()
    },
  });
  
  await prisma.user.upsert({
    where: { email: 'admin2@example.com' },
    update: {},
    create: {
      email: 'admin2@example.com',
      password: hashedAdminPassword,
      name: 'User Two',
      createdBy: new ObjectId().toString()
    },
  });
  console.log('Admin user and default users created.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
