---
order: 1
icon: gear
label: "Integração com nossas tecnologias"
author:
  - name: Matheus das Neves
date: 2024-05-07
category: Explicação
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

Primeiro, instalar o tRPC para podermos usá-lo no projeto:

```bash
pnpm install @trpc/server
```

### Iniciando o tRPC

Criaremos uma pasta `trpc` e no arquivo `trpc.ts`, inicia-se o tRPC e configura-se as procedures que quisermos:

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

```ts server.ts
import express from "express";
import { tRPCRouter } from "./trpc/trpc.ts"


const app = express();
app.use(tRPCRouter)

app.listen(3000);
```

## Prisma

Prisma será usado para o nosso banco de dados relacional, também precisamos instalá-lo:

```bash
pnpm install prisma
```

E inicializar o Prisma:

```bash
pnpm prisma init
```

### Configurando o Prisma Client

Com o prisma instalado e inicializado, agora vamos fazer um arquivo `db.ts` que irá inicializar um Prisma Client:

```ts db.ts
import { PrismaClient } from "@prisma/client";
// Esse pacote só será visível após rodar o comando prisma generate

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

### Acessando o Prisma

Agora podemos acessar, no arquivo `trpc.ts`, o Prisma em procedures importando o `db` que definimos:

```ts trpc/trpc.ts
import { db } from "../db.ts"

...

export const appRouter = t.router({
    createUser: procedure.query(() => {
        const user = db.user.create({
            data: {
                ...
                }
        })
        // Assumindo que possuimos uma model User no banco de dados
        return user;
    })
})


...

```

## Lucia Auth

E, finalmente, podemos fazer a autenticação dos nossos usuários, rotas de logIn e logOut etc.
Como exemplo, faremos uma autenticação por terceiros usando o GitHub e, então, teremos que instalar o arctic juntamente com o lucia e o adaptador para o prisma, além do oslo para cookies.

```bash
pnpm install lucia @lucia-auth/adapter-prisma arctic oslo
```

Todas definições em relação à autenticação em si estão melhores explicadas e esclarecidas na nossa documentação de [Lucia-Auth](../../luciaauth/introducao), a ideia aqui é principalmente como é usado com o Express.

### Configurando o Lucia Auth

É preciso fazer a inicialização do Lucia e configurá-lo com o Prisma, além da configuração do provider do GitHub.
Criaremos uma pasta `auth` e dentro um arquivo `auth.ts`:

```ts auth/auth.ts
import { db } from "../db";
import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import { GitHub } from "arctic"

export const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// Atributos que nossa model User deve possuir 
			id: attributes.id,
			githubId: attributes.github_id,
			username: attributes.username
		};
	}
});

export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	id: string;
	github_id: string;
	username: string;
}
```

### Callback do Auth

Agora vamos definir um callback para o endpoint `/auth`, que irá ser executado antes das rotas de logIn ou logOut em si serem executadas.
Ele irá verificar os cookies da requisição e verificar se possui uma sessão válida, caso haja irá ser passada como propriedade do `res` para os próximos callback's/middlewares.
Além disso, verifica possíveis ataques CSRF, o qual é citado na nossa documentação de [Lucia-Auth](../../luciaauth/credentials). 

Iremos fazer um arquivo `index.ts` onde definiremos esses callback's:

```ts auth/index.ts
import express from "express";
import { verifyRequestOrigin } from "lucia";
import { lucia } from "./auth.js";
import type { User, Session } from "lucia";

export const authRouter = express.Router();

authRouter.use(express.urlencoded());

authRouter.use("/auth", (req, res, next) => {
	if (req.method === "GET") {
		return next();
	}
	const originHeader = req.headers.origin ?? null;
	const hostHeader = req.headers.host ?? null;
	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
		return res.status(403).end();
	}
	return next();
});
// Verifica ataques de CSRF

authRouter.use("/auth", async (req, res, next) => {
	const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
	if (!sessionId) {
		res.locals.user = null;
		res.locals.session = null;
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize());
	}
	if (!session || !session.fresh) {
		res.appendHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());
	}
	res.locals.session = session;
	res.locals.user = user;
	return next();
});
// Verifica a existência de cookies, se houver valida a sessão e cria cookies os quais são repassados ao res 

