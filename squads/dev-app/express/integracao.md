---
order: 1
icon: gear
label: "Integração com nossas tecnologias"
---

# Integração com nossas tecnologias

Nós vamos usar o Express juntamente com Prisma, para nosso banco de dados, tRPC, para nossa api RPC, e Lucia Auth, para autenticação de usuários e sessões. Então, todas tecnologias deverão estar no mesmo repositório e devidamente configuradas.

## Iniciando Express

Primeiro de tudo, devemos iniciar nosso app Express, onde incluiremos as outras tecnologias definidas e configuradas.

```ts server.ts
import express from "express";

const app = express();

app.listen(3000);
```

## tRPC

Primeiro, para instalar o tRPC e podermoos usá-lo no projeto:

```bash
pnpm install @trpc/server
```

### Iniciando o tRPC

Criaremos uma pasta `trpc` e no arquivo `trpc.ts`, inicia-se o tRPC e configura-se as procedures necessárias:

```ts trpc/trpc.ts
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

const t = initTRPC.create();
const procedure = t.procedure;
export const appRouter = t.router({
    helloWorld: procedure.query(() => {
        return "Hello World";
    })
})

export const tRPCRouter = express.Router();
tRPCRouter.use("/trpc", 
    trpcExpress.createExpressMiddleware({
        router: appRouter,
    })
)

export type AppRouter = typeof appRouter;
// Será usado para fazer integração do tRPC no front-end
```

Dentro do `app.use()` no `server.ts` iremos usar o roteador tRPCRouter que cria um callback para o endpoint `/trpc`, o qual chama a função `createExpressMiddleware` usando como roteador o nosso `appRouter`, onde estão definidas nossas procedures, e retornando um middleware Express.