---
order: 2
icon: question
label: 'Introdução'
author:
  name: Leonardo Côrtes
date: 2024-04-09
---

# Introdução a React Native

## O que é

React Native é um framework de desenvolvimento móvel que permite construir aplicativos nativos para iOS e Android usando JavaScript e React. Foi desenvolvido pelo Facebook e é uma extensão da biblioteca React, utilizada para criar interfaces de usuário (UI) em aplicações web.

O React Native tem uma comunidade ativa e oferece suporte a uma variedade de bibliotecas e ferramentas que facilitam o desenvolvimento, como o Expo, que simplifica tarefas como o acesso a recursos nativos do dispositivo e o desenvolvimento iterativo.

React Native é como React, mas usa componentes nativos ao invés de componentes da web como blocos de construção. O React Native traduz o código JavaScript em componentes nativos, usando uma abordagem chamada de "renderização nativa".

### Configuração

O React Native é instalado e configurado diretamente com o Expo no Tamagui, para isso siga os passos da documentação do [expo-tamagui](https://tamagui.dev/docs/guides/expo).

## React Native vs ReactJS

**React (React.js)** é uma biblioteca JavaScript utilizada para construir interfaces de usuário interativas em **aplicações web**.

- Segue o conceito de programação declarativa, onde os desenvolvedores descrevem como a interface deve parecer em diferentes estados da aplicação, e o React se encarrega de atualizar o DOM de forma eficiente.
- Usa JSX (JavaScript XML) para escrever componentes de interface de forma mais intuitiva, combinando **JavaScript com marcação HTML-like**.
- Pode ser utilizado para criar aplicações web completas, SPA (Single Page Applications) ou integrado com outras bibliotecas e frameworks.

**React Native** é um framework que permite desenvolver **aplicativos móveis nativos** (iOS e Android) usando JavaScript e React.

- Com o React Native, você pode criar aplicativos móveis com uma **base de código compartilhada entre as plataformas**, ao invés de desenvolver aplicativos separados para cada sistema operacional.
- Usa **componentes nativos**, o que significa que os aplicativos gerados têm uma aparência e desempenho nativos, não sendo simplesmente renderizados em uma webview.
- Apesar de compartilhar muitos conceitos com o React.js, o React Native possui componentes específicos para interagir com os recursos nativos dos dispositivos móveis, como câmera, GPS, acelerômetro, entre outros.
