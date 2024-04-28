---
order: 3
icon: question
label: 'O que é shadcn?'
author:
  name: Eduardo P.P. Ferreira
date: 2024-04-15
category: Explicação
tags:
  - user interface
  - components
  - explicacao
---

# O que é shadcn?

[shadcn](https://ui.shadcn.com/) é uma coleção de componentes e estilos já prontos que podemos utilizar em nossa aplicação.

A ideia é que uma coleção como essa diminui o trabalho que temos quando precisamos criar componentes do zero. Por exemplo, se quisermos criar um simples botão, podemos escrever seu código e aplicar estilos usando TailwindCSS. Mas, especialmente a parte de estilização, isso demanda certo tempo e iterações para criar um componente com um desgin e responsividade satisfatórios.

Com shadcn, essa tarefa é tão simples quanto rodar um comando para adicionar o botão ao projeto.

## shadcn não é uma biblioteca!

Como [a própria documentação](https://ui.shadcn.com/docs) explica, shadcn não é uma biblioteca de componentes. Não é algo que adicionamos ao projeto como uma dependência por meio de `npm` ou algum gerenciador de pacotes.

Na verdade, a shadcn é uma coleção de componentes que podemos utilizar em projetos, utilizamos esses componentes para basicamente construir a nossa própria biblioteca de componentes.

É possível usar shadcn em qualquer framework que suporte React. Dessa forma, é calro que podemos adicioná-lo a uma aplicação NextJS.
