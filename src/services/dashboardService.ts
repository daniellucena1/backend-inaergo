
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
  getDashboardInfo: async (managerId: number) => {
    const manager = await prisma.manager.findUnique({
      where: {
        id: managerId
      }
    })

    const employees = await prisma.employee.findMany({
      where: {
        companyId: manager?.companyId
      },
      include: {
        Answer: true
      }
    })

    const pages = await prisma.page.findMany({
      include: {
        Question: true
      }
    })

    const response = pages.map((p) => {
      let altoPagina = 0;
      let medioPagina = 0;
      let baixoPagina = 0;
      let totalPagina = 0;
      
      return {
        questions: p.Question.map((q) => {
          let alto = 0;
          let medio = 0;
          let baixo = 0;
          employees.map((e) => {
            const answers = e.Answer.filter(a => a.questionId === q.id)
            console.log(answers)

            answers.map((a) => {
              if (a.value >= 1.29 && a.value <= 2.29) {
                alto += 1;
              } else if (a.value >= 2.3 && a.value <= 3.69) {
                medio += 1;
              } else if (a.value >= 3.7 && a.value <= 5) {
                baixo += 1;
              }
            })
          });

          const total = alto + medio + baixo;

          altoPagina += alto;
          medioPagina += medio;
          baixoPagina += baixo;
          totalPagina += total

          return {
            question: q.text,
            type: q.type,
            data: {
              0: {
                value: Number(((alto / total) * 100).toFixed(2)),
                label: "Risco Alto"
              },
              1: {
                value: Number(((medio / total) * 100).toFixed(2)),
                label: "Risco Médio"
              },
              2: {
                value: Number(((baixo / total) * 100).toFixed(2)),
                label: "Risco Baixo"
              },
            }
          }
        }),
        data: {
          0: {
            value: Number(((altoPagina / totalPagina) * 100).toFixed(2)),
            label: "Risco Alto"
          },
          1: {
            value: Number(((medioPagina/ totalPagina) * 100).toFixed(2)),
            label: "Risco Médio"
          },
          2: {
            value: Number(((baixoPagina/ totalPagina) * 100).toFixed(2)),
            label: "Risco Baixo"
          },
        }
      }
    })

    return response;
  }
}