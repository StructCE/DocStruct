---
order: 4
icon: server
label: "Interação com o servidor"
author:
    name: "Pedro Amorim de Gregori"
category: Explicação
date: 2024-02-20
---

# Guia de desenvolvimento Next utilizando App Router!

## API REST

!!!
Se estiver fazendo um projeto com a stack T3, utilize o tRPC para fazer a API.
!!!

As `APIs` são os meios que diferentes partes do site utilizarão para conversar entre si. No app router do next, é possivel a utilização do método `route handler` para a criação das `APIs`. As `route handlers` podem ser utilizadas para ler dados existentes `GET`, criar novos dados `POST`, atualizar dados existentes `PATCH` e deletar algum dado `DELETE`. Para criar uma API própria é interessante ter um banco de dados funcional, logo, é recomendado aprender a parte da `ORM` `Prisma` antes.

### Criando uma rota de API

Para criar uma rota API é necessário escrever um arquivo com o nome `route.ts`, nele será construída a API da rota.

Para criar os métodos recebidos pela API, iremos exportar funções assíncronas `export async function` com o nome `GET`, `POST`, `PATCH` e `DELETE`, dependendo do uso da função. Se sua função depender de algum parâmetro passado no `body` da requisição, nos parâmetros da função coloque um parâmetro request com a tipagem `Request`.

O corpo da função tem como objetivo a aquisição dos dados a serem transmitidos pela API ou a realização de mudanças no banco de dados, provavelmente vai entrar alguma lógica envolvendo o banco de dados nessa parte.

Por fim, as APIs `route handler` do next precisam do `return` de uma `Response`. Nessa `Response` utilize o método `json` para a transmissão dos dados coletados ou código de status.

==- Exemplo de Route Handler

```ts route.ts
import prisma from "@/../prisma/index";

export async function GET() {
	let mensagens = await prisma.mensagem.findMany();
	if (mensagens) {
		let mensagem = mensagens[Math.floor(Math.random() * mensagens.length)];
		return Response.json({ mensagem });
	} else {
		return Response.json({ mensagem: "Nenhuma mensagem disponível." });
	}
}

export async function POST(req: Request) {
	const { texto } = await req.json();
	await prisma.mensagem.create({ data: { texto: texto } });
	return Response.json({ status: 200 });
}
```

```schema.prisma

// CÓDIGO ACIMA

model Mensagem {
  id    Int     @id @default(autoincrement())
  texto String?
}

// Model utilizado no exemplo anterior

```

!!!
A primeira linha deste arquivo está importando o cliente do `prisma` que é um singleton. Veja o arquivo do singleton na aba `como 'instalar' o prisma?` na documentação. O `path` pode ser diferente dependendo da organização do projeto.
!!!
===

!!!
Em uma rota não pode conter uma `page` e um `route handler` ao mesmo tempo, pois haverá conflito e o `route handler` prevalecerá. Por isso, é recomendado criar um diretório `api` na rota para colocar o `route handler`.
!!!

## Interações via API

Podemos utilizar diferentes métodos para a busca de dados para formar a página do site, sendo eles `server-side` ou `client-side`. Normalmente, esses dados serão recebidos em formato `JSON`. Os dados podem vir de APIs existentes na internet ou de APIs internas alimentadas com o próprio banco de dados para `client components`, ou então podem vir de APIs externas ou diretamente do banco de dados para os `server components`.

!!!
Quando estiver fazendo essa busca utilize `async` e `await`, pois o programa tem que esperar a resolução da `Promise`.
!!!

### Server Side

Quando precisamos buscar dados para criar a página no lado do servidor, pode-se utilizar `fetch` ou `axios` para buscar por dados externos e uma função com busca direta no banco de dados para dados internos.

!!!
O next extende o `fetch` tornando o processo de `caching` automático, por outro lado, quando utilizar o axios ou os dados internos é necessário utilizar a função `cache` do `react`.
!!!

!!!
Os desenvolvedores do next não recomedam a utilização de `route handlers` em `server side`.
!!!

==- Exemplo com fetch

```tsx page.tsx
async function getData() {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");

	if (!res.ok) {
		throw new Error("Ocorreu um erro.");
	}
	return res.json();
}

export default async function Page() {
	const data = await getData().catch((err) => {
		alert(err);
	});

	return <div>{data?.abilities[0].ability.name}</div>;
}
```

===

==- Exemplo com dados internos
!!!
Model sendo utilizada:

```schema.prisma
model Mensagem {
  id    Int     @id @default(autoincrement())
  texto String?
}
```

!!!

```ts utils/mensagem.ts
import prisma from "../prisma/index";
import { cache } from "react";

type mensagem =
	| void
	| {
			id: number;
			texto: string | null;
	  }[];

export const getMensagens = cache(async () => {
	let mensagens = await prisma.mensagem.findMany().catch(console.log);

	return mensagens;
});
```

!!!
Cache não é necessário, mas ajuda na performance do código.
!!!

```tsx page.tsx
import { getMensagens } from "@/../utils/mensagem";

export default async function Page() {
	const mensagens = await getMensagens();
	return (
		<div>
			<h2>Mensagens:</h2>
			{mensagens?.map((msg) => {
				return <p>{msg.texto}</p>;
			})}
		</div>
	);
}
```

