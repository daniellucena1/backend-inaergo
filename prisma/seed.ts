import prisma from '../src/services/prisma';

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'inaergo@exemplo.com' },
    update: {},
    create: {
      name: 'Inaergo',
      email: 'inaergo@exemplo.com',
      password: '$2a$10$iv4HyXK2.PFGann2XGyJMOGujG7RgNlG7XK9oDrjtUkC.738158wG',
      type: 'ADMIN'
    }
  });

  const formsObj: {
    title: string,
    pages: {
      page: number,
      title: string,
      fields: {
        type: "TEXT" | "RATING" | "CHECKBOX",
        question: string,
        profile: "COLLECTIVIST" | "INDIVIDUALIST" | "NORMAL"
      }[]
    }[]
  } = {
    "title": "Formulário de Feedback",
    "pages": [
      {
        "page": 1,
        "title": "Escala de Organização do Trabalho (EOT)",
        "fields": [
          {
            "type": "RATING",
            "question": "O número de trabalhadores é suficiente para a execução das tarefas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Os recursos de trabalho são em número suficiente para a realização das tarefas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "O espaço físico disponível para a realização do trabalho é adequado?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Os equipamentos são adequados para a realização das tarefas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "O ritmo de trabalho é adequado?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Os prazos para a realização das tarefas são flexíveis?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Possuo condições adequadas para alcançar os resultados esperados do meu trabalho?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Há clareza na definição das tarefas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Há justiça na distribuição das tarefas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Os funcionários participam das decisões sobre o trabalho?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "A comunicação entre chefe e subordinado é adequada?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Tenho autonomia para realizar as tarefas como julgo melhor?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Há qualidade na comunicação entre os funcionários?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "As informações de que preciso para executar minhas tarefas são claras?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "A avaliação do meu trabalho inclui aspectos além da minha produção?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Há flexibilidade nas normas para a execução das tarefas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "As orientações que me são passadas para realizar as tarefas são coerentes entre si?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "As tarefas que executo em meu trabalho são variadas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Tenho liberdade para opinar sobre o meu trabalho?",
            "profile": "NORMAL"
          }
        ]
      },
      {
        "page": 2,
        "title": "Escala dos Estilos de Gestão (EEG)",
        "fields": [
          {
            "type": "RATING",
            "question": "Em meu trabalho, incentiva-se a idolatria dos chefes?",
            "profile": "INDIVIDUALIST"
          },
          {
            "type": "RATING",
            "question": "Os gestores desta organização se consideram insubstituíveis?",
            "profile": "INDIVIDUALIST"
          },
          {
            "type": "RATING",
            "question": "Aqui os gestores preferem trabalhar individualmente?",
            "profile": "INDIVIDUALIST"
          },
          {
            "type": "RATING",
            "question": "Nesta organização os gestores se consideram o centro do mundo?",
            "profile": "INDIVIDUALIST"
          },
          {
            "type": "RATING",
            "question": "Os gestores desta organização fazem qualquer coisa para chamar a atenção?",
            "profile": "INDIVIDUALIST"
          },
          {
            "type": "RATING",
            "question": "É creditada grande importância para as regras nesta organização?",
            "profile": "INDIVIDUALIST"
          },
          {
            "type": "RATING",
            "question": "A hierarquia é valorizada nesta organização?",
            "profile": "INDIVIDUALIST"
          },
          {
            "type": "RATING",
            "question": "Os laços afetivos são fracos entre as pessoas desta organização?",
            "profile": "INDIVIDUALIST"
          },
          {
            "type": "RATING",
            "question": "Há forte controle do trabalho?",
            "profile": "INDIVIDUALIST"
          },
          {
            "type": "RATING",
            "question": "O ambiente de trabalho se desorganiza com mudanças?",
            "profile": "INDIVIDUALIST"
          },
          
        ]
      },
      {
        "page": 3,
        "title": "Escala dos Estilos de Gestão (EEG)",
        "fields": [
          {
            "type": "RATING",
            "question": "As pessoas são compromissadas com a organização mesmo quando não há retorno adequado?",
            "profile": "COLLECTIVIST"
          },
          {
            "type": "RATING",
            "question": "O mérito das conquistas na empresa é de todos?",
            "profile": "COLLECTIVIST"
          },
          {
            "type": "RATING",
            "question": "O trabalho coletivo é valorizado pelos gestores?",
            "profile": "COLLECTIVIST"
          },
          {
            "type": "RATING",
            "question": "Para esta organização, o resultado do trabalho é visto como uma realização do grupo?",
            "profile": "COLLECTIVIST"
          },
          {
            "type": "RATING",
            "question": "As decisões nesta organização são tomadas em grupo?",
            "profile": "COLLECTIVIST"
          },
          {
            "type": "RATING",
            "question": "Somos incentivados pelos gestores a buscar novos desafios?",
            "profile": "COLLECTIVIST"
          },
          {
            "type": "RATING",
            "question": "Os gestores favorecem o trabalho interativo de profissionais de diferentes áreas?",
            "profile": "COLLECTIVIST"
          },
          {
            "type": "RATING",
            "question": "A competência dos trabalhadores é valorizada pela gestão?",
            "profile": "COLLECTIVIST"
          },
          {
            "type": "RATING",
            "question": "Existem oportunidades semelhantes de ascensão para todas as pessoas?",
            "profile": "COLLECTIVIST"
          },
          {
            "type": "RATING",
            "question": "Os gestores se preocupam com o bem-estar dos trabalhadores?",
            "profile": "COLLECTIVIST"
          },
          {
            "type": "RATING",
            "question": "A inovação é valorizada nesta organização?",
            "profile": "COLLECTIVIST"
          }
        ]
      },
      {
        "page": 4,
        "title": "Escala de Indicadores de Sofrimento no Trabalho (EIST)",
        "fields": [
          {
            "type": "RATING",
            "question": "Sinto-me inútil em meu trabalho?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Considero minhas tarefas insignificantes?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto-me improdutivo no meu trabalho?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "A identificação com minhas tarefas é inexistente?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto-me desmotivado para realizar minhas tarefas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho é irrelevante para o desenvolvimento da sociedade?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho é sem sentido?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Minhas tarefas são banais?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Permaneço neste emprego por falta de oportunidade no mercado de trabalho?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho é cansativo?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho é desgastante?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho me frustra?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho me sobrecarrega?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho me desanima?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Submeter meu trabalho a decisões políticas é fonte de revolta?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho me faz sofrer?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho me causa insatisfação?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho é desvalorizado pela organização?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "A submissão do meu chefe às ordens superiores me causa revolta?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meus colegas desvalorizam meu trabalho?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Falta-me liberdade para dizer o que penso sobre meu trabalho?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Meus colegas são indiferentes comigo?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sou excluído do planejamento de minhas próprias tarefas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Minha chefia trata meu trabalho com indiferença?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "É difícil a convivência com meus colegas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "O trabalho que realizo é desqualificado pela chefia?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Falta-me liberdade para dialogar com minha chefia?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Há desconfiança na relação entre chefia e subordinado?",
            "profile": "NORMAL"
          }
        ]
      },
      {
        "page": 5,
        "title": "Escala de Danos Relacionados ao Trabalho (EDT)",
        "fields": [
          {
            "type": "RATING",
            "question": "Sinto amargura?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto uma sensação de vazio?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Tenho mau-humor frequentemente?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto vontade de desistir de tudo?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto tristeza frequentemente?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto perda da autoconfiança?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto solidão?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sou insensível em relação aos colegas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Tenho dificuldades nas relações fora do trabalho?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto vontade de ficar sozinho?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Tenho conflitos nas relações familiares?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sou agressivo com os outros?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Tenho dificuldade em manter amizades?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto impaciência com as pessoas em geral?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto dores no corpo?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto dores no braço?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto dor de cabeça frequentemente?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Tenho distúrbios digestivos?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto dores nas costas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Tenho alterações no sono?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Sinto dores nas pernas?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Tenho distúrbios circulatórios?",
            "profile": "NORMAL"
          },
          {
            "type": "RATING",
            "question": "Tenho alterações no apetite?",
            "profile": "NORMAL"
          }
        ]
      }
    ]
  }

  const forms = await prisma.form.create({
    data: {
      title: formsObj.title,
    },
  })

  const createdPages = await Promise.all(formsObj.pages.map((form) => {
    return prisma.page.create({
      data: {
        formId: forms.id,
        number: form.page,
        title: form.title,
        Question: {
          create: form.fields.map((field) => ({
            text: field.question,
            type: field.type,
            profile: field.profile
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

  console.log({ forms, createdPages })
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