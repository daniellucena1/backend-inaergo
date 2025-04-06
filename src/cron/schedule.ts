import cron from 'node-cron'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

cron.schedule('0 0 * * *', async () => {
  console.log('Rodando tarefa agendada...')

  const reviews = await prisma.review.findMany({});

  const response = await Promise.all(
    reviews.map(async (review) => {
      const currentDate = new Date();
      const openingDate = new Date(review.openingDate);
      const finishingDate = new Date(review.finishingDate);

      if (currentDate >= openingDate && currentDate <= finishingDate) {
        await prisma.review.update({
          where: { id: review.id },
          data: { isOpen: true },
        });
      } else if (currentDate > finishingDate) {
        await prisma.review.update({
          where: { id: review.id },
          data: { isOpen: false },
        });
      }
    })
  );

  return response;

})
