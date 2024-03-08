---
order: 4
icon: apps
label: "Guia App routing"
author:
    name: "Pedro Amorim de Gregori"
category: Explicação
date: 2024-02-20
---

# Guia de desenvolvimento Next utilizando App Router

## Introdução

O `App Router` foi introduzido na versão 13 do next.js e foi construído utilizando o `React Server Components (RSCs)`.

O `App Router` trabalha com o diretório app para a criação de rotas que podem ou não ser de acesso público. Por padrão, componentes deste diretório são `RSCs`. As páginas são criadas nas rotas e irão herdar certas características definidas por arquivos especiais, como `navbar` e `footer`, definidos no arquivo `layout.tsx` da rota.

!!!
Para mais informações, acesse [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components).
!!!

!!!
O App Router não trabalha exclusivamente com `server components. Se for necessário o uso de `client components`, adicione a linha `"use client"` no topo do arquivo da página.
!!!

## Roteamento

### Definindo rotas

O next utiliza um sistema de roteamento baseado no sistema de arquivos. Desse modo, os diretórios são utilizados para criar as rotas que levarão a outros diretórios ou arquivos filhos e os arquivos são utilizados para definir a página da rota correspondente.
{.list-icon}

==- Exemplo de rota

-   :icon-file-directory: pai
    -   :icon-file-directory: exemplo
        -   :icon-file-code: page.tsx

URL será: `site.com/pai/exemplo`

===

#### Rotas dinâmicas

As rotas dinâmicas são utilizadas quando é necessário a utilização de segmentos de dados que variam, mas são importantes para a implementação da página. Elas podem ser "declaradas" utilizando os `[]` e utilizadas no código ao serem passadas como parâmetros da função da página, layout, etc.

==- Exemplo de rotas dinâmicas

-   :icon-file-directory: [slug]
    -   :icon-file-directory: exemplo
        -   :icon-file-code: page.tsx

```tsx page.tsx
export default function page({ params }: { params: { slug: string } }) {
	return <h1> Olá, {params.slug}! </h1>;
}
```

URL poderá ser: `site.com/pedro/exemplo` resultando em uma página com um \<h1> `Olá, pedro!`.

===

#### Grupo de rotas

É possível criar um diretório para agrupar certas rotas sem que o nome agregue na URL, só é necessário utilizar o `()` no nome do diretório.

==- Exemplo de grupo de rotas

-   :icon-file-directory: (pai)
    -   :icon-file-directory: exemplo
        -   :icon-file-code: page.tsx

URL será: `site.com/exemplo`

===

!!! Diretórios privados

Diretórios podem ser criados para organizar arquivos sem serem considerados rotas. Para isso, o nome do diretório deve começar com uma `_`.
!!!

### Convenção de arquivos

Os arquivos apresentam uma certa nomenclatura a ser usada para a criação da UI. Sendo as principais:

-   [Page](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages): Esse arquivo define a UI da rota e a deixa o acesso público.
-   [Layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts): Define uma estrutura padrão para as páginas pertencentes a rota. Por exemplo, configurações de metadados e componentes que são utilizados em múltiplas páginas dessa rota.
-   [Loading](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states): Define a UI da rota, enquanto a página principal não estiver completa. Dependendo do design pode ser utilizada uma página esqueleto, uma barra de loading ou o que vier de sua imaginação, desde que a página de loading não fique muito pesada, desse modo, causando problemas de performance.

!!!
Esses arquivos deverão ser da extensão `.js`, `.jsx` ou .`tsx`. Dê preferência ao uso da extensão `.tsx`(TypeScript).

Para mais informações procure na [documentação do next](https://nextjs.org/docs/app/building-your-application/routing#file-conventions).
!!!

### Criando páginas e layouts

As páginas são arquivos com o nome `page.tsx` que apresentam a estrutura do React e vão desempenhar o papel de criar UIs especificas a determinada rota. Elas tornam a rota acessível para visitantes e por padrão são `Server Components`.

```tsx page.tsx
export default function Page() {
	return <h1>Página de exemplo.</h1>;
}
```

!!!
As páginas não são exclusivamente `Server Components`, elas podem ser `Client Components` ou podem ser híbridas. Para transformar um componente em `Client Component` é necessário adicionar `"use client"` no início do arquivo. Os arquivos híbridos são arquivos server components que englobam client components.

==- Client Component

```tsx page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function page() {
	const router = useRouter();

	return (
		<button type="button" onClick={() => router.push("/")}>
			Home
		</button>
	);
}
```

===
!!!

Os layouts são arquivos com o nome `layout.tsx` que apresentam estrutura do React e vão agregar nas UIs de múltiplas rotas. Elas não criam rotas públicas e acumulam seguindo a hierarquia de rotas. Componentes de layout devem receber o `react prop` `children` que será a página do arquivo `page.tsx` da rota.

```tsx layout.tsx
export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return {
    <div>Eu sou uma navbar diferenciada, confia!</div>

    { children }

    <div>E eu sou um footer bem interessante.</div>
    }
}
```

!!! Metadados
Os metadados de uma página devem ser alterados utilizando a [APIs de metadados do next.](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) Por questões de performance, não utilize `<head>`.

```tsx page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Hack do dinheiro infinito",
};

