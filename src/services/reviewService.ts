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
        createdAt: true,
        isOpen: true
      }
    });

    reviews.sort((a, b) => {
      if (a.isOpen && !b.isOpen) return -1;
      if (!a.isOpen && b.isOpen) return 1;

      if (!a.isOpen && !b.isOpen) {
        const dateA = new Date(a.finishingDate);
        const dateB = new Date(b.finishingDate);
        return dateB.getTime() - dateA.getTime(); 
      }
    
      return 0;
    });
    
    if (!reviews) {
      throw new NotFound("Avaliações não encontradas");
    }

    const formattedReviews = await Promise.all(
      reviews.map(async (review) => {
        const manager = await prisma.user.findFirst({
          where: { companyId: review.companyId, type: "MANAGER" },
        });

        // console.log("manager", manager);

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
          isOpen: review.isOpen,
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

    const existingReview = await prisma.review.findFirst({
      where: {
        companyId: manager.companyId,
        isOpen: true
      },
      
    });

    if (existingReview) {
      if (openingDate < existingReview.finishingDate) {
        reviewService.closeReview(existingReview.id, managerId);
      }
    }

    const createdReview = await prisma.review.create({
      data: {
        title,
        companyId: manager.companyId,
        openingDate,
        finishingDate,
        isOpen: openingDate <= new Date() && finishingDate >= new Date(),
      }
    });

    return {
      companyId: manager.companyId,
      Review: createdReview,
    }
  },

  reopenReview: async (reviewId: number, newOpeningDate: Date, newFinishingDate: Date, managerId: number, newTitle?: string) => {
    const manager = await prisma.user.findUnique({
      where: {
        id: managerId
      }
    });

    if (!manager) {
      throw new NotFound("Gestor não econtrado");
    }

    if (!manager.companyId) {
      throw new NotFound("Identificador da empresa não encontrado");
    }

    const openedReview = await prisma.review.findFirst({
      where: {
        companyId: manager.companyId,
        isOpen: true
      }
    });

    if (openedReview) {
      if (newOpeningDate < openedReview.finishingDate && openedReview.id !== reviewId) {
        reviewService.closeReview(openedReview.id, managerId);
      }
    }

    const review = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        title: newTitle ? newTitle : undefined,
        openingDate: newOpeningDate,
        finishingDate: newFinishingDate,
        isOpen: newOpeningDate <= new Date() && newFinishingDate >= new Date()
      }
    });

    if (!review) {
      throw new NotFound("Avaliação já está aberta ou não existe");
    }

    return review;
  },

  updateReview: async (reviewId: number, managerId: number, newFinishingDate?: Date, title?: string) => {
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

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId
      }
    });

    if (!review) {
      throw new NotFound("Avaliação não encontrada");
    }

    const openedReview = await prisma.review.findFirst({
      where: {
        companyId: manager.companyId,
        isOpen: true
      }
    });

    const reviewUpdate = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        finishingDate: newFinishingDate,
        isOpen: newFinishingDate? newFinishingDate <= new Date() ? false : review.isOpen : undefined,
        title: title ? title : undefined
      }
    });

    if (!reviewUpdate) {
      throw new NotFound("Avaliação não existe");
    }

    if (reviewUpdate.isOpen && openedReview && openedReview.id !== reviewUpdate.id) {
      reviewService.closeReview(openedReview.id, managerId);
    }

    return reviewUpdate;
  },

  closeReview: async (reviewId: number, managerId: number) => {
    const manager = await prisma.user.findUnique({
      where: {
        id: managerId
      }
    });

    if (!manager) {
      throw new NotFound("Gestor não encontrado");
    }

    const review = await prisma.review.update({
      where: {
        id: reviewId,
        isOpen: true
      },
      data: {
        finishingDate: new Date(),
        isOpen: false
      }   
    });

    if (!review) {
      throw new NotFound("Avaliação já está fechada ou não existe");
    }

    return review;
  },

  deleteReview: async (reviewId: number) => {

    const review = await prisma.review.delete({
      where: {
        id: reviewId
      }
    });

    if (!review) {
      throw new NotFound("Avaliação não encontrada");
    }

    return review;
  }
} 