declare global {
	namespace Express {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}

```

Precisamos agora importar esse callback para o nosso app Express no `server.ts`:

```ts server.ts
import express from 'express';
import { tRPCRouter } from './trpc/trpc';
import { authRouter } from './auth';


export const app = express();

app.use(tRPCRouter, authRouter)

app.listen(3001);
```

### LogIn

Agora, podemos fazer nossa rota de logIn pelo GitHub, criando uma pasta `routes/login/` e dentro um arquivo `github.ts`:

```ts auth/routes/login/github.ts
import express from "express";
import { OAuth2RequestError, generateState } from "arctic";
import { parseCookies, serializeCookie } from "oslo/cookie";
import { github, lucia } from "../../auth";
import { db } from "../../../db";


export const githubLoginRouter = express.Router();
// Será importado para o authRouter, servindo como roteador para as rotas de login

githubLoginRouter.get("/auth/login/github", async (_, res) => {
	const state = generateState();
	const url = await github.createAuthorizationURL(state);
	res
		.appendHeader(
			"Set-Cookie",
			serializeCookie("github_oauth_state", state, {
				path: "/",
				secure: process.env.NODE_ENV === "production",
				httpOnly: true,
				maxAge: 60 * 10,
				sameSite: "lax"
			})
		)
		.redirect(url.toString());
});

githubLoginRouter.get("/auth/login/github/callback", async (req, res) => {
    // Rota de callback do github
	const code = req.query.code?.toString() ?? null;
	const state = req.query.state?.toString() ?? null;
	const storedState = parseCookies(req.headers.cookie ?? "").get("github_oauth_state") ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		console.log(code, state, storedState);
		res.status(400).end();
		return;
	}
	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();
		const existingUser = await db.user.findFirst({
			where: {
				github_id: githubUser.id
			}
		})

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			return res
				.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
				.redirect("http://localhost:3000/");
		}
		const newUser = await db.user.create({
			data: {
				github_id: githubUser.id,
				username: githubUser.login,
			}
		});
		const session = await lucia.createSession(newUser.id, {});
		return res
			.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
			.redirect("http://localhost:3000/");
	} catch (e) {
		if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
			res.status(400).end();
			return;
		}
		res.status(500).end();
		return;
	}
});

interface GitHubUser {
	id: string;
	login: string;
}
```

Esses middleware's são usados para primeiramente na rota `/auth/login/github` criar um `state` e levar o usuário para a rota de logIn do GitHub com esse estado e, posteriormente, ser trazido de volta para a rota `/auth/login/github/callback` com possíveis dados de um usuário GitHub nos cookies onde foi guardado o estado. Se o usuário GitHub ainda não estiver no banco de dados, será criado um usuário com os dados deste usuário, e, finalmente, será passada a sessão por cookies.

### LogOut

Dentro da pasta `routes` e no arquivo `logout.ts`, cria-se o logoutRouter que possui o middleware para fazer o logout.
Nesse middleware, é verificado se há dados no `res.locals` onde, definido pelo nosso callback no `auth.ts`, são guardados os dados de sessões e, então, invalida a sessão baseado nesses dados.

```ts auth/routes/logout.ts
import express from "express";
import { lucia } from "../auth";

export const logoutRouter = express.Router();

logoutRouter.post("/", async (_, res) => {
	if (!res.locals.session) {
		return res.status(401).end();
	}
	await lucia.invalidateSession(res.locals.session.id);
	return res
		.setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize())
		.redirect("/login");
});
```

### Configuração final

Agora que temos todos nossos Router's definidos com seus respectivos middleware's, temos que importá-los para o `authRouter` no arquivo `index.ts` e adicionar a seguinte linha de comando:

```ts auth/auth.ts
import { loginRouter } from "./routes/login/index.ts";
import { logoutRouter } from "./routes/logout.ts";

...

authRouter.use(loginRouter, logoutRouter);

...

```

Isto porque estamos usando o `authRouter` como nosso roteador central para rotas de autenticação e callback's necessários, deste modo importamos para o app Express somente o roteador central, não todos que usamos.

::: sample
Para informações mais aprofundadas sobre cada tecnologia, consulte nossas documentações de [tRPC](../../../../stack/trpc/pratica), [Prisma](../../../../stack/prisma/utilizacao) e [Lucia-Auth](../../luciaauth/introducao) 
:::

<style>
    .sample {
        text-align: center;
        color: #1956AF;
        border-radius: 10px;
        background-color: #E1EDFF;
        border: 1px solid #1956AF;
        padding-top: 20px;
        margin-bottom: 20px;
    }
</style>