export default function Page() {
	return "...";
}
```

!!!

### Hierarquia dos componentes

O next renderiza os arquivos especiais, vistos anteriormente, seguindo uma ordem especifica. Sendo essa, para os arquivos principais:

=== Ordem de hierarquia
Layout -> Loading -> Page
===

Se a rota for aninhada, a hierarquia ocorrerá juntando componentes da rota pai com as do filho, como o exemplo a seguir:

=== Ordem de hierarquia com aninhamento

-   :icon-file-directory: pai
    -   :icon-file-directory: exemplo
        -   :icon-file-code: page.tsx

A hierarquia será:
Layout (Pai) -> Loading (Pai) -> Layout (Exemplo) -> Loading (Exemplo)-> Page
===

!!!
Uma rota é publicamente acessível somente se existir um arquivo do tipo `page.tsx` ou `route.ts`.
!!!

!!!
Para padrões avançados de roteamento, como Rotas em paralelo ou interceptação de rotas, veja _[Advanced Routing Patterns](https://nextjs.org/docs/app/building-your-application/routing#advanced-routing-patterns)_
!!!

### Navegação entre rotas

Por motivos de performance, ao utilizar o next sempre utilize o componente built-in do next `<Link>` ao invés do `<a>` quando quiser criar navegação entre rotas no "HTML".

!!!
Para utilizar o `<Link>` é necessário o preenchimento da propriedade `href`.
!!!

==- Exemplo de Link

```tsx page.tsx
import Link from "next/link";

export default function page() {
	return (
		<div>
			<Link href="/profile">Perfil</Link>
			<Link href="/">Página inicial</Link>
		</div>
	);
}
```

===

Dependendo do contexto, nem sempre é possível utilizar um componente para realizar essa navegação. Desse modo,
a utilização do [hook](https://nextjs.org/docs/app/api-reference/functions/use-router) `useRouter` para `client components` ou da [função](https://nextjs.org/docs/app/api-reference/functions/redirect) `redirect` para `server components` pode solucionar esse problema.

==- Exemplo de useRouter

```tsx page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function page() {
	const router = useRouter();

	return (
		<button type="button" onClick={() => router.push("/")}>
			Home
		</button>
	);
}
```

===

==- Exemplo de redirect

```tsx page.tsx
import { redirect } from "next/navigation";

