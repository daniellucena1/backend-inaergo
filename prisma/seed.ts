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
        question: string
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
            "question": "O número de trabalhadores é suficiente para a execução das tarefas?"
          },
          {
            "type": "RATING",
            "question": "Os recursos de trabalho são em número suficiente para a realização das tarefas?"
          },
          {
            "type": "RATING",
            "question": "O espaço físico disponível para a realização do trabalho é adequado?"
          },
          {
            "type": "RATING",
            "question": "Os equipamentos são adequados para a realização das tarefas?"
          },
          {
            "type": "RATING",
            "question": "O ritmo de trabalho é adequado?"
          },
          {
            "type": "RATING",
            "question": "Os prazos para a realização das tarefas são flexíveis?"
          },
          {
            "type": "RATING",
            "question": "Possuo condições adequadas para alcançar os resultados esperados do meu trabalho?"
          },
          {
            "type": "RATING",
            "question": "Há clareza na definição das tarefas?"
          },
          {
            "type": "RATING",
            "question": "Há justiça na distribuição das tarefas?"
          },
          {
            "type": "RATING",
            "question": "Os funcionários participam das decisões sobre o trabalho?"
          },
          {
            "type": "RATING",
            "question": "A comunicação entre chefe e subordinado é adequada?"
          },
          {
            "type": "RATING",
            "question": "Tenho autonomia para realizar as tarefas como julgo melhor?"
          },
          {
            "type": "RATING",
            "question": "Há qualidade na comunicação entre os funcionários?"
          },
          {
            "type": "RATING",
            "question": "As informações de que preciso para executar minhas tarefas são claras?"
          },
          {
            "type": "RATING",
            "question": "A avaliação do meu trabalho inclui aspectos além da minha produção?"
          },
          {
            "type": "RATING",
            "question": "Há flexibilidade nas normas para a execução das tarefas?"
          },
          {
            "type": "RATING",
            "question": "As orientações que me são passadas para realizar as tarefas são coerentes entre si?"
          },
          {
            "type": "RATING",
            "question": "As tarefas que executo em meu trabalho são variadas?"
          },
          {
            "type": "RATING",
            "question": "Tenho liberdade para opinar sobre o meu trabalho?"
          }
        ]
      },
      {
        "page": 2,
        "title": "Escala dos Estilos de Gestão (EEG)",
        "fields": [
          {
            "type": "RATING",
            "question": "Em meu trabalho, incentiva-se a idolatria dos chefes?"
          },
          {
            "type": "RATING",
            "question": "Os gestores desta organização se consideram insubstituíveis?"
          },
          {
            "type": "RATING",
            "question": "Aqui os gestores preferem trabalhar individualmente?"
          },
          {
            "type": "RATING",
            "question": "Nesta organização os gestores se consideram o centro do mundo?"
          },
          {
            "type": "RATING",
            "question": "Os gestores desta organização fazem qualquer coisa para chamar a atenção?"
          },
          {
            "type": "RATING",
            "question": "É creditada grande importância para as regras nesta organização?"
          },
          {
            "type": "RATING",
            "question": "A hierarquia é valorizada nesta organização?"
          },
          {
            "type": "RATING",
            "question": "Os laços afetivos são fracos entre as pessoas desta organização?"
          },
          {
            "type": "RATING",
            "question": "Há forte controle do trabalho?"
          },
          {
            "type": "RATING",
            "question": "O ambiente de trabalho se desorganiza com mudanças?"
          },
          {
            "type": "RATING",
            "question": "As pessoas são compromissadas com a organização mesmo quando não há retorno adequado?"
          },
          {
            "type": "RATING",
            "question": "O mérito das conquistas na empresa é de todos?"
          },
          {
            "type": "RATING",
            "question": "O trabalho coletivo é valorizado pelos gestores?"
          },
          {
            "type": "RATING",
            "question": "Para esta organização, o resultado do trabalho é visto como uma realização do grupo?"
          },
          {
            "type": "RATING",
            "question": "As decisões nesta organização são tomadas em grupo?"
          },
          {
            "type": "RATING",
            "question": "Somos incentivados pelos gestores a buscar novos desafios?"
          },
          {
            "type": "RATING",
            "question": "Os gestores favorecem o trabalho interativo de profissionais de diferentes áreas?"
          },
          {
            "type": "RATING",
            "question": "A competência dos trabalhadores é valorizada pela gestão?"
          },
          {
            "type": "RATING",
            "question": "Existem oportunidades semelhantes de ascensão para todas as pessoas?"
          },
          {
            "type": "RATING",
            "question": "Os gestores se preocupam com o bem-estar dos trabalhadores?"
          },
          {
            "type": "RATING",
            "question": "A inovação é valorizada nesta organização?"
          }
        ]
      },
      {
        "page": 3,
        "title": "Escala de Indicadores de Sofrimento no Trabalho (EIST)",
        "fields": [
          {
            "type": "RATING",
            "question": "Sinto-me inútil em meu trabalho?"
          },
          {
            "type": "RATING",
            "question": "Considero minhas tarefas insignificantes?"
          },
          {
            "type": "RATING",
            "question": "Sinto-me improdutivo no meu trabalho?"
          },
          {
            "type": "RATING",
            "question": "A identificação com minhas tarefas é inexistente?"
          },
          {
            "type": "RATING",
            "question": "Sinto-me desmotivado para realizar minhas tarefas?"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho é irrelevante para o desenvolvimento da sociedade?"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho é sem sentido?"
          },
          {
            "type": "RATING",
            "question": "Minhas tarefas são banais?"
          },
          {
            "type": "RATING",
            "question": "Permaneço neste emprego por falta de oportunidade no mercado de trabalho?"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho é cansativo?"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho é desgastante?"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho me frustra?"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho me sobrecarrega?"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho me desanima?"
          },
          {
            "type": "RATING",
            "question": "Submeter meu trabalho a decisões políticas é fonte de revolta?"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho me faz sofrer?"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho me causa insatisfação?"
          },
          {
            "type": "RATING",
            "question": "Meu trabalho é desvalorizado pela organização?"
          },
          {
            "type": "RATING",
            "question": "A submissão do meu chefe às ordens superiores me causa revolta?"
          },
          {
            "type": "RATING",
            "question": "Meus colegas desvalorizam meu trabalho?"
          },
          {
            "type": "RATING",
            "question": "Falta-me liberdade para dizer o que penso sobre meu trabalho?"
          },
          {
            "type": "RATING",
            "question": "Meus colegas são indiferentes comigo?"
          },
          {
            "type": "RATING",
            "question": "Sou excluído do planejamento de minhas próprias tarefas?"
          },
          {
            "type": "RATING",
            "question": "Minha chefia trata meu trabalho com indiferença?"
          },
          {
            "type": "RATING",
            "question": "É difícil a convivência com meus colegas?"
          },
          {
            "type": "RATING",
            "question": "O trabalho que realizo é desqualificado pela chefia?"
          },
          {
            "type": "RATING",
            "question": "Falta-me liberdade para dialogar com minha chefia?"
          },
          {
            "type": "RATING",
            "question": "Há desconfiança na relação entre chefia e subordinado?"
          }
        ]
      },
      {
        "page": 4,
        "title": "Escala de Danos Relacionados ao Trabalho (EDT)",
        "fields": [
          {
            "type": "RATING",
            "question": "Sinto amargura?"
          },
          {
            "type": "RATING",
            "question": "Sinto uma sensação de vazio?"
          },
          {
            "type": "RATING",
            "question": "Tenho mau-humor frequentemente?"
          },
          {
            "type": "RATING",
            "question": "Sinto vontade de desistir de tudo?"
          },
          {
            "type": "RATING",
            "question": "Sinto tristeza frequentemente?"
          },
          {
            "type": "RATING",
            "question": "Sinto perda da autoconfiança?"
          },
          {
            "type": "RATING",
            "question": "Sinto solidão?"
          },
          {
            "type": "RATING",
            "question": "Sou insensível em relação aos colegas?"
          },
          {
            "type": "RATING",
            "question": "Tenho dificuldades nas relações fora do trabalho?"
          },
          {
            "type": "RATING",
            "question": "Sinto vontade de ficar sozinho?"
          },
          {
            "type": "RATING",
            "question": "Tenho conflitos nas relações familiares?"
          },
          {
            "type": "RATING",
            "question": "Sou agressivo com os outros?"
          },
          {
            "type": "RATING",
            "question": "Tenho dificuldade em manter amizades?"
          },
          {
            "type": "RATING",
            "question": "Sinto impaciência com as pessoas em geral?"
          },
          {
            "type": "RATING",
            "question": "Sinto dores no corpo?"
          },
          {
            "type": "RATING",
            "question": "Sinto dores no braço?"
          },
          {
            "type": "RATING",
            "question": "Sinto dor de cabeça frequentemente?"
          },
          {
            "type": "RATING",
            "question": "Tenho distúrbios digestivos?"
          },
          {
            "type": "RATING",
            "question": "Sinto dores nas costas?"
          },
          {
            "type": "RATING",
            "question": "Tenho alterações no sono?"
          },
          {
            "type": "RATING",
            "question": "Sinto dores nas pernas?"
          },
          {
            "type": "RATING",
            "question": "Tenho distúrbios circulatórios?"
          },
          {
            "type": "RATING",
            "question": "Tenho alterações no apetite?"
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