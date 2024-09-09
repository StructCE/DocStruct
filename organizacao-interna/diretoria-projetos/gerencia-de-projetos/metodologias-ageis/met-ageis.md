---
label: "Metodologias Ágeis"
icon: project-symlink
author:
  name: Pedro Eduardo Cunha Ximenes
  avatar: ../assets/logo_struct.png
date: 09-09-2024
---

# Documentação de Gerência 🚀
1. Introdução
   1. Papéis
2. Metodologias Ágeis
   1. Scrum
   2. Kambam
   3. Ferramentas
3. Aplicação no Projeto
   1. Tratamento com o cliente
   2. Iniciando o projeto
   3. Passando por problemas



## Introdução

Esta documentação tem como objetivo auxiliar na capacitação de gerência para projetos internos e/ou externos à empresa. A documentação está dividida em tópicos determinando cada etapa de um gerenciamento.

A habilidade de gerenciar uma equipe é uma característica bastante requisitada no mercado de trabalho, e conhecendo melhor essa "skill" pode te ajudar em vários aspectos como: facilidade em trabalhar com equipes (sendo o gerente ou até memsmo desenvolvedor); diferencial dos demais concorrentes no mercado; melhorias indiretas em outras habilidades como oratória, gestão de tempo e riscos, entre outros.
Essa qualidade costuma ser difícil de ser treinada no mercado usual por oferecerem poucas oportunidades e com acompanhamento baixo ou até nulo. Dentro da empresa júnior é um ótimo momento para aprimorar tal conhecimento pois damos todo o auxílio e estrutura para lidar e aprimorar a gestão de uma equipe em conjunto com um bom alinhamento com o cliente.

### TODO: Conhecendo os papeis de cada um no projeto
 - Cliente
 - Gerente
 - Desenvolvedores
 - Squads auxiliares (Design etc.)
 - Acompanhador de gerente (membro da diretoria de projetos)



## Metodologias Ágeis

O objetivo desta etapa é apresentar as metodologias que a empresa utiliza para otimizar o processo de desenvolvimento.


### Scrum
O Scrum é uma metodologia ágil focada em entregar resultados de forma rápida e eficiente. A metodologia foi criada para promover a colaboração entre equipes, tornando o processo mais flexível e adaptável a mudanças.

#### Principais Componentes do Scrum:
##### Papel do Gerente:
No caso da gerência do projeto, o gerente faz o papel tanto do Product Owner quanto do Scrum Master:
 - Product Owner (Dono do Produto): responsável por definir a visão do produto e priorizar o backlog (lista de tarefas). O Product Owner deve garantir que a equipe está trabalhando nas funcionalidades de maior valor.
 - Scrum Master: facilita a aplicação do Scrum, ajudando a equipe a seguir os princípios e removendo obstáculos que possam interferir no progresso.

##### Palavras populares no Scrum:
 - Sprint: ciclo de desenvolvimento, onde geralmente e divido em 1 ou 2 semanas, no qual a equipe se compromete a entregar um incremento do produto. Durante esse período, o escopo não deve mudar.
 - Product Backlog: Lista feita pelo gerente no início do projeto onde dá ordem e prioriza as funcionalidades e melhorias que devem ser feitas no projeto.
 - Sprint Backlog: Lista de entregas que a equipe deve realizar durante uma Sprint (ciclo de trabalho). Elas são selecionadas do Product Backlog.
 - Versões: É o produto final, ou uma parte funcional dele, entregue em cada Sprint. Essas versões devem estar em um estado utilizável (Ex: prototipação/figma, banco de dados, front-end).

##### Weekly Scrum:
O Weekly Scrum é uma reunião semanal de média duração (30 minutos) onde a equipe discute o que foi feito no decorrer da semana, o que será feito em seguida e se há impedimentos (Tradicionalmente, essa reunião é feita todos os dias, mas dentro da empresa nós fazemos semanalmente).

 - Sprint Planning: Etapa no início de cada Sprint, onde a equipe planeja quais itens do Product Backlog serão trabalhados.
 - Sprint Review: Etapa no final da Sprint, onde a equipe apresenta o que foi desenvolvido.
 - Sprint Retrospective: Reunião para a equipe refletir sobre o processo da Sprint, identificando pontos de melhoria (essa reunião pode ser também um tópico feito no final da reunião semanal).

#### Vantagens do Scrum:
- Flexibilidade: o Scrum permite mudanças de direção conforme novas informações ou requisitos surgem.
- Transparência: todos os envolvidos no projeto têm visibilidade sobre o progresso e as dificuldades.
- Entrega Rápida: como o trabalho é dividido em sprints, há entregas frequentes e incrementais, gerando valor mais rapidamente.
- Colaboração: promove a comunicação constante entre todos os membros da equipe.

#### Ciclo de Trabalho no Scrum:
O gerente faz o Backlog e a Sprint Planning, decidindo quais tarefas serão realizadas.
Durante a Sprint, a equipe faz reuniões para ajustar o trabalho.
No final da Sprint, ocorre uma revisão e o incremento é entregue.
A equipe faz a Sprint Retrospective para melhorar o processo na próxima Sprint.


### Kanban
A metodologia Kanban é uma abordagem ágil usada para gerenciar e otimizar o fluxo de trabalho de maneira visual, permitindo que as equipes acompanhem e melhorem seus processos continuamente. Originária do Japão e popularizada pela Toyota na produção industrial, a metodologia Kanban foi adaptada para gerenciamento de projetos.

