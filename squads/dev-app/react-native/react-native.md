---
order: 2
icon: ../../assets/dev-app/react.png
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

No desenvolvimento Android, você escreve views (divs) em Kotlin ou Java; no desenvolvimento iOS, você usa Swift ou Objective-C. Com React Native, você pode invocar essas views com JavaScript usando componentes React. Em tempo de execução, o React Native cria as views Android e iOS correspondentes para esses componentes. Como os componentes React Native são apoiados pelas mesmas views do Android e iOS, os aplicativos React Native têm aparência, comportamento e desempenho como qualquer outro aplicativo. Chamamos esses componentes apoiados pela plataforma de **Native Components** (**componentes nativos**).

O React Native vem com um conjunto de componentes nativos essenciais e prontos para uso, esse comonentes são chamados de **Core Components** (**componentes principais**).

### Core Components

React Native possui muitos **core components** para tudo, desde controles até indicadores de atividade. Você pode encontrá-los todos documentados na [seção de Componentes e API](https://reactnative.dev/docs/components-and-apis). Esses são alguns dos componentes principais:

| Componente     | Android        | iOS              | Analogia a Web           | Descrição                                                                                                       |
| -------------- | -------------- | ---------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `<View>`       | `<ViewGroup>`  | `<UIView>`       | `<div>` (não scrollavel) | Um container que suporta layout com flexbox, estilização, algum manuseio de toque e controles de acessibilidade |
| `<Text>`       | `<TextView>`   | `<UITextView>`   | `<p>`                    | Exibe, estiliza, e aninha strings de texto e ainda lida com eventos de toque                                    |
| `<Image>`      | `<ImageView>`  | `<UIImageView>`  | `<img>`                  | Display de diferentes tipos de imagens                                                                          |
| `<TextInput>`  | `<EditText>`   | `<UITextField>`  | `<input type="text">`    | Permite ao usuário inserir texto                                                                                |
| `<Button>`     | `<EditText>`   | `<UITextField>`  | `<button">`              | Botão básico que deve funcionar bem em qualquer plataforma. Suporta um nível mínimo de personalização.          |
| `<ScrollView>` | `<ScrollView>` | `<UIScrollView>` | `<div>`                  | Container genérico scrollavel que pode ter múltiplos componentes e views                                        |

**Exemplo de utilização:**

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

## Código Específico de Plataforma

Quando criando um app, podem surgir casos onde você deseja ter componentes visuais diferentes para Android e iOS, para facilitar esse processo o React Native oferece duas maneiras de organizar o código e separá-lo por plataforma:

- Usando [extensões de arquivo específicas de plataforma](https://reactnative.dev/docs/platform-specific-code#platform-specific-extensions).
- Usando o [módulo Platform](https://reactnative.dev/docs/platform-specific-code#platform-module).

Alguns componentes podem ter propriedades que funcionam apenas em uma plataforma. Todos esses props são denotados com `@platform` e possuem um pequeno emblema próximo a eles no site.

### Extensões Específicas de Plataforma

Quando o código específico da plataforma for mais complexo, considere dividir o código em arquivos separados. O React Native detectará quando um arquivo tiver um .ios. ou .android. extensão e carregue o arquivo de plataforma relevante quando necessário de outros componentes.

Por exemplo, digamos que você tenha os seguintes arquivos em seu projeto:

```
BigButton.ios.js
BigButton.android.js
```

Você então pode importá-los assim:

```ts
import BigButton from './BigButton';
```

O React Native vai automaticamente pegar o arquivo correto com base na plataforma rodando.

### Módulo Platform

O React Native fornece um módulo que detecta a plataforma na qual o aplicativo está sendo executado. Você pode usar a lógica de detecção para implementar código específico da plataforma. Use esta opção quando apenas pequenas partes de um componente forem específicas da plataforma.

```ts
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 200 : 100,
});
```

`Platform.OS` será `ios` quando rodando em iOS e `android` quando rodando em Android.

Também existe um método `Platform.select` disponível que, dado um objeto onde as chaves podem ser `'ios' | 'android' | 'native' | 'default'`, retorna o valor mais adequado para a plataforma em que você está executando atualmente. Se você estiver rodando em um celular, as teclas iOS e Android terão preferência. Se não forem especificadas, a chave nativa será usada e depois a chave padrão.

```ts
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      },
      default: {
        backgroundColor: 'blue', // outras plataformas (web)
      },
    }),
  },
});
```

Isso resultará em um contêiner com `flex: 1` em todas as plataformas, uma cor de fundo vermelha no iOS, uma cor de fundo verde no Android e uma cor de fundo azul em outras plataformas.

Como aceita qualquer valor, você também pode usá-lo para retornar componentes específicos da plataforma, como abaixo:

```ts
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();

<Component />;
```

#### Detectando a Versão Android

O módulo `Plataform` também pode ser usado para detectar a versão da plataforma Android na qual o aplicativo está sendo executado:

```ts
import { Platform } from 'react-native';

if (Platform.Version === 25) {
  console.log('Running on Nougat!');
}
```

#### Detectando a Versão iOS

No iOS, a `Version` é resultado de `-[UIDevice systemVersion]`, que é uma string com a versão atual do sistema operacional. Um exemplo de versão do sistema é "10.3". Por exemplo, para detectar o número da versão principal no iOS:

```ts
import { Platform } from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log('Work around a change in behavior');
}
```
