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

### Conhecendo os papeis de cada um no projeto

- Cliente:
  - O cliente representa as pontas do desenvolvimento do do projeto. A ideia inicial surge a partir da necessidade dele e será ele quem receberá o produto final. Suas responsabilidades são: apresentar a ideia e seus feedbacks da maneira mais clara possível no decorrer do desenvolvimento; entregar os recursos essenciais para dar continuidade ao projeto (assets autorais, arquivos importantes e/ou base de dados do projeto, conteúdo para o site, etc); manter o pagamento do projeto em dia.
  - Pode ocorrer do cliente não seguir alguns dos pontos citados acima, caso isso aconteça, recomenda-se que a Struct auxilie o cliente para seguir as responsabilidades ditas na medida do possível.
- Gerente:
  - De certa forma é interessante que a metodologia aplicada na gerência dê autonomia aos desenvolvedores, de forma que eles consigam ter liberdade para serem criativos e para exercerem um papel de autoliderança, porém, essa autonomia pode afetar negativamente o desempenho individual ou do coletivo. Dessa forma, o que pode ser feito para resolver a situação? São nesses casos que o gerente vem para resolver.
  - O gerente é o maior responsável em manter a equipe nos trilhos, ele influencia diretamente no desempenho dos mesmos. As responsabilidades de um gerente são:
    - Planejamento das tarefas, bem como as divisões de sprints e alocação de tarefaas para cada desenvolvedor.
    - 1° Revisão de PR, onde deve analisar se o código feito segue as regras de clean code, se está executando sem bugs. 
      > **Não pode subir PR's com problemas na produção.**
    - Srum Master: Deve liderar as reuniões entre a equipe e sempre buscar otimizar a forma como a reunião é toccada (ou seja, acrescentar ou descartar metodologias que impactam o projeto); resolver ou auxiliar na resolução de possíveis problemas que equipe esteja passando, sendo estes problemas pessoais ou coletivos.
- Desenvolvedores:
  - O principal papel dos desenvolvedores é execultar as issues do projeto, suas outras são responsabilidaddes são:
    - Comunicar ao gerente quaisquer problemas ou situações encontradas que impactam o projeto.
    - Contribuir na manuntenção da metodologia aplicada ao projeto, seja com sugestões de melhorias ou auxiliando o gerente nas execuções internas da metodologia.
    > O gerente deve sempre lembrar os desenvolvedores dessas responsabilidades no decorrer do desenvolvimento do projeto.
- Squads auxiliares (Design etc.):
  - Os SQUADS existem para dar suporte em tarefas específicas que o projeto pode ter. Um exemplo desse caso é o SQUAD de Design, que contribui na prototipação do projeto, fazendo o Figma do site, app, ou sistema web.
- Acompanhador de gerente (membro da diretoria de projetos):
  - O acompanhador possui 2 trabalhos princiapais: PO (Project Owner) e suporte ao gerente. Das atribuições dada ao Acompanhador de Projetos são:
    - PO: Apresentar as atualizações do projeto ao cliente, além de recolher os feedbacks e repassá-los ao gerente.
    - 2° Revisão de PR, onde deve os testes de execução e deploy serão feitos (testes de produção). Caso o PR apresente alguma falha, ele deve voltar para etapa de desenvolvimento para corrigir o problema ou bug que esteja causando a falha.
    - Fazer o redeploy, que é o deploy toda vez que uma srpint é concluida (quando a branch main é atualizada). Esse redeploy será utilizado para apresentar ao cliente as atualizações feitas no projeto.



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


### Ferramentas
Durante o desenvolvimento do projeto, o gerente pode utilizar algumas ferramentas que facilite a gestão da equipe e para aplicar a metodologia ágil (nesse ponto não existe limitações, qualquer ferramenta que auxilie no processo é bem vinda). Existem algumas ferramentas conhecidas que podem contribuir no projeto como: Google Tasks; Trello; Github; etc.

#### Como utilizar o Kanban do Github
No GitHub, a funcionalidade de Kanban está integrada dentro da ferramenta de "Projects". Para configurar a ferramenta e usar um quadro Kanban em um repositório no GitHub, siga os seguintes passos:

##### Passos para usar o Kanban no GitHub:
1. Acesse seu repositório no GitHub:
    - Entre no repositório onde deseja usar o Kanban.
    - Certifique-se de estar logado com permissões de escrita no repositório.

2. Vá para a aba de "Projects":
    - Dentro do repositório, clique na aba "Projects". Essa aba está na parte superior, junto com "Code", "Issues", "Pull Requests" etc.
    :::Acessando área de projetos
    ![](imagens/acessando-projetos-gh.jpeg)
    :::
    - Se ainda não houver nenhum projeto, será exibida uma opção para criar um novo.

3. Crie um novo Projeto (Project):
    - Clique no botão "New Project".
    - Escolha o tipo de projeto Kanban (Board). O GitHub oferece diferentes formas de visualizar projetos, mas para o Kanban, você deve selecionar "Board".
    :::Criando o Kanban
    ![](imagens/criando-kanban-gh.jpeg)
    :::
    - Dê um nome para o seu projeto e adicione uma breve descrição (opcional).
    - Clique em "Create project" para criar seu novo quadro Kanban.

4. Configuração inicial do Kanban: O GitHub fornece algumas colunas padrão, que são:
    - To do: Tarefas que ainda não foram iniciadas.
    - In progress: Tarefas que estão em andamento.
    - Done: Tarefas que já foram concluídas.
    :::Kanban padrão do Github
    ![](imagens/kanban-padrao-gh.jpeg)
    :::

    Você pode editar, adicionar ou remover colunas de acordo com a necessidade do seu projeto. Para editar uma coluna, clique nos três pontos no topo da coluna e selecione as opções disponíveis.

5. Adicionando cartões (cards):
    - Dentro de cada coluna, você pode adicionar "cards" para representar as tarefas ou funcionalidades a serem desenvolvidas.
    - Clique em "Add a card" dentro de uma coluna e selecione uma Issue existente do seu repositório, ou crie uma nova.
    - Se você quiser criar uma nova issue diretamente do quadro Kanban, clique em "Create new issue", escreva o título e, opcionalmente, adicione uma descrição.

6. Movendo tarefas entre colunas:
    - À medida que o trabalho avança, você pode arrastar e soltar os cartões de uma coluna para outra, por exemplo, de To do para In progress e depois para Done.

    Isso ajuda a visualizar o progresso de cada tarefa de maneira fácil e organizada.

7. Automatizando o fluxo de trabalho (opcional): O GitHub Projects permite automatizar certas ações, como mover cartões automaticamente para a coluna Done quando uma Pull Request é fechada. Para configurar isso:
    - Clique nos três pontos na parte superior da coluna desejada e selecione Manage automation.
    - Você pode definir gatilhos, como quando uma Issue for fechada ou quando um Pull Request for mergeado.

8. Visualizando e filtrando tarefas:
    - Na parte superior do projeto Kanban, há um botão de Filters onde você pode filtrar os cartões por assignee (responsável), label (etiquetas), milestones ou outras condições.
    - Isso ajuda a focar nas tarefas relevantes para um colaborador específico ou uma sprint.
    :::Selecionando filtros
    ![](imagens/selecionando-filter.jpeg)
    :::

9. Usando o quadro Kanban em equipe:
    - Você pode colaborar com sua equipe no quadro, atribuindo responsáveis para os cartões (issues) e adicionando labels para categorizar melhor as tarefas.
    - Também é possível comentar nas issues diretamente do quadro para facilitar a comunicação entre os membros do projeto.

##### Exemplos de uso:
  - **Projetos Ágeis:** Configure colunas que representam fases do ciclo de desenvolvimento, como Backlog, Sprint, Em desenvolvimento, Revisão de código e Concluído.
  - **Gestão de bugs:** Crie um quadro para priorizar e gerenciar correções de bugs com colunas como Aguardando correção, Em correção e Corrigido.

> **Dicas**
> - Use Labels e Milestones para organizar melhor o seu trabalho. As Labels podem categorizar as issues (ex: "Bug", "Feature", "Enhancement"), enquanto os Milestones ajudam a agrupar issues para uma entrega específica.
> - Revise periodicamente o quadro para garantir que as tarefas estejam sendo movidas corretamente e que o progresso do projeto seja transparente para todos os membros.




## Aplicação no projeto
### Tratamento com o Cliente
Todo projeto envolve a entrega de um resultado final, que pode ser dividido em entregas parciais, para um cliente. Este por sua vez pode ser tanto um cliente externo quanto a própria Struct, contudo, independente de qual for o cliente, deve-se seguir os pontos:

 - Respeito (comunicação não agressiva).
 - Entrega dentro do prazo.
 - Transparência com as etapas em desenvolvimento.

Recomenda-se ao início de projeto, que se estabeleça a forma como as informações, dúvidas e atualizações serão transmitidas para o cliente. Dentre eles incluem: qual meio de comunicação utilizar (chat por mensagem, email, etc); qual a frequência de reuniões de alinhamento (semanal, quinzenal, mensal); como os feedbacks serão recebidos; prazo de cada entrega; com qual intervalo e por onde serão repassados as atualizações.

