---
order: 3
icon: cache
label: "Renderização, Caching e Otimizações"
author:
    name: "Pedro Amorim de Gregori"
category: Explicação
date: 2024-02-20
---

## Renderização

A renderização de aplicações next ocorrem tanto em `server-side` quanto em `client-side`, desse modo, a UI criada pode ser beneficiada com `caching` e `interatividade`, por exemplo.

### Server Components

Os `server components` são utilizados para renderização de UI no lado do servidor e podem ser beneficiados com `caching`.

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

Por padrão, o next coloca pedaços estáticos de páginas e resultados de `fetch` no `cache`. Contudo, é possível manipular se algo irá para `cache` ou não, quanto tempo permancerá em `cache` e até atualizar o `cache` após certo evento. Para isso, poderão ser utilizados diferentes métodos como `cache()`, `revalidatePath()` e configurações de rota, por exemplo.

### Server Cache

#### Fetch

Resultados recebidos pelo `fetch`, quando utilizado o `server side`, são memorizados até que o componente seja renderizado, por padrão, mas podem ser ajustados passando mais parâmetros para a função.

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

A função `revalidatePath` é bem interessante quando alguma rota precisa sofrer alguma atualização devido a um evento.

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

Uma rota estática pode ser forçada a ser dinâmica ou pode receber um tempo entre revalidações recebendo "atributos". Para forçar a página a ser dinâmica, é preciso colocar a linha `export const dynamic = "force-dynamic";` e para revalidar, é necessário adicionar `export const revalidate = 3600; // tempo em segundos`.

!!!
Se quiser obrigar um componente ser dinâmico, mas não quer forçar a rota junto poderá ser utilizado o `noStore` no componente específico.

==- Exemplo
```tsx src/component/ComponenteDinamico.tsx
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/../prisma/index";

export default async function ComponenteDinamico() {
	noStore();
	const mensagens = await prisma.mensagem.findMany();
	return (
		<>
			{mensagens.map((mensagem) => {
				return <p key={mensagem.id}>{mensagem.texto}</p>;
			})}
		</>
	);
}
```
===
!!!

## Otimizações

O next apresenta otimizações `built-in` para melhorar a velocidade da aplicação e as [métricas da web](https://web.dev/articles/vitals?hl=pt-br). As `Images`, `Fonts` e `Metadata` serão abordadas nesse tópico. Para mais recursos de otimização acesse [_optimizing_](https://nextjs.org/docs/app/building-your-application/optimizing).

### Imagens

O next tem um componente chamado `Image` que extende a funcionalidade da `img` do html. Esse componente otimiza
o tamanho do arquivo de imagem, promove estabilidade visual e utiliza `lazy loading`.

O componente automaticamente converte a imagem para formatos modernos de imagem como `WebP` e `AVIF`.

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

As `google fonts` podem ser importadas no next e utilizadas sem nenhuma configuração em outro arquivo.

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
