---
order: a
icon: home
label: "Primeiros passos"
author:
  - name: Willyan Marques
    avatar: ../../assets/membros/gata_do_will.png
date: 2024-04-04
category: Bibliotecas
tags:
  - Bibliotecas
  - Imagem
  - Upload
  - Nuvem
---

!!!warning
A documentação a seguir supõe que você já está utilizando um projeto com Next.js App Router
!!!

# Primeiros Passos

## O que é o Cloudinary?

Cloudinary é uma plataforma em nuvem para gerenciamento de imagens e vídeos. Ela atua inúmeros serviços de imagens e vídeos, como upload e armazemento, otimização e transformações com IA.

Uma das vantagens desse serviço é a possibilidade de integração com diversas stacks e os diversos componentes e funcionalidades oferecidos de maneira simples aos desenvolvedores. Além disso, também podemos utilizar o serviço gratuitamente a partir de um plano gratuito de nuvem.

Nessa documentação abordaremos apenas as funcionalidades principais de upload, fetching e otimização de imagens para o Next App Router. Caso você tenha interesse em outros serviços oferecidos, acesse a [documentação oficial da Cloudinary](https://next.cloudinary.dev/).

## Setup

### Instalação

Para instalar a biblioteca do Cloudinary no seu projeto next, utilize o comando abaixo na raiz do seu repositório.

+++ NPM

```bash
npm install next-cloudinary
```

+++ PNPM

```bash
pnpm install next-cloudinary
```

+++ YARN

```bash
yarn add next-cloudinary
```

+++

Para você conseguir utilizar a biblioteca no seu projeto, primeiro você precisará criar uma nuvem para armazenar seus arquivos. No plano gratuito, você tem direito a utilizar até **25GB de espaço** na sua nuvem.

### Criando uma nuvem

Caso você esteja utilizando o Cloudinary pela primeira vez, [acesse o site deles e crie uma conta](https://cloudinary.com/). Você terá acesso imediato a um ambiente de gerenciamento da sua nuvem, onde você pode ver um guia de instalação para diversas stacks.

Procure pelo seu dashboard de nuvem, onde você poderá ver várias informações sobre a sua nuvem como o nome dela e suas chaves de API.

### Cloudinary endpoint

Antes de conseguir utilizar os serviços da nuvem, você precisa definir uma rota api pra integrar o seu projeto com a nuvem.
Primeiro, você deve acessar o arquivo `.env` do seu repositório e colocar as informações da sua nuvem presentes no seu dashboard no site da Cloudinary.

```javascript .env
//...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "<Cloud name>";
NEXT_PUBLIC_CLOUDINARY_API_KEY = "<API key>";
CLOUDINARY_API_SECRET = "<API secret>";
```

Para configurar o endpoint, crie uma pasta nomeada `cloudinary` (qualquer nome serve) dentro de `src/app/api`, crie um arquivo `route.ts` e adicione a definação do método POST para uploads de arquivos:

```typescript src/app/api/cloudinary/route.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return Response.json({ signature });
}
```
