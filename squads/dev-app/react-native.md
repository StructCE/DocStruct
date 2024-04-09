---
order: 2
icon: assets/logos-tecnologias/react.png
label: 'React Native'
author:
  name: Leonardo Côrtes
date: 2024-04-09
---

# React Native

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

## Native Components

No desenvolvimento Android, você escreve views (divs) em Kotlin ou Java; no desenvolvimento iOS, você usa Swift ou Objective-C. Com React Native, você pode invocar essas views com JavaScript usando componentes React. Em tempo de execução, o React Native cria as views Android e iOS correspondentes para esses componentes. Como os componentes React Native são apoiados pelas mesmas views do Android e iOS, os aplicativos React Native têm aparência, comportamento e desempenho como qualquer outro aplicativo. Chamamos esses componentes apoiados pela plataforma de N**ative Components** (**componentes nativos**).

O React Native vem com um conjunto de componentes nativos essenciais e prontos para uso, esse comonentes são chamados de **Core Components** (**componentes principais**).

### Core Components

React Native possui muitos **core components** para tudo, desde controles até indicadores de atividade. Você pode encontrá-los todos documentados na [seção API](https://reactnative.dev/docs/components-and-apis). Esses são alguns dos componentes principais:

| Componente     | Android        | iOS              | Analogia a Web           | Descrição                                                                                                       |
| -------------- | -------------- | ---------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `<View>`       | `<ViewGroup>`  | `<UIView>`       | `<div>` (não scrollavel) | Um container que suporta layout com flexbox, estilização, algum manuseio de toque e controles de acessibilidade |
| `<Text>`       | `<TextView>`   | `<UITextView>`   | `<p>`                    | Exibe, estiliza, e aninha strings de texto e ainda lida com eventos de toque                                    |
| `<Image>`      | `<ImageView>`  | `<UIImageView>`  | `<img>`                  | Display de diferentes tipos de imagens                                                                          |
| `<ScrollView>` | `<ScrollView>` | `<UIScrollView>` | `<div>`                  | Container genérico scrollavel que pode ter múltiplos componentes e views                                        |
| `<TextInput>`  | `<EditText>`   | `<UITextField>`  | `<input type="text">`    | Permite ao usuário inserir texto                                                                                |

**Exemplo de utilização**:

```ts
import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';

const App = () => {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{ uri: 'https://reactnative.dev/docs/assets/p_cat2.png' }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
};

export default App;
```