export default function page() {
	return (
		<button type="button" onClick={() => redirect("/")}>
			Home
		</button>
	);
}
```

===

!!!
Para mais informações, acesse [redirecionamento](https://nextjs.org/docs/app/building-your-application/routing/redirecting).
!!!

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

Outra forma interessante de realizar interações com o servidor é a `Server Action`, com ela é possível criar componentes que fazem chamadas ao servidor para realizar alguma ação. Essas ações podem ser mudanças no banco de dados com validação feita no servidor, por exemplo.

### Criando uma Server Action

Para criar uma `Server Action` é necessário inserir a diretiva `"use server"` no início de uma função assíncrona, nela será inserida a lógica que rodará no servidor. Aqui será explicada utilizando `Forms`, se quiser aprender utilizando `useEffect` ou `event handlers` entre [aqui](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#non-form-elements).

Para conseguir acessar os dados do ´Forms´, deverá ser adicionado um parâmetro `formData` do tipo `FormData` na função que define a `server action`. Depois, na tag `<form action={ServerAction}>` do forms adicione a função criada no atributo `action`.

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

	const excluirMensagem = async (id: number) => {
		"use server";
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
A função `revalidatePath` possui uma interação interessante com o uso de `Server Actions`, quando juntas elas podem criar certo grau de interatividade na página.
!!!

!!!
O uso de um `input` com atributo `hidden` pode ser útil quando precisar de passar alguma informação para a `server action` que não será fornecida pelo usuário.
!!!

## Renderização

A renderização de aplicações next ocorrem tanto em `server-side` quanto em `client-side`, desse modo, a UI criada pode ser beneficiada com `caching` e `interatividade`, por exemplo.

### Server Components

Os `server components` são utilizados para renderização de UI no lado do servidor e podem sofrer `cache`.

#### Benefícios

-   Redução de requisições que o cliente precisa fazer para o banco de dados do servidor quanto para dados externos.

-   Maior segurança de dados sensíveis.

-   UI e requisições podem ser reutilizadas.

-   Pacotes menores a serem trafegados pela internet.

-   Melhora do site para o `Search Engine Optimization`.

-   Permite a entrega de partes renderizadas da página, assim, reduzindo o efeito de espera.

#### Criando um Server Component

Por padrão, os componentes criadas são `server components` e não necessitam de nenhuma adição ao código, no entanto, não é possível criar interatividade utilizando `hooks` diretamente em um `server component`. Para isso, poderá ser criado um `client component` que será um membro do `server component`.

#### Estratégias de renderização do servidor

-   Renderização estática (Padrão): As rotas são renderizadas em `build time` ou `"run time"` após um revalidação de dados. Permite que o resultado sofra `cache` e possa ser distribuído por uma `Content Delivery Network`. Muito útil quando não é necessário a utilização de dados do usuário ou quando os dados são conhecidos em `build time`.

-   Renderização dinâmica: As rotas são renderizadas em `request time`. Ela é dependente de dados como `cookies`, `headers` e `search params`. Ela ocorre quando alguma função precisa dos dados citados ou quando é necessária a requisição de dados `uncached`.

!!!
As páginas não são sempre completamente estáticas ou dinâmicas. Elas podem ser um espectro das duas.
!!!

-   Streaming: As partes da página são entregues quando são renderizadas e não quando a página é renderizada por completo, garantindo mais fluidez na construção da UI.

### Client Components

Os `client components` são pré renderizadas no servidor e possibilitam a utilização de javascript no navegador do usuário.

#### Benefícios

-   Interatividade pode ser construída com a utilização de `states`, `effects` e `event listeners`.

-   É possível utilizar APIs de browser.

#### Criando um Client Component

Para criar um `client component` é necessária a presença da diretiva `"use client"` no ínicio do arquivo. Desse modo, os módulos importados irão fazer parte do `client bundle`. Sem a diretiva, ao tentar utilizar um `hook`, por exemplo, ocorrerá um erro.

### Padrões de uso

=== Server components

-   Busca de dados externos

-   Acesso direto ao banco de dados

-   Utilização de dados sensíveis (Chaves de API, Tokens, ...)

===

=== Client components

-   Uso de `event listeners` (`onClick`, `onChange`)

-   Uso de `state` e `effect` (`useState`, `useEffect`)

-   Uso de APIs do navegador

===

## Caching

!!!
Tópico não necessário para a produção de aplicações next.

O next apresenta diferentes tipos de `cache` que poderão ser vistos na [documentação](https://nextjs.org/docs/app/building-your-application/caching).

Se o cache for mal feito, a página pode conter erros como dados desatualizados.
!!!

Por padrão, o next coloca pedaços estáticos de páginas e resultados de `fetch` no `cache`, contudo, é possível manipular se algo irá para `cache` ou não, quanto tempo permancerá em `cache` e até atualizar o `cache` após certo evento. Para isso, poderão ser utilizados diferentes métodos como `cache()`, `revalidatePath()` e configurações de rota, por exemplo.

### Server Cache

#### Fetch

Resultados recebidos pelo `fetch`, quando utilizado `server side` são memorizados até que o componente seja renderizado, por padrão, mas podem ser ajustados passando mais parâmetros para a função.

É possível não gerar cache utilizando:

```tsx page.tsx
fetch("url", { cache: "no-store" });
```

É possível "setar" um tempo, em segundos, para revalidar a informação utilizando:

```tsx page.tsx
fetch("url", { next: { revalidate: 3600 } }); // Revalida a cada 1 hora
```

### React cache

Se alguma informação faz sentido ser memorizada, mas não é automaticamente, ela pode ir pra cache utilizando a função `cache` do react.

Abaixo tem um exemplo com uma busca no banco de dados:

```ts getItens.ts
import { cache }
import prisma from "../prisma/index"

