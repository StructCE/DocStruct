---
icon: star
label: Tamagui
order: 1
date: 2024-04-27
author:
  name: Guilherme Sampaio
---

# Tamagui

## O que é

Tamagui acelera o processo de desenvolvimento contendo componentes prontos para Android e iOS. Ele se concentra na saída nativa da plataforma, com um compilador de otimização opcional que melhora significativamente o desempenho do seu aplicativo ou site.

Para mais detalhes leia a documentação em: [tamagui.dev/docs/intro/introduction](https://tamagui.dev/docs/intro/introduction)

## Configuração e Instalação

Há várias formas de instalar Tamagui em nosso projeto ou adicionar, mas como estaremos trabalhando com o Expo vamos instalar com a seguinte configuração:

Com o npm instalado em seu computador, instale o yarn globalmente, pois yarn é o gerenciador de dependências padrão do expo:

```
npm i -g yarn
```

Para verificar a versão instalar execute

```
yarn -v
```

Após instalar o yarn, faça a criação de seu projeto em cima de um templete com Expo e Tamagui usando o comando abaixo:

```
npm create tamagui@latest --template project_name
```

Ao rodar o comando será solicitado algumas opções para configuração do projeto.

Escolha a opção:

:::sample

<p>Free - Expo + Next in a production ready monorepo</p>
:::

E pronto, projeto instalado!

Agora vá até o diretório onde foi instalado o projeto e na raiz do projeto execute:

```
yarn install
```

## Estilização

## Componentes disponibilizados

<style>
    .sample {
        text-align: center;
        color: #1956AF;
        border-radius: 10px;
        background-color: #E1EDFF;
        border: 1px solid #1956AF;
        padding-top: 20px;
        margin-bottom: 20px;
        max-width: 50%;
    }
</style>
