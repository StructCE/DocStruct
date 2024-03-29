---
order: 2
icon: command-palette
label: "Instalando Tailwind e CSS no Next"
author:
  name: Eduardo P.P. Ferreira
date: 2024-02-28
category: Instalação
---

# Instalando Tailwind e CSS no Next

## Instalando TailwindCSS

Quando você cria um projeto Next utilizando o comando `npx create-next-app@latest`, aparecerá a opção `Would you like to use Tailwind CSS?`. Nesse caso, ao optar por `Yes`, Tailwind já será adicionado ao projeto.

Da mesma forma, ao criar um repositório com a stack que a Struct utiliza, [a T3](https://create.t3.gg), por meio do comando `npm create t3-app@latest`, a CLI mostrará algumas opções que você pode escolher, incluindo Tailwind. Se optar por utilizá-lo no projeto, T3 configurará tudo automaticamente.

```bash
npm create t3-app@latest
? What will your project be called? (my-t3-app)
$ my-t3-app
? Will you be using JavaScript or TypeScript?
$ TypeScript
> Good choice! Using TypeScript!
? Which packages would you like to enable?
$ nextAuth, prisma, tailwind, trpc
? Initialize a new git repository? (Y/n)
$ No
> Sounds good! You can come back and run git init later.
? Would you like us to run npm install? (Y/n)
$ Yes
> Alright. We'll install the dependencies for you!
```

Em ambos os casos, as configurações são feitas utilizando [app router](https://nextjs.org/docs/app), ao invés de _pages router_.

Caso você precise adicionar Tailwind manualmente, existem algumas formas, mas a mais simples é utilizar a CLI (Command Line Interface) do Tailwind.

Para [instalar Tailwind](https://tailwindcss.com/docs/guides/nextjs) usando sua CLI, use o seguinte comando no terminal:

```bash
npm install -D tailwindcss
```

Depois crie um arquivo chamado `tailwind.config.js` (ou `.ts`) por meio do comando `npx tailwindcss init` e adicione o seguinte código:

```typescript tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Aqui os caminhos dependerão se foi ou não escolhido o uso da pasta src no seu projeto
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
```

!!!info
O arquivo `tailwind.config.js` pode ter tanto essa extensão quanto `.ts`, dependendo se você quiser utilizar JavaScript ou TypeScript. Se você iniciou sua aplicação Next optando por usar TypeScript e Tailwind, o arquivo terá a extensão `.ts`. Se você criou o arquivo com o comando acima mas está utilizando TypeScript em seu projeto, talvez seja uma boa ideia mudar a extensão.
!!!

Por fim, adicione as _diretivas do Tailwind_ ao seu arquivo de CSS global (`src/app/globals.css`):

```css src/app/global.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

!!!info
O `global.css` é um arquivo que aplica estilos de maneira global à sua aplicação. Então, ao colocar essas diretivas nele, Tailwind estará disponível para ser utilizado em qualquer parte do seu projeto.
!!!

### Tailwind IntelliSense para VSCode

Como um adicional de instalação, se você estiver usando VSCode como sua IDE, é extremamente útil instalar a extensão [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss). Ela possui algumas features como auto-complete para os componentes Tailwind que você adiciona em seus componentes (aperte `ctrl + [espaço]` para abrir a lista de opções que você pode usar).

## Adicionando CSS Modules ao Projeto

Para utilizar CSS Modules em sua aplicação next, basta criar arquivos com a extensão `.module.css`. Isso pode ser feito em qualquer pasta dentro de `/app`, e os arquivos CSS Modules criados podem ser importados em qualquer outro arquivo dentro dessa pasta, como a [própria documentação](https://nextjs.org/docs/app/building-your-application/styling/css-modules) exemplifica:

```typescript app/dashboard/layout.ts
import styles from "./styles.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={styles.dashboard}> {children} </section>;
}
```

```css app/dashboard/styles.modules.css
.dashboard {
  padding: 24px, ...;
}
```

Lembrando que CSS Modules _são opcionais_ e atuam em escopo local, o que significa que podem evitar conflitos de nomeclatura de classes em arquivos de estilo diferentes.
