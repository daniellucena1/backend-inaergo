import { NotFound } from '../@errors/NotFound';
import prisma from '../services/prisma';

export const reviewService = {
  getReviewsByCompanyId: async (managerId: number) => {

    const manager = await prisma.user.findUnique({
      where: {
        id: managerId
      }
    });

    if (!manager) {
      throw new NotFound("Gestor não encontrado");
    }

    if (!manager.companyId) {
      throw new NotFound("Identificador da empresa não encontrado");
    }

    const reviews = await prisma.review.findMany({
      where: {
          companyId: manager.companyId,
          
      },
      select: {
        updatedAt: true,
        companyId: true,
        id: true,
        title: true,
        openingDate: true,
        finishingDate: true,
        createdAt: true
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

        console.log("manager", manager);

        if (!manager) {
          throw new NotFound("Gestor não encontrado");
        }

        const isOpen = review.openingDate <= new Date() && review.finishingDate >= new Date();

        return {
          id: review.id,
          title: review.title,
          openingDate: review.openingDate,
          finishingDate: review.finishingDate,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          isOpen,
        };
      })
    );

    return {
      companyId: manager.companyId,
      reviews: formattedReviews
    };
  },

  createReview: async (title: string, openingDate: Date, finishingDate: Date, managerId: number) => {
    // const createdForm = await prisma.form.findFirst({
    //   include: {
    //     Page: {
    //       include: {
    //         Question: true
    //       }
    //     }
    //   }
    // });
    
    // if (!createdForm) {
    //   throw new BadRequest("Avaliação não pode ser criada");
    // }  
    
    // const newForm = await prisma.form.create({
    //   data: {
    //     title: title,
    //     Page: {
    //       create: createdForm.Page.map(page => ({
    //         number: page.number,
    //         title: page.title,
    //         Question: {
    //           create: page.Question.map(q => ({
    //             text: q.text,
    //             type: q.type
    //           }))
    //         }
    //       }))
    //     }
    //   }
    // });

    const manager = await prisma.user.findUnique({
      where: {
        id: managerId
      }
    });
    
    if (!manager) {
      throw new NotFound("Gestor não encontrado");
    }

    if (!manager.companyId) {
      throw new NotFound("Identificador da empresa não encontrado");
    }

    const createdReview = await prisma.review.create({
      data: {
        title,
        companyId: manager.companyId,
        openingDate,
        finishingDate,
      }
    });

    return {
      companyId: manager.companyId,
      Review: createdReview,
    }
  },

  reopenReview: async (reviewId: number, newOpeningDate: Date, newFinishingDate: Date, managerId: number) => {
    const manager = await prisma.user.findUnique({
      where: {
        id: managerId
      }
    });

    if (!manager) {
      throw new NotFound("Gestor não econtrado");
    }

    const review = await prisma.review.update({
      where: {
        id: reviewId,
        AND: [
          { finishingDate : { gte: newOpeningDate }}
        ]
      },
      data: {
        openingDate: newOpeningDate,
        finishingDate: newFinishingDate
      }
    });

    if (!review) {
      throw new NotFound("Avaliação já está aberta ou não existe");
    }

    return review;
  }
} 