export const getItens = cache(async () => {
	const itens = await prisma.item.findMany()
	return itens
})
```

### revalidatePath

A função revalidatePath é bem interessante quando alguma rota precisa de sofrer alguma atualização devido um evento.

Exemplo com server action:

```tsx page.tsx
export default async function Page() {
	const criarItem = async (formData: FormData) => {
		// Lógica por trás

		revalidatePath("path");
	};

	const itens = prisma.item.findMany();

	// return da página
}
```

### Configurações de rota

Uma rota estática pode ser forçada a ser dinâmica ou pode receber um tempo entre revalidações recebendo "atributos". Para forçar a página a ser dinâmica, é preciso colocar a linha `export const dynamic = "force-dynamic";` e para revalidar é possível adicionando `export const revalidate = 3600; // tempo em segundos`.

### Client cache

O next cria um `cache` de rotas no navegador do usuário. Se esse `cache` estiver atrapalhando alguma funcionalidade, poderá ser utilizada a função `router.refresh()` do hook `useRouter`.

## Optimizações

O next apresenta optimizações `built-in` para melhorar a velocidade da aplicação e as [métricas da web](https://web.dev/articles/vitals?hl=pt-br). As `Images`, `Fonts` e `Metadata` serão abordadas nesse tópico, para mais recursos de optimização acesse [optimizações](https://nextjs.org/docs/app/building-your-application/optimizing).

### Imagens

O next tem um componente chamado `Image` que extende a funcionalidade da `img` do html. Esse componente optimiza
o tamanho do arquivo de imagem, promove estabilidade visual e utiliza `lazy loading`.

O componente automaticamente converte a imagem para formatos modernos de imagem como `WebP` e `ÀVIF`.

#### Imagens locais

Para utilizar uma imagem que está armazenada localmente, importe a imagem com um nome qualquer e o componente `Image` do next. Quando for utilizar o componente, será necessário o preenchimento da `src` com o nome importado e do `alt`.

```tsx page.tsx
import Image from "next/image";
import minhaImagem from "@/../public/Screenshot_14.png;

export default function Page() {
	return (
		<Image
			src={minhaImagem}
			alt="Texto alternativo"
            // width={500}
            // height={500}
            // blurDataURL="data:..."
            // placeholder="blur" //
		/>
	);
}
```

#### Imagens remotas

Para imagens armazenadas remotamente, será necessário preencher os campos de `src`, `alt`, `width` e `height`. Além disso, o next precisa de uma modificação no arquivo `next.config.mjs` para permitir o uso de imagens externas.

A `src` deve ser preenchida com a string de uma URL.

```js next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "Nome do host",
				port: "Se necessário, especificar a porta",
				pathname: "Caminho até a imagem",
			},
		],
	},
};

export default nextConfig;
```

```tsx page.tsx
import Image from "next/image";

export default function Page() {
	return (
		<Image
			src="alguma_url"
			alt="Texto alternativo"
			width={500}
			height={500}
		/>
	);
}
```

!!!
Para gerar prioridade a uma imagem, adicione a propriedade `priority` a ela.
!!!

### Fontes

!!!
Se estiver usando tailwind no projeto, acesse [com TailWind](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css)
!!!

As `google fonts` podem ser importadas do next e utilizadas sem nenhuma configuração em outra arquivo.

É recomendado o uso de [fontes variáveis](https://fonts.google.com/variablefonts), pois apresentam melhor performance e flexibilidade.

=== Exemplo com fontes variáveis

```tsx layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.className}>
			// A fonte será aplicado a rota inteira.
			<body>{children}</body>
		</html>
	);
}
```

=== Exemplo com fontes não variáveis

```tsx layout.tsx
import { Roboto } from "next/font/google";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={roboto.className}>
			<body>{children}</body>
		</html>
	);
}
```

!!!
É necessário informar o `weight`.
!!!
===

### Metadados

Os metadados podem ser gerenciados utilizando a API do next que substitui as tags `meta` e `link` do html.

A API [Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields) possui vários campos que podem ser preenchidos.

Ela pode ser utilizada tanto em `layout.tsx` para aplicar na rota toda quanto em `page.tsx` para a página especifica.

```tsx page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Título do site",
	description: "Descrição do site",
};

export default function Page() {}
```
