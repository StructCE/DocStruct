---
order: b
icon: image
label: "Usando imagens"
author:
  - name: Willyan Marques
    avatar: ../../assets/membros/gata_do_will.png
date: 2024-04-05
category: Bibliotecas
tags:
  - Bibliotecas
  - Imagem
  - Upload
  - Nuvem
---

# Usando imagens da nuvem

Agora que você consegue enviar e armazenar suas imagens na nuvem, você deve estar se perguntando: **_como diabos vou colocar essas imagens na minha página?_**
E a resposta é simples, você só precisa utilizar o componente `CldImage` fornecido pela biblioteca.

Esse componente oferece uma maneira fácil de exibir imagens do Cloudinary da mesma forma que você faria utilizando o `Image` do Next.js. Ele funciona como um wrapper do `Image` e por isso possui todas funcionalidades deste além daquelas oferecidas pelo serviço.
Para utilizar o `CldImage` você precisa de 4 props básicas: `width`, `height`, `src` e `alt`.

Dentro do `src` é onde você irá passar o id público (`publicId`) que você definiu durante o upload da sua imagem na nuvem. Obviamente, você precisará determinar padrões de armazenamento para conseguir acessar essas imagens de forma dinâmica com dados da página ou do banco de dados.

```node src/generic/page.tsx
"use client";
import { CldImage } from "next-cloudinary";

<CldImage
  width="960"
  height="600"
  src="<Public ID>"
  sizes="100vw"
  alt="Descrição da imagem"
/>;
```

Caso você tenha interesse sobre a responsividade de imagens, acesse a [documentação do cloudinary](https://next.cloudinary.dev/guides/responsive-images) ou a [documentação do next](https://nextjs.org/docs/app/api-reference/components/image)