#### Princípios Fundamentais do Kanban:
##### Visualizar o Trabalho:
O princípio mais conhecido do Kanban é a visualização das tarefas em um quadro, geralmente chamado de "Kanban Board". Cada tarefa ou trabalho é representado por um cartão que é movido através de colunas que representam diferentes fases do processo (por exemplo: "A Fazer", "Em Progresso", "Concluído").
Isso permite que todos na equipe vejam claramente o status de cada tarefa e o progresso geral do projeto.

##### Limitar o Trabalho em Progresso (WIP - Work in Progress):
Um dos pilares do Kanban é limitar a quantidade de trabalho em andamento em cada fase. Isso ajuda a equipe a se concentrar em concluir as tarefas antes de começar novas, evitando que se dispersem em muitas atividades ao mesmo tempo.
Limitar o WIP também reduz o risco de sobrecarga e promove uma entrega mais eficiente.

##### Gerenciar o Fluxo de Trabalho:
O objetivo do Kanban é melhorar continuamente o fluxo de trabalho. Isso significa garantir que as tarefas passem por cada etapa do processo de maneira constante e sem gargalos.
Equipes podem medir o tempo que uma tarefa leva para ser concluída (Lead Time) e trabalhar para reduzir atrasos.

#### Estrutura de um Quadro Kanban:
Um quadro Kanban típico tem colunas que representam o estado do trabalho. As colunas mais comuns incluem:

- Backlog: onde as tarefas a serem feitas são listadas.
- A Fazer: as tarefas que estão prontas para começar.
- Em Progresso: tarefas em andamento.
- Concluído: tarefas que foram finalizadas.

As equipes podem adicionar colunas intermediárias ou especializadas, como Revisão ou Teste, dependendo da natureza do trabalho.

#### Limitação do Trabalho em Progresso:
O número de tarefas que podem estar na coluna Em Progresso é limitado. Isso ajuda a equipe a se concentrar nas tarefas que estão em andamento e a finalizá-las antes de começar novas.
Acompanhamento e Ajustes:

A equipe monitora o fluxo de trabalho e, se notar gargalos (por exemplo, muitas tarefas paradas em uma coluna), busca ajustar o processo para melhorar o fluxo. Isso pode ser feito, por exemplo, redistribuindo tarefas ou ajustando limites de WIP.

O Kanban é ideal para equipes que precisam de flexibilidade, visibilidade e querem melhorar continuamente a maneira como trabalham.


### TODO: Ferramentas



## Aplicação no projeto
### Tratamento com o Cliente
Todo projeto envolve a entrega de um resultado final, que pode ser dividido em entregas parciais, para um cliente. Este por sua vez pode ser tanto um cliente externo quanto a própria Struct, contudo, independente de qual for o cliente, deve-se seguir os pontos:

 - Respeito (comunicação não agressiva).
 - Entrega dentro do prazo.
 - Transparência com as etapas em desenvolvimento.

Recomenda-se ao início de projeto, que se estabeleça a forma como as informações, dúvidas e atualizações serão transmitidas para o cliente. Dentre eles incluem: qual meio de comunicação utilizar (chat por mensagem, email, etc); qual a frequência de reuniões de alinhamento (semanal, quinzenal, mensal); como os feedbacks serão recebidos; prazo de cada entrega; com qual intervalo e por onde serão repassados as atualizações.

### Iniciando o Projeto
Ao iniciar um projeto, o primeiro passo é analisar o contrato feito com o cliente. Nele estão informações importantes como o prazo do projeto (quando começa e quando termina), etapas definidas pela diretoria de projetos (quantas semanas vai durar as principais entregas do projeto como prototipação/design, backend, esquema do banco de dados, frontend e garantia para eventuais mudanças inclusas no contrato). Além disso estão listados nossos direitos e deveres como empresa, e os direitos/deveres do cliente. É extremamente importante que o gerente saiba dessas cláusulas para ter noção de como se proteger e como oferecer as garantias, espera-se que o cliente faça a parte dele, então fica na sua responsabilidade cumprir com as garantias da empresa.

Depois de analisar o contrato e coletar todas as informações importantes, o próximo passo é criar o backlog do projeto. Nele estará todas as semanas detalhadas do projeto, com cada etapa bem definida do que será feito e o que se espera conseguir ao realizar ela.

### TODO Criando Backlog e gerenciamento em cada Sprint

### Passando por problemas
Com o passar do desnvolvimento do projeto, pode ser que em algum momento ocorra algum problema a ser resolvido. Neste caso o seu TACO terá uma enorme importancia para a solução da situação e é importante que ele esteja em dia. A seguir estão os passos indicados para resolver o problema sem dores de cabeça excessivas:

 1. Transparência -> Identifique e entenda por completo o problema, quanto mais você esteja entendo da situação, mais fácil será para resolvê-la. Nessa etapa é importante identificar: onde, quando e como surgiu o problema; o grau de dificuldade e urgência ele possui; formas para resolver a problemática (pense também em solucionar o que causou o problema, não foque somente na daninha, corte ela pela raiz).
 2. Alinhamento -> Uma vez com o problema identificado, repasse a tarefa para alguém da equipe para resolver a situação, se for preciso, peça ajuda ao Acompanhador de Projeto para ele te auxiliar na melhor tomada de decisão.
 3. Comunicação -> Depois de alinhar a situação, o objetivo agora é comunicar os próximos passos para a equipe e para o cliente. A sua equipe precisa de toda a informação sobre para facilitar a resolução. Já o cliente precisa saber desses detalhes para passar uma relação de segurança, problemas são comum de acontecer, mas a forma como você mostra como a nossa empresa lida com ela que faz a diferença. **Seja sempre claro e apresentando possíveis soluções**.
 4. Organização -> Por fim, após o aval do cliente para a solução mais adequada. Deve-se gerenciar a equipe e o prazo para conseguir concluir o problema no prazo definido.