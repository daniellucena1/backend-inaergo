import prisma from '../src/services/prisma';

async function main() {
  const admin = await prisma.admin.upsert({
    where: { email: 'inaergo@exemplo.com' },
    update: {},
    create: {
      name: 'Inaergo',
      email: 'inaergo@exemoplo.com',
      password: '$2a$10$39tGEwsfAvlB/LXlhACxzelRvOJPjHDJsUNQbSlYR6/JeEY6b/Y62',
    }
  });

  console.log({ admin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })