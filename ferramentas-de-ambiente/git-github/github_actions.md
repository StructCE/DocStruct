---
order: 6
icon: rocket
label: "O que é GitHub Actions?"
author:
  name: Victor Costa
  avatar: ../assets/logo_struct.png
date: 2024-10-10
category: Explicação
---

# **O que é GitHub Actions?**

GitHub Actions é uma funcionalidade do GitHub que automatiza tarefas como a integração contínua (CI - Continuous Integration) e entrega contínua (CD - Continuous Deployment). Em termos simples, ele permite que você configure fluxos de trabalho (workflows) que executam ações automaticamente em resposta a eventos no repositório, como quando alguém faz um "push" (envia código) para o branch principal.

O GitHub Actions funciona como uma ferramenta poderosa de revisão. É como um chefe exigente que está sempre atento para você não cometer erros — mas no bom sentido! Afinal, usando o GitHub Actions, você pode modificar o site e ele será revisado automaticamente. As alterações são então enviadas diretamente ao servidor, onde ficam imediatamente visíveis para o cliente final no site.

### Por que GitHub Actions é importante?

1. **Automação:** Ele permite que você automatize tarefas repetitivas como testar código, fazer builds, ou implantar seu projeto.
2. **Integração Contínua (CI):** Isso significa que, toda vez que há uma mudança no código, ele pode ser automaticamente testado e validado.
3. **Entrega Contínua (CD):** Permite que o código validado seja implantado automaticamente em ambientes de produção ou teste.
4. **Customização:** Você pode definir **o que** deve acontecer e **quando** (por exemplo, "testar o código sempre que alguém fizer um pull request").
5. **Paralelismo e Escalabilidade:** Várias tarefas podem ser executadas ao mesmo tempo, como rodar testes e gerar builds paralelamente.

## Como integrá-lo ao seu projeto?

Após criar seu projeto usando o "T3", o primeiro passo é criar a pasta `.github` no diretório raiz. Dentro desta pasta recém-criada, adicione outra pasta chamada `workflows`. Agora, na pasta `workflows`, crie um arquivo com o nome de sua preferência, mas com a extensão `.yaml`. Este arquivo conterá as instruções para o GitHub Actions.

```bash
mkdir .github
cd .github
mkdir workflows
nano nome-do-seu-arquivo.yaml
code .
```

Lembre-se: neste exemplo acima, estou usando o arquivo nano, mas pode ser o vim ou você pode criar o arquivo diretamente pelo seu VS Code, sendo dispensável essa última instrução. Caso prefira usar o nano, é só usar Ctrl+O para salvar, Enter e Ctrl+X para fechar o arquivo.

## E agora o que eu faço?

Agora que sua estrutura está pronta, vamos começar a explorar o funcionamento do Workshop.

### Componentes Principais de um Workflow

1. **Nome do Workflow**: É o nome do workflow que vai aparecer no GitHub.
   - Exemplo: `name: learn-github-actions`.
2. **Eventos (on):** Define **quando** o workflow será acionado. O GitHub Actions pode ser ativado por eventos como `push` (envio de código), `pull_request` (solicitação de alteração), entre outros.

Exemplo:

```yaml
name: learn-github-actions

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

Observação: O "on" tem várias funcionalidades e regras. A regra que escolhi para esta action específica foi que, a cada vez que alguém fizer um push na branch main, o GitHub Actions será acionado. Esta regra definida usou um filtro, mas é possível criar uma action sem nenhum filtro. Veja o exemplo abaixo:

Exemplo usando apenas 1 regra:

```yaml
name: learn-github-actions

on: [push]
```

Exemplo usando 2 regras:

```yaml
name: learn-github-actions

