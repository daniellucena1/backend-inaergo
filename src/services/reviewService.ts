import { BadRequest } from '../@errors/BadRequest';
import { NotFound } from '../@errors/NotFound';
import prisma from '../services/prisma';
import { FormsDTO } from '../types/formsDTO';

export const reviewService = {
  getReviewsByCompanyId: async (companyId: number) => {
    const reviews = await prisma.review.findMany({
      where: {
          companyId
      },
      select: {
        updatedAt: true,
        formId: true,
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
          formId: review.formId
        };
      })
    );

    return {
      companyId,
      reviews: formattedReviews
    };
  },

  createReview: async (title: string, openingDate: Date, finishingDate: Date, { forms }: FormsDTO, managerId: number) => {
    const createdForm = await prisma.form.create({
      data:{
        title: forms.title
      }
    });

    if (!createdForm) {
      throw new BadRequest("Avaliação não pode ser criada");
    }

    const createdPages = await Promise.all(forms.pages.map((form) => {
      return prisma.page.create({
        data: {
          formId: createdForm.id,
          number: form.page,
          title: form.title,
          Question: {
            create: form.fields.map((field) => ({
              text: field.question,
              type: field.type
            }))
          }
        },
        select: {
          id: true,
          Question: true,
          title: true,
          number: true
        }
      })
    }));

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
        formId: createdForm.id
      }
    });

    return {
      companyId: manager.companyId,
      Review: createdReview,
      forms: {
        id: createdForm.id,
        title: createdForm.title,
        pages: createdPages.map((page) => ({
            id: page.id,
            page: page.number,
            title: page.title,
            fields: page.Question.map((question) => ({
                id: question.id,
                question: question.text,
                type: question.type,
            }))
        }))
      }
    };
  }
} 