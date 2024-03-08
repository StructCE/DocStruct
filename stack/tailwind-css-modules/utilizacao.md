---
order: 1
icon: rocket
label: "Utilização"
author:
    name: Eduardo P.P. Ferreira
date: 2024-03-07
category: Instalação
---

Essa página contém alguns exemplos de uso de Tailwind, mostrando algumas classes úteis e comuns.
Todos os exemplos podem ser encontrados [na documentação oficial](https://tailwindcss.com/docs/installation) (dê uma olhada na aba a esquerda da tela).

## Cores Pré-Definidas

[Tailwind conta com cores já definidas](https://tailwindcss.com/docs/customizing-colors) para utilizarmos em componentes. Como mencionado na seção de Instalação - [!ref Instalando Tailwind e CSS no Next](/tailwind-css-modules/instalacao.md), podemos obter um *auto-complete* por meio da extensão [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) para VSCode, o que facilita verificar quais cores estão disponíveis para uso.

Por padrão, Tailwind utiliza uma convenção para nomenclatura de suas cores: o nome da cor em si (red, green, etc.) seguido por uma escala numérica, onde 50 indica que a cor é clara e 900 que é escura.

A utilização dessas cores aparecem em várias classes diferentes do Tailwind, como em [textos](https://tailwindcss.com/docs/text-color), [cor do background](https://tailwindcss.com/docs/background-color), [de uma borda](https://tailwindcss.com/docs/border-color), etc. A sintaxe muda um pouco dependendo do componente utilizado, mas a convenção de nome das cores em si continua a mesma.

Como exemplo:

```html
<button class="bg-indigo-500 ...">
  Save changes
</button>
```

![Cor de Background de um Botão](/assets/exemplos/tailwindBgColor_example.png)

## Flexbox & Grid

Tailwind possui classes que permitem definir o comportamento de elementos HTML com a propriedade *flex* (*flexible*), ou seja, definir posicionamento, tamanho, etc.

[*Flex*](https://tailwindcss.com/docs/flex) possui propriedades que permitem alterar como um elemento muda de tamanho. Suas classes e definições em CSS são

`flex-1`
:   `flex: 1 1 0%;`

`flex-auto`
:   `flex: 1 1 auto;`

`flex-initial`
:   `flex: 0 1 auto;`

`flex-none`
:   `flex: none;`

[A documentação](https://tailwindcss.com/docs/flex) possui exemplos interativos de como essa propriedade age em um elemento.

As propriedades [*Grid*](https://tailwindcss.com/docs/grid-template-columns) permitem especificar o comportamento e organização de elementos em um layout estilos *grid*. Como exemplo da documentação, os utilitários *Grid Template Columns*:

```html
<div class="grid grid-cols-4 gap-4">
  <div>01</div>
  <!-- ... -->
  <div>09</div>
</div>
```

![Organização das colunas em um *grid*](/assets/exemplos/tailwindGrid_example.png)

Relacionada tanto a elementos flex quanto grid, [a propriedade *gap*](https://tailwindcss.com/docs/gap) permite definir o espaçamento entre os elementos. É possível controlar espaços verticais e horizontais separadamente ou ambos de uma vez.

```html Espaçamento Geral
<div class="grid gap-4 grid-cols-2">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

```html Espaçamentos Vertical e Horizontal Separados
<div class="grid gap-x-8 gap-y-4 grid-cols-3">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

## Media Query

*Media Queries* "são um recurso do CSS 3 que permite que a renderização do conteúdo se adapte a diferentes condições, como a resolução da tela." [Tailwind possui modificadores para design responsivo](https://tailwindcss.com/docs/hover-focus-and-other-states#media-and-feature-queries) em cada uma de suas classes. Como no exemplo da documentação, "isso renderizará uma grid de 3 colunas em dispositivos móveis, uma de 4 colunas em telas de largura média (`md`) e uma grid de 6 colunas em telas de largura grande(`lg`):"

```html
<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <!-- ... -->
</div>
```

Como outro exemplo, a [adição de imagens ao background](https://tailwindcss.com/docs/background-image#breakpoints-and-media-queries) - "Você também pode usar modificadores de variantes para direcionar media queries, como pontos de interrupção responsivos, modo escuro, preferência por movimento reduzido e muito mais.  Por exemplo, use `md:bg-gradient-to-r` para aplicar o utilitário `bg-gradient-to-r` apenas em tamanhos de tela médios e superiores."

```html
<div class="bg-gradient-to-l md:bg-gradient-to-r">
  <!-- ... -->
</div>
```

!!!info
Tailwind possui [uma página dedicada a documentar design responsivo](https://tailwindcss.com/docs/responsive-design) utilizando suas classes.
!!!
