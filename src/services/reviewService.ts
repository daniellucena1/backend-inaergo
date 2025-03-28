import { NotFound } from '../@errors/NotFound';
import prisma from '../services/prisma';

export const reviewService = {
  getReviewsByCompanyId: async (companyId: number) => {
    const reviews = await prisma.review.findMany({
      where: {
          companyId
      },
      include: {
        form: {
          include: {
            Page: {
              include: {
                  Question: true
              }
            }
          }
        }
      }
    });

    if (!reviews) {
      throw new NotFound("Avaliações não encontradas");
    }

    const formattedReviews = await Promise.all(
      reviews.map(async (review) => {
        const manager = await prisma.user.findFirst({
          where: { companyId: review.companyId, type: "MANAGER" },
        });

        if (!manager) {
          throw new NotFound("Gestor não encontrado");
        }

        return {
          id: review.id,
          title: review.title,
          openingDate: review.openingDate,
          finishingDate: review.finishingDate,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          forms: review.form
            ? {
                id: review.form.id,
                title: review.form.title,
                pages: review.form.Page.map((page) => ({
                  id: page.id,
                  page: page.number,
                  title: page.title,
                  fields: page.Question.map((question) => ({
                    id: question.id,
                    question: question.text,
                    type: question.type,
                  })),
                })),
              }
            : null,
          manager: manager
            ? {
                id: manager.id,
                name: manager.name,
                email: manager.email,
              }
            : null,
        };
      })
    );

    return {
      companyId,
      reviews: formattedReviews
    };
  }
} 