import { Answer, Prisma, Profile, Review } from "@prisma/client";
import { Forbidden } from "../@errors/Forbidden";
import { NotFound } from "../@errors/NotFound";
import prisma from "./prisma"

// 5 funcionarios 2 - 5 risco alto
// 10 funcionarios 4 - 10 no risco baixo
// 5 / 15 - 10 / 15

// Calcular a media por questao
// Calcular a media pra todas as questoes de uma pagina

// retornar value: porcentagem
// retornar grau de risco:

// 1 - 2.29 Risco Alto
// 2.3 - 3.69 Risco Medio
// 3.7 - 5 Risco Baixo

export const dashboardService = {

  getNivel: (value: number) => {
    if (value >= 1 && value <= 2.29) return "baixo";
    if (value >= 2.3 && value <= 3.69) return "medio";
    if (value >= 3.7 && value <= 5) return "alto";
    return null;
  },

  calculateResponse: (answers: Answer[], pageNumber: number) => {
    let alto = 0, medio = 0, baixo = 0;

    answers.forEach((a) => {

      if (pageNumber === 1) {
        if (a.value >= 1 && a.value <= 2.29) {
          alto += 1;
        } else if (a.value >= 2.3 && a.value <= 3.69) {
          medio += 1;
        } else if (a.value >= 3.7 && a.value <= 5) {
          baixo += 1;
        }
      } else {
        if (a.value >= 1 && a.value <= 2.29) {
          baixo += 1;
        } else if (a.value >= 2.3 && a.value <= 3.69) {
          medio += 1;
        } else if (a.value >= 3.7 && a.value <= 5) {
          alto += 1;
        }
      }
    });

    const total = alto + medio + baixo;

    return {
      alto,
      medio,
      baixo,
      total,
      percent: {
        alto: total ? Number(((alto / total) * 100).toFixed(2)) : 0,
        medio: total ? Number(((medio / total) * 100).toFixed(2)) : 0,
        baixo: total ? Number(((baixo / total) * 100).toFixed(2)) : 0,
      }
    };
  },

  generateGraficData: (percentages: { alto: number, medio: number, baixo: number }, labels: [string, string, string]) => {
    return {
      0: { value: percentages.alto, label: labels[0] },
      1: { value: percentages.medio, label: labels[1] },
      2: { value: percentages.baixo, label: labels[2] }
    };
  },

  processQuestions: (questions: Prisma.QuestionGetPayload<{ include: { Answer: true } }>[], employees: Prisma.EmployeeGetPayload<{ include: { Answer: true } }>[], review: Review, labels: [string, string, string], pageNumber: number) => {

    let totalAlto = 0, totalMedio = 0, totalBaixo = 0, totalGeral = 0;

    const result = questions.map(q => {
      const allAnswers = employees.flatMap(e => e.Answer.filter(a => a.questionId === q.id && a.reviewId === review.id));

      const { alto, medio, baixo, total,  percent } = dashboardService.calculateResponse(allAnswers, pageNumber);

      totalAlto += alto;
      totalMedio += medio;
      totalBaixo += baixo;
      totalGeral += total;

      return {
        questionId: q.id,
        question: q.text,
        type: q.type,
        data: dashboardService.generateGraficData(percent, labels)
      };
    });

    const allData = dashboardService.generateGraficData({
      alto: totalGeral ? Number(((totalAlto / totalGeral) * 100).toFixed(2)) : 0,
      medio: totalGeral ? Number(((totalMedio / totalGeral) * 100).toFixed(2)) : 0,
      baixo: totalGeral ? Number(((totalBaixo / totalGeral) * 100).toFixed(2)) : 0
    },
      labels
    );

    return { result, allData };
    
  },
  
  getDashboardInfo: async (managerId: number, reviewId?: number,sector?: string, baseAge?: number, ceilAge?: number, gender?: string, baseCompanyTime?: number, ceilCompanyTime?: number) => {
    const manager = await prisma.user.findUnique({
      where: {
        id: managerId
      }
    });

    if (manager?.companyId === null) {
      throw new Forbidden('Usuário não é um gerente');
    }

    let review;

    if (!reviewId) {
      // const now = new Date();
      review = await prisma.review.findFirst({
        where: {
          isOpen: true,
        }
      })
    } else {
      review = await prisma.review.findUnique({
        where: {
          id: reviewId
        }
      });
    }

    if (!review) {
      throw new NotFound("Avalição não encontrada");
    }

    const employees = await prisma.employee.findMany({
      where: {
        companyId: manager?.companyId,
        sector: sector !== "" ? sector : undefined,
        age: {
          gte: baseAge ? baseAge : undefined,
          lte: ceilAge ? ceilAge : undefined
        },
        gender: gender !== "" ? gender : undefined,
        companyTime: {
          gte: baseCompanyTime ? baseCompanyTime : undefined,
          lte: ceilCompanyTime ? ceilCompanyTime : undefined
        },
      },
      include: {
        Answer: true
      }
    });

    const answers = await prisma.answer.findMany({
      where: {
        reviewId: review.id,
      }
    });

    console.log(answers)

    if (answers.length === 0) {
      throw new NotFound("Não existem respostas para este avaliação");
    }

    const allEmployes = await prisma.employee.findMany({
      where: {
        companyId: manager?.companyId
      }
    });

    const uniqueSectors = [...new Set(allEmployes.map(employee => employee.sector))];

    const pages = await prisma.page.findMany({
      include: {
        Question: {
          include: {
            Answer: true
          }
        }
      }
    });

    const response = await Promise.all(pages.map(async (p) => {
      if (p.number === 2) {
        return await dashboardService.getIndividualistPageEEG(p, employees, review);
      }

      if (p.number === 3) {
        return await dashboardService.getCollectivistPageEEG(p, employees, review);
      }

      if (p.number === 1) {
        return await dashboardService.getInfoPageEOT(p, employees, review);
      } 
        const { result, allData } = dashboardService.processQuestions(
          p.Question,
          employees,
          review,
          ["Risco Alto", "Risco Médio", "Risco Baixo"],
          p.number
        );
      
        return {
          title: p.title,
          number: p.number,
          questions: result,
          data: allData
        };  
    }))

    response.sort((a, b) => a.number - b.number);

    return {
      pages: response,
      sectors: uniqueSectors
    };
  },

  getIndividualistPageEEG: async (page: Prisma.PageGetPayload<{ include: { Question: { include: { Answer: true }} } }>, employees: Prisma.EmployeeGetPayload<{ include: { Answer: true }}>[], review: Review) => {

    const individualistQuestions = page.Question.filter(q => q.profile === Profile.INDIVIDUALIST);
    // const collectivistQuestions = page.Question.filter(q => q.profile === Profile.COLLECTIVIST);

    const individualistProcessado = dashboardService.processQuestions(
      individualistQuestions,
      employees,
      review,
      ["Predominante", "Presença Moderada", "Pouco Característico"],
      page.number
    );

    // const collectivistProcessado = dashboardService.processQuestions(
    //   collectivistQuestions,
    //   employees,
    //   review,
    //   ["Predominante", "Presença Moderada", "Pouco Característico"],
    //   page.number
    // );

    return {
      title: page.title + " - Individualista",
      number: page.number,
      questions: individualistProcessado.result,
      data: individualistProcessado.allData
    };
  },

  getCollectivistPageEEG: async (page: Prisma.PageGetPayload<{ include: { Question: { include: { Answer: true }} } }>, employees: Prisma.EmployeeGetPayload<{ include: { Answer: true }}>[], review: Review) => {
    const collectivistQuestions = page.Question.filter(q => q.profile === Profile.COLLECTIVIST);
    // const individualistQuestions = page.Question.filter(q => q.profile === Profile.INDIVIDUALIST);
    const collectivistProcessado = dashboardService.processQuestions(
      collectivistQuestions,
      employees,
      review,
      ["Predominante", "Presença Moderada", "Pouco Característico"],
      page.number
    );
    // const individualistProcessado = dashboardService.processQuestions(
    //   individualistQuestions,
    //   employees,
    //   review,
    //   ["Predominante", "Presença Moderada", "Pouco Característico"],
    //   page.number
    // );
    return {
      title: page.title + " - Coletivista",
      number: page.number,
      questions: collectivistProcessado.result,
      data: collectivistProcessado.allData
    };
  },

  getInfoPageEOT: async (page: Prisma.PageGetPayload<{ include: { Question: { include: { Answer: true } } } }>, employees: Prisma.EmployeeGetPayload<{ include: { Answer: true }}>[], review: Review) => {

    const { result, allData } = dashboardService.processQuestions(
      page.Question,
      employees,
      review,
      ["Risco Alto", "Risco Médio", "Risco Baixo"],
      page.number
    );

    return {
      title: page.title,
      number: page.number,
      questions: result,
      data: allData
    };
  },

  
}