===

### Client Side

Quando precisar de dados no lado do cliente, poderão ser utilizados `fetch` e `axios` para buscar dados no servidor via `route handlers`.

!!!
Dados externos podem sofrer `caching` no servidor, então, pode ser uma boa ideia buscá-los no lado do servidor.
!!!

Criar funções para fazerem as buscas no `client-side` pode ser interessante, pois evita a repetição de código e deixa a leitura mais simples.

==- Exemplo de função

```ts mensagem.ts
export type Mensagem = {
	id: number;
	texto: string;
};

export async function getMensagemFetch(): Promise<{
	mensagem: Mensagem;
} | null> {
	const res = await fetch("http://localhost:3000/api");
	if (!res.ok) {
		return null;
	}
	return res.json();
}

export async function postMensagemFetch(texto: string) {
	const res = await fetch("http://localhost:3000/api", {
		method: "POST",
		body: JSON.stringify(texto),
	});
}
```

===
Os dados coletados podem ser utilizados do jeito que for necessário, como no exemplo abaixo:

==- Exemplo de client side

```tsx page.tsx
"use client"

import { getMensagem, postMensagem } from "../../clientApi/mensagem.ts"
import { useState } from "react";

export default function Page() {
  const [mensagem, setMensagem] = useState("");
  const [novaMensagem, setNovaMensagem] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setNovaMensagem(e.target.value);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		postMensagem(novaMensagem);
	}

  return (
  // Uso da api junto com useState
		<div>
			<p>Mensagem client-side: {mensagem}</p>
			<button
				type="button"
				onClick={async () => {
					await getMensagem().then((data) => {
						if (data) setMensagem(data.mensagem.texto);
					});
				}
			>
				Busque uma mensagem.
			</button>)

// Form para uso do POST
      <form onSubmit={handleSubmit}>
				<input
					onChange={handleChange}
					placeholder="Nova mensagem"
					name="mensagem"
				/>
				<button
					type="submit"
				>
					Criar mensagem
				</button>
			</form>
    </div>
}
```

===

## Interações via Server Actions

Outra forma interessante de realizar interações com o servidor é a `Server Action`. Com ela é possível criar componentes que fazem chamadas ao servidor para realizar alguma ação. Essas ações podem ser mudanças no banco de dados com validação feita no servidor, por exemplo.

### Criando uma Server Action

Para criar uma `Server Action` é necessário inserir a diretiva `"use server"` no início de uma função assíncrona. Nela será inserida a lógica que rodará no servidor. Aqui será explicada utilizando `Forms`. Se quiser aprender utilizando `useEffect` ou `event handlers` entre [aqui](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#non-form-elements).

Para conseguir acessar os dados do `Forms`, deverá ser adicionado um parâmetro `formData` do tipo `FormData` na função que define a `server action`. Depois, na tag `<form action={ServerAction}>` do forms, adicione a função criada no atributo `action`.

```tsx page.tsx
import prisma from "@/../prisma/index";
import { revalidatePath } from "next/cache";

export default async function Page() {
	const criarMensagem = async (formData: FormData) => {
		"use server";
		const texto = formData.get("texto");
		// Cria a mensagem no banco de dados
		await prisma.mensagem.create({
			data: {
				texto: texto as string,
			},
		});

		/*O revalidatePath atualiza a rota depois da modificação no banco de dados
		e aplica as modificações na página sem precisar de fazer um
		reload se a modificação for renderizada server-side. (Totalmente opcional) */
		revalidatePath("/");
	};

	const excluirMensagem = async (formData: FormData) => {
		"use server";

		const id = formData.get("id") as string; // Recebe o ID da mensagem

		await prisma.mensagem.delete({ where: { id: parseInt(id) } }); // Converte o ID de string para int e depois efetua a operação no BD

		revalidatePath("/");
	};

	const mensagens = await prisma.mensagem.findMany(); // Lendo as mensagens presentes no banco de dados.

	return (
		<div>
			<h2 className="text-black font-light">Mensagens</h2>
			{mensagens.map((msg) => {
				return (
					<form action={excluirMensagem} key={msg.id}>
						<input hidden name="id" value={msg.id} />
						<p className="text-black font-light">{msg.texto}</p>
						<button className="bg-slate-300 rounded-xl text-black disable:bg-slate-600">
							Excluir
						</button>
					</form>
				);
			})} {/* Inputs com tipo "hidden" podem ser utilizados para passar alguma
			informação para a server action. */}
			<div>
				<h2>Mensagens</h2>
				{mensagens.map((msg) => {
					return <p key={msg.id}>{msg.texto}</p>;
				})}
			</div>
			// Forms recebe a Server Action
			<form action={criarMensagem}>
				<h3>Crie uma mensagem</h3>
				<input name="texto" placeholder="Mensagem" required />
				<button>Enviar</button>
			</form>
		</div>
	);
}
```

!!!
A função `revalidatePath` possui uma interação interessante com o uso de `Server Actions`. Quando juntas elas podem criar certo grau de interatividade na página.
!!!

!!!
O uso de um `input` com atributo `hidden` pode ser útil quando precisar passar alguma informação para a `server action` que não será fornecida pelo usuário.
!!!