on: [push, pull_request]
```

Existem diversos filtros disponíveis. Acredite, são muitos! Caso você queira entender melhor como a funcionalidade "on" funciona, deixo aqui um vídeo que explica exatamente isso: [Criando um Workflow AUTOMATIZADO de CI com o Github Actions](https://www.youtube.com/watch?v=F51HlrEeedw) a partir do minuto 2:50, o vídeo explica em detalhes o que você pode usar.

Mas caso precise de algo mais específico, a [documentação do próprio GitHub](https://docs.github.com/pt/actions/writing-workflows/workflow-syntax-for-github-actions#using-filters) traz uma vasta lista com todos os filtros que você pode usar, exatamente neste tópico.

### Como funciona o Jobs?

**Jobs:** Um workflow é composto por um ou mais **jobs**, que são as tarefas a serem executadas. Cada job roda de forma independente.

- Exemplo: `jobs: build:`.
- **Ambiente de Execução (runs-on):** Define o ambiente que será usado para executar o job. Normalmente, é um sistema operacional, como `ubuntu-latest`.

Como podemos ver no código abaixo:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

No nosso caso, sempre vamos usar o Ubuntu, visto que nosso servidor é um Ubuntu. Além disso, isso é de suma importância para que o teste do Build seja feito na última versão e não gere nenhum problema quando formos criar nosso contêiner Docker.

**Passos (steps):** Cada job é composto por uma sequência de **steps** (passos). Um step pode ser uma ação pré-definida ou um comando customizado. Steps podem usar **ações** (que são reutilizáveis) ou executar comandos de script.

- Exemplo:

  ```yaml
  - name: Use Node.js
    uses: actions/setup-node@v2
    with:
      node-version: "22"
  - name: Install pnpm
    run: npm install -g pnpm
  ```

Esses passos servem para fazer o build da nossa aplicação, onde ele está programado para baixar a última versão do Node.js para testar nossa aplicação. Além disso, como usamos o **pnpm** em nossos projetos, é muito importante nunca esquecer de baixar a versão correta do **pnpm** usada em nosso projeto.

### Explicação completa do código

Agora que vimos o funcionamento do GitHub Actions, vamos analisar linha a linha do nosso código.

- **name**: Este é o nome do workflow. Ele será exibido no GitHub, então, se você abrir o repositório e clicar em "Actions", verá o nome `learn-github-actions`.

```yaml
name: learn-github-actions
```

- **on**: Define quando o workflow será executado.
  - **push**: O workflow será disparado sempre que alguém fizer um push (enviar código) para o branch `main`.
  - **pull_request**: Também será executado quando alguém abrir um pull request para o branch `main`.

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

- **jobs**: O job é o conjunto de tarefas que serão executadas.
  - **build**: Nome do job, aqui ele é chamado "build".
  - **runs-on**: Define o ambiente em que o job será executado. Neste caso, é uma máquina virtual rodando o Ubuntu na versão mais recente (`ubuntu-latest`).

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

- **steps**: São os passos que o job vai seguir.
  - **uses**: Aqui, o step usa uma ação já pronta do GitHub chamada `actions/checkout@v3`. Ela serve para "baixar" (fazer o checkout) o código-fonte do repositório no ambiente onde o workflow está rodando, para que você possa trabalhar com ele.

```yaml
steps:
  - uses: actions/checkout@v3
```

- **name**: Este step tem um nome descritivo, "Use Node.js".
- **uses**: Utiliza outra ação pronta chamada `actions/setup-node@v2`, que configura o Node.js no ambiente.
- **with**: Aqui você passa parâmetros para a ação. Neste caso, está especificando que a versão do Node.js a ser usada é a `22`.

```yaml
- name: Use Node.js
  uses: actions/setup-node@v2
  with:
    node-version: "22"
```

- **name**: Um step chamado "Install pnpm".
- **run**: Este step executa um comando shell para instalar o `pnpm` globalmente usando o `npm`.

```yaml
- name: Install pnpm
  run: npm install -g pnpm
```

- **name**: Um step chamado "Install dependencias".
- **run**: Este comando shell executa o `pnpm install` para instalar as dependências do projeto e depois executa `pnpm run build` para construir o projeto.

```yaml
- name: Install dependencias
  run: |
    pnpm install
    pnpm run build
```

Com isso, acredito que você conseguirá criar uma action simples de build sem problemas. Caso queira fazer algo diferente ou se aprofundar mais, a documentação do GitHub é bem completa e fácil de entender. Basta acessar: [Documentação do GitHub Actions](https://docs.github.com/pt/actions/writing-workflows/quickstart).
