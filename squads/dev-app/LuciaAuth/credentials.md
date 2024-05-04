---
order: 4
icon: key
label: "Autenticação por credenciais"
author:
  - name: Pedro Amorim de Gregori
    avatar: /assets/logo_struct.png
avatar: /assets/logo_struct.png
category: Explicação
date: 2024-04-16
---

# Configuração para credenciais

!!!
Este tópico será uma introdução à autenticação com credenciais. Para mais informações sobre autorização de dois-fatores e verificação de email entre em [Lucia Auth](https://lucia-auth.com/guides/email-and-password/).
!!!

Para implementar a autenticação por credenciais será necessário a introdução de 2 novos campos na model `user` e vai ser necessário atualizar o lucia.

```sql schema.prisma
//...
model User {
  //...
    username String
	email String @unique
    hashed_password String
  //...
}

//...
```

```ts auth/lucia.ts
//...
const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes) => { // Acrescente esse bloco
		return {
			username: attributes.username,
			email: attributes.email,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes; // Acrescentar essa linha
	}

}

interface DatabaseUserAttributes { // Adicionar essa interface
	// Atributos do usuário
	username: string;
	email: string;
}
//...
```

# Operações de autenticação

 !!!
 Para criar os exemplos abaixo foi utilizado o next 14 App Router criando rotas para as APIs com o objetivo de deixar abrangente. É possível criar as funções utilizando `actions` também.
 !!!

## Cadastrar

Para cadastrar um usuário, será pedido os dados necessários para a aplicação e enviados para uma api que efetuará o cadastramento no banco de dados.

==- Exemplo da página
```tsx components/formCadastro.tsx
"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function FormCadastro() {
	const [dados, setDados] = useState({
		username: "",
		email: "",
		password: "",
	});

	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch("/api/signup", {
			method: "POST",
			body: JSON.stringify(dados),
		});

		if (res.ok) {
			router.replace("/profile");
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDados({ ...dados, [e.target.name]: e.target.value });
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col text-center gap-3 w-72 p-12 bg-zinc-800 rounded-xl"
		>
			<h2 className="text-zinc-200 font-bold text-3xl mb-2">
				Criar conta
			</h2>
			<input
				placeholder="Username"
				name="username"
				onChange={handleChange}
				className="bg-zinc-700 text-zinc-100 placeholder:text-zinc-100 p-3 rounded-sm"
			></input>
			<input
				placeholder="Email"
				name="email"
				type="email"
				onChange={handleChange}
				className="bg-zinc-700 text-zinc-100 placeholder:text-zinc-100 p-3 rounded-sm"
			></input>
			<input
				placeholder="Password"
				name="password"
				type="password"
				onChange={handleChange}
				className="bg-zinc-700 text-zinc-100 placeholder:text-zinc-100 p-3 rounded-sm"
			></input>
			<button
				type="submit"
				className="bg-zinc-950 p-3 mt-3 rounded-3xl text-zinc-100 text-xl font-bold"
			>
				Cadastrar
			</button>
		</form>
	);
}

```
===

=== Exemplo da Api
```ts api/signup/route.ts
import bcrypt from "bcrypt";
import { lucia } from "@/../auth/lucia";
import prisma from "@/../prisma/index";
import isValidEmail from "@/utils/email_validation"; //Função para validar emails

export async function POST(req: Request) {
	const { password, email, username } = await req.json();

	// Verificação de email
	if (!isValidEmail(email)) {
		return Response.json("Email inválido", { status: 400 });
	}

	if (password.lenght < 8) {
		return Response.json("Senha inválida", { status: 400 });
	}

// Tenta criar um usuário
	try {
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const user = await prisma.user.create({
			data: {
				email: email,
				hashed_password: hashedPassword,
				username: username,
			},
		});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		return Response.json(null, {
			status: 200,
			headers: {
				Location: "/profile",
				"Set-Cookie": sessionCookie.serialize(),
			},
		});
	} catch (e) {
		return Response.json("Ocorreu um erro.", {
			status: 500,
		}); // Erro genérico.
	}
}

```
===

## Login

Para realizar o login do usuário, irá ser pedido os dados como email e senha ou qualquer outra variação na página e eles serão enviados para uma rota de login.

==- Exemplo Frontend
```tsx components/formLogin.tsx
"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function FormLogin() {
	const [dados, setDados] = useState({
		email: "",
		password: "",
	});

	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch("/api/signin", {
			method: "POST",
			body: JSON.stringify(dados),
		});

		if (res.ok) {
			router.replace("/profile");
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDados({ ...dados, [e.target.name]: e.target.value });
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col text-center gap-3 w-72 p-12 bg-zinc-800 rounded-xl"
		>
			<h2 className="text-zinc-200 font-bold text-3xl mb-2">Login</h2>
			<input
				placeholder="Email"
				name="email"
				type="email"
				onChange={handleChange}
				className="bg-zinc-700 text-zinc-100 placeholder:text-zinc-100 p-3 rounded-sm"
			></input>
			<input
				placeholder="Password"
				name="password"
				type="password"
				onChange={handleChange}
				className="bg-zinc-700 text-zinc-100 placeholder:text-zinc-100 p-3 rounded-sm"
			></input>
			<button
				type="submit"
				className="bg-zinc-950 p-3 rounded-3xl mt-16 text-zinc-100 text-xl font-bold"
			>
				Entrar
			</button>
		</form>
	);
}

```
===
=== Exemplo Backend
```ts api/signin/route.ts
import { lucia } from "@/../auth/lucia";
import bcrypt from "bcrypt";
import isValidEmail from "@/utils/email_validation";
import prisma from "@/../prisma/index";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	if (!isValidEmail(email)) {
		return Response.json("Email inválido.", { status: 400 });
	}

	if (password.lenght < 8) {
		return Response.json("Senha inválida.", { status: 400 });
	}

	const user = await prisma.user.findUnique({ where: { email: email } });

	if (!user) {
		const salt = bcrypt.genSaltSync(10);
		bcrypt.hashSync(password, salt); // Mascarar o tempo de resposta para possíveis atacantes. Não necessário!
		return Response.json("Email ou senha não válidos", { status: 400 });
	}

	const hashed_password = user.hashed_password;

	if (!hashed_password) {
		return Response.json("Unauthorized", { status: 401 });
	}
	const validPassword = bcrypt.compareSync(password, hashed_password);

	if (!validPassword) {
		return Response.json("Email ou senha não válidos", { status: 400 });
	}

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	return Response.json(null, {
		status: 302,
		headers: {
			Location: "/profile",
			"Set-Cookie": sessionCookie.serialize(),
		},
	});
}

```
===

## Validar sessão/ Verificar usuário

!!!
Para fazer validações, o backend precisa verificar se a request de validação ocorreu por meio de um [CSRF.](https://www.treinaweb.com.br/blog/cross-site-request-forgery-csrf-e-abordagens-para-mitiga-lo)

==- Exemplo Next
Para o next esse ataque pode ser evitado utilizando o middleware.ts

```ts middleware.ts
import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	if (request.method === "GET") {
		return NextResponse.next();
	}
	const originHeader = request.headers.get("Origin");
	const hostHeader = request.headers.get("Host");
	if (
		!originHeader ||
		!hostHeader ||
		!verifyRequestOrigin(originHeader, [hostHeader])
	) {
		return new NextResponse(null, {
			status: 403,
		});
	}
	return NextResponse.next();
}

```
===
!!!

Como diversas páginas podem necessitar do usuário, uma boa ideia é criar uma função para não precisar escrever tudo em várias páginas. A função abaixo retornará um `user` se ele estiver "logado".

==- Função para pedir usuário
```ts utils/getUser.ts
import { cookies } from "next/headers";
import { cache } from "react";

import type { Session, User } from "lucia";
import { lucia } from "../../auth/lucia";

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(
					result.session.id
				);
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				);
			}
		} catch {}
		return result;
	}
);

```
===

## Desconectar/LogOut

Para desconectar, a página irá realizar um requisação para a API de `logout` que invalidará a sessão no banco de dados e vai retornar os cookies de usuário em branco.

==- Exemplo Frontend
```tsx components/logoutButton.tsx
"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
	const router = useRouter();
	const handleClick = async () => {
		const res = await fetch("/api/signout", { method: "POST" });
		if (res.ok) {
			router.replace("/");
		}
	};
	return (
		<button
			className="flex bg-zinc-800 p-6 pt-2 pb-2 rounded-3xl text-zinc-100 text-xl font-bold gap-4"
			onClick={handleClick}
		>
			Sair <LogOut size={32} color="#e10f44" />
		</button>
	);
}

```
===

==- Exemplo Backend
```ts api/singout/route.ts
import { validateRequest } from "@/utils/getUser";
import { lucia } from "@/../auth/lucia";

export async function POST(req: Request) {
	const session = (await validateRequest()).session;
	if (!session) {
		return Response.json(null, { status: 401 });
	}

	await lucia.invalidateSession(session.id);
	return Response.json(null, {
		status: 200,

		headers: {
			Location: "/",
			"Set-Cookie": lucia.createBlankSessionCookie().serialize(),
		},
	});
}

```
===