### Iniciando o Projeto
Ao iniciar um projeto, o primeiro passo é analisar o contrato feito com o cliente. Nele estão informações importantes como o prazo do projeto (quando começa e quando termina), etapas definidas pela diretoria de projetos (quantas semanas vai durar as principais entregas do projeto como prototipação/design, backend, esquema do banco de dados, frontend e garantia para eventuais mudanças inclusas no contrato). Além disso estão listados nossos direitos e deveres como empresa, e os direitos/deveres do cliente. É extremamente importante que o gerente saiba dessas cláusulas para ter noção de como se proteger e como oferecer as garantias, espera-se que o cliente faça a parte dele, então fica na responsabilidade do Gerente e Acompanhador cumprir com as garantias do lado da Struct.

Depois de analisar o contrato e coletar todas as informações importantes, o próximo passo é criar o backlog do projeto. Nele estará todas as semanas detalhadas do projeto, com cada etapa bem definida do que será feito e o que se espera conseguir ao realizar ela.

### Criando Backlog e gerenciamento em cada Sprint
No processo de criação do Backlog estão inclusas algumas etapas iniciais do projeto. Antes de tudo é necessário fazer a etapa de prototipação.
Na prototipação o SQUAD de Design elabora o Figma do projeto. Depois que o Figma é finalizado, o Acompanhador passa o resultado para o cliente e recolhe os feedbacks ou a aprovação do cliente, para aí sim, seguir para próxima etapa. Este ponto do projeto é essencial para alinharmos com as expectativas que o cliente possui em relação ao produto que será desenvolvido.
Durante o processo de prototipação, o Gerente deve cuidar do gerenciamento de Backlog e do Sprint Backlog, da seguinte forma:
- **Backlog:** Nesta etapa o Gerente recolhe todas as tarefas que forma elaboradas no contrato, e organiza-as da forma como achar melhor para o desenvolvimento do projeto, alguns exemplos são:
  - Agrupar as tarefas em categorias semelhantes como: Frontend, Backend, Banco de Dasdos etc.
  - Dividir grandes tarefas em tarefas menores. Ex: Frontend do projeto pode ser dividido em páginas e componentes (dentro do frontend, foque em desenvolver primeiro os componentes que serão mais utilizados no serviço).

  Nesta parte é importante criar as tarefas pensando no tempo que custará para ser desenvolvida. Geralmente trabalhamos em ciclos semanais, então é interessante criar as tarefas que serão feitas de forma que elas consigam ser concluidas num intervalo de uma semana (Divida as grandes tarefas que duram mais de uma semana em tarefas menores, ou atribua mais tarefas a um desenvolvedor caso essas tarefas sejam curtas e de para resolver em menos de uma semana).

- **Sprint Backlog:** Depois de separar o Backlog, o objetivo agora é separar elas em sprints (grupo de tarefas/issues). Uma sprint pode durar entre uma semana ou mais e o resultado final dessa sprint deve ser uma versão estável (sem nenhum bug ou problema) do projeto. O gerente tem a decisão de ordenar por prioridade as sprints da forma como achar melhor para o projeto (decidir a ordem entre frontend, backend e bd).
  
Após esse processo, o gerente vai divulgar para a equipe a ordem de cada sprint abordar cada uma delas no decorrer da execução do projeto.

> **Dica:**
> Caso o projeto tenha alguma funcionalidade ou precise de uma biblioteca ou framework que a empresa não trabalhou ainda, é importante reservar um período no início do projeto para a equipe pesquisar sobre a nova feature.

### Passando por problemas
Com o passar do desnvolvimento do projeto, pode ser que em algum momento ocorra algum problema a ser resolvido. Neste caso o seu TACO terá uma enorme importancia para a solução da situação e é importante que ele esteja em dia. A seguir estão os passos indicados para resolver o problema sem dores de cabeça excessivas:

 1. Transparência -> Identifique e entenda por completo o problema, quanto mais você esteja entendo da situação, mais fácil será para resolvê-la. Nessa etapa é importante identificar: onde, quando e como surgiu o problema; o grau de dificuldade e urgência ele possui; formas para resolver a problemática (pense também em solucionar o que causou o problema, não foque somente na daninha, corte ela pela raiz).
 2. Alinhamento -> Uma vez com o problema identificado, repasse a tarefa para alguém da equipe para resolver a situação, se for preciso, peça ajuda ao Acompanhador de Projeto para ele te auxiliar na melhor tomada de decisão.
 3. Comunicação -> Depois de alinhar a situação, o objetivo agora é comunicar os próximos passos para a equipe e para o cliente. A sua equipe precisa de toda a informação sobre para facilitar a resolução. Já o cliente precisa saber desses detalhes para passar uma relação de segurança, problemas são comum de acontecer, mas a forma como você mostra como a nossa empresa lida com ela que faz a diferença. **Seja sempre claro e apresentando possíveis soluções**.
 4. Organização -> Por fim, após o aval do cliente para a solução mais adequada. Deve-se gerenciar a equipe e o prazo para conseguir concluir o problema no prazo definido.


