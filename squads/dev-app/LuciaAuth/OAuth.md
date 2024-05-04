---
order: 3
icon: globe
label: "Autenticação por terceiros"
author:
  - name: Pedro Amorim de Gregori
    avatar: /assets/logo_struct.png
category: Explicação
date: 2024-04-25
---

# Instalação e configuração para o OAuth

!!!
Os exemplo abaixo utilizaram o Next 14 App Router e o GitHub como provider.
A configuração nesta seção está baseada na realizada no tópico [introdução](./introducao.md).
!!!

Para utilizar autenticação por terceiros, será necessário instalar a biblioteca `artic` e configurar o `Client ID` e o `Client Secret` do provider no `.env`. A lista de todos os providers pode ser vista na esquerda do [Artic](https://arctic.js.org/).

```bash
npm install artic
```
É preciso configurar uma aplicação no site do provedor, o que varia de provedor para provedor. Com o `CLIENT_ID` e o `CLIENT_SECRET`, deve-se colocá-los em um arquivo `.env`.

```.env
GITHUB_CLIENT_ID="Aqui entra o client id"
GITHUB_CLIENT_SECRET="Aqui entra o client secret"
```

O `schema` precisa ser mudado para suportar operações com o OAuth.

```sql schema.prisma
model User {
    //...
    username String
    github_id Int @unique // Aqui varia dependendo do provedor
    //...
}
```

O lucia também precisa de algumas modificações.

```ts auth/lucia.ts
import { GitHub } from "arctic";

const adapter = new PrismaAdapter(client.session, client.user);

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID!,
	process.env.GITHUB_CLIENT_SECRET!
);

//...
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes) => { // Adiciona o atributo githubId
		return {
			username: attributes.username,
			githubId: attributes.github_id,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	// Atributos do usuário
	username: string;
	github_id: number;
}

```
# Entrar com o provider

O OAuth é praticamente configurar rotas para interagir com a Api do terceiro. Para isso, será necessário criar uma rota para iniciar o processo de Login com o provider.

==- Rota para iniciar o processo de Login
```ts api/signin/github/route.ts
import { generateState } from "arctic";
import { github } from "@/../auth/lucia";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	const state = generateState();
	const url = await github.createAuthorizationURL(state);

	cookies().set("github_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});
	return Response.redirect(url);
}

```
===

Depois crie uma rota para receber a resposta do Github.

==- Rota para o callback

```ts api/signin/github/callback/route.ts
import { github, lucia } from "@/../auth/lucia";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import prisma from "@/../prisma/index";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("github_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const existingUser = await prisma.user.findUnique({
			where: { github_id: githubUser.id },
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/",
				},
			});
		}

		const user = await prisma.user.create({
			data: { github_id: githubUser.id, username: githubUser.login },
		});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/",
			},
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
}

interface GitHubUser {
	id: number;
	login: string;
}

```
===

Agora o usuário já estará logado.

# Validar sessão/ Verificar usuário e Desconectar/LogOut

A validação do usuário e logout são iguais aos utilizados com credentials. Ver no tópico de [credentials](./credentials.md/#login).
