---
order: 1
icon: rocket
label: "DockerFile e Docker Compose para uma aplicação específica do repo t3"
author:
  name: Gabriel Ribeiro
  avatar: ../assets/logo_struct.png
category: Explicação
tags:
  - DockerFile
  - Docker Compose
  - T3 Stack
date: 2024-09-02
---

## Configurando Docker para um Projeto com o Template T3


Agora que entendemos os conceitos de contêiner, imagem, Docker, Dockerfile e Docker Compose, é hora de aprender como configurar o Docker para um projeto que utiliza o template T3.

O template T3 geralmente envolve uma aplicação Next.js com TypeScript, Prisma (para gerenciamento de banco de dados), e outras ferramentas modernas. Vamos criar um Dockerfile e um arquivo docker-compose.yml para configurar corretamente o ambiente de desenvolvimento.


### Configuração do Next.js

Para otimizar a construção da imagem Docker para uma aplicação Next.js, você deve adicionar a configuração standalone no arquivo next.config.mjs. Isso ajuda a reduzir o tamanho da imagem aproveitando os rastreamentos de saída.

```next.config.mjs
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
});
```

### Criar o Arquivo .dockerignore

Crie um arquivo .dockerignore para evitar que arquivos e diretórios desnecessários sejam copiados para a imagem Docker:

```.dockerignore
.env
Dockerfile
.dockerignore
node_modules
npm-debug.log
README.md
.next
.git

```

###  Criar o Dockerfile

Crie um Dockerfile com a seguinte configuração para construir e executar a aplicação:

```dockerfile
##### DEPENDENCIES

FROM --platform=linux/amd64 node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install Prisma Client - remove if not using Prisma

COPY prisma ./

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### BUILDER

FROM --platform=linux/amd64 node:20-alpine AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
    if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
    elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && SKIP_ENV_VALIDATION=1 pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### RUNNER

FROM --platform=linux/amd64 gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app

ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["server.js"]
```

Como pode-se nota este Dockerfile está organizado em três estágios principais: **DEPENDENCIES**, **BUILDER**, e **RUNNER**.

#### Etapas do Dockerfile

**1. Etapa `deps`:**

- **Objetivo:** Instalar as dependências do projeto.
- **Detalhes:**
  - **Base:** Utiliza a imagem `node:20-alpine` como base, que é uma imagem Node.js slim com base em Alpine Linux.
  - **Dependências do sistema:** Adiciona pacotes necessários, como `libc6-compat` e `openssl`, usando o gerenciador de pacotes apk do Alpine Linux.
  - **Prisma:** Copia a configuração do Prisma, se aplicável.
  - **Diretório de trabalho:** Define o diretório de trabalho como `/app`.
  - **Instalação de dependências:** Copia os arquivos de configuração de pacotes (`package.json`, `yarn.lock`, etc.) e instala as dependências com base no gerenciador de pacotes detectado.

**2. Etapa `builder`:**

- **Objetivo:** Construir a aplicação.
- **Detalhes:**
  - **Base:** Utiliza a mesma imagem base `node:20-alpine`.
  - **Argumentos:** Define argumentos para passar variáveis de ambiente durante a construção, como `DATABASE_URL` e `NEXT_PUBLIC_CLIENTVAR`.
  - **Copiar dependências:** Copia as dependências instaladas na etapa anterior.
  - **Copiar código:** Copia todo o código fonte do projeto.
  - **Build da Aplicação:** Executa o processo de build da aplicação com base no gerenciador de pacotes detectado, preparando a aplicação para ser executada em produção.

**3. Etapa `runner`:**

- **Objetivo:** Executar a aplicação.
- **Detalhes:**
  - **Base:**  Este estágio utiliza a imagem `distroless`, que é uma imagem extremamente mínima, contendo apenas as bibliotecas essenciais para rodar a aplicação, o que resulta em uma imagem mais segura e leve.
  - **Configuração de Produção:** Define a variável de ambiente `NODE_ENV` como `production`.
  - **Cópia dos Artefatos de Build:** Copia os artefatos necessários do estágio de build, como o arquivo `next.config.js`, diretório `public`, `package.json`, e o diretório `.next` com os arquivos estáticos e o código compilado.
  - **Exposição da Porta:** Expõe a porta `3000`, onde a aplicação irá escutar.
  - **Comando de Início:** Define o comando que será executado quando o contêiner iniciar, que neste caso é `server.js`.


#### Construir e Executar a Imagem Localmente

Para construir e executar a imagem Docker localmente, use os seguintes comandos:

```
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```
Abra `http://localhost:3000` para visualizar sua aplicação em execução.


###  Configuração do Docker Compose

Você também pode usar o Docker Compose para construir e executar múltiplos contêineres de forma simplificada. Siga os passos abaixo:

####  Criar o Arquivo docker-compose.yml

Crie um arquivo docker-compose.yml com a seguinte configuração:

```
version: "3.9"
services:
  app:
    platform: "linux/amd64"
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_CLIENTVAR: "clientvar"
    working_dir: /app
    ports:
      - "3000:3000"
    image: t3-app
    environment:
      - DATABASE_URL=database_url_goes_here
```

A versão `3.9` do Docker Compose é utilizada neste arquivo de configuração, sendo compatível com Docker 18.06.0+ e Docker Compose 1.22.0+. O arquivo define um serviço chamado `app`, que será executado como um contêiner. A plataforma especificada para este contêiner é `linux/amd64`, garantindo que ele seja construído para arquiteturas de 64 bits no Linux. A construção da imagem para este serviço é configurada através da seção `build`, onde o diretório atual (`.`) é definido como o contexto de construção, e o Dockerfile utilizado é identificado como `Dockerfile`. Além disso, argumentos de build, como `NEXT_PUBLIC_CLIENTVAR`, são definidos na seção `args`, com o valor atribuído de clientvar.

O diretório de trabalho dentro do contêiner é configurado como `/app`, onde todos os comandos serão executados. A seção `ports` mapeia a porta `3000` do contêiner para a porta `3000` do host, permitindo que a aplicação seja acessada externamente através dessa porta. A imagem do contêiner é nomeada como `t3-app`, e, caso já esteja construída, será reutilizada; caso contrário, o Docker Compose construirá a imagem conforme as configurações fornecidas.

Finalmente, a seção `environment` define variáveis de ambiente para o contêiner, sendo que `DATABASE_URL` é configurada com o valor  `database_url_goes_here`, que será utilizado pela aplicação para se conectar ao banco de dados.









#### Executar o Docker Compose

Para construir a imagem e iniciar o contêiner com Docker Compose, use o comando:

```bash
docker compose up
```

Abra `http://localhost:3000` para visualizar sua aplicação em execução.