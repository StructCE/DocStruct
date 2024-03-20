---
order: a
icon: home
label: "Primeiros passos"
author:
  - name: João Santos
  - name: Willyan Marques
    avatar: ../assets/membros/gata_do_will.png
date: 2024-02-28
category: Implementação
tags:
  - NextAuth
  - instalação
  - Next.js
  - autenticação
  - usuário
---

!!!warning
**Atenção!! A documentação a seguir assume que você está utilizando o _App Router_ do Next.js**
!!!

# Primeiros Passos

## NextAuth

Essa documentação foi desenvolvida assumindo que o leitor tem familiaridade com os conceitos básicos de Next, se não for o caso consulte o DocStruct de [Next.js](TODO) para qualquer dúvida.

O [Next Auth](https://next-auth.js.org/) é uma biblioteca de autenticação para projetos desenvolvidos com o framework Next.js.
Essa biblioteca facilita a implementação de autenticação de usuário vindos de um back-end já existente (autenticação por terceiros, por exemplo). É possível utilizar credenciais, como e-mail e senha, mas a biblioteca dá maior foco ao OAuth, fornecida pelo Google, GitHUb, etc. garantindo a segurança e facilitando a implementação.

Para acessar a documentação de instalação e implementação do Next Auth, clique [Aqui](implementacao.md).

!!!

## Instalação

Para adicionar o `NextAuth` a um projeto `Next.js` basta acessar a raiz do repositório pelo terminal e executar um dos comandos abaixo de acordo com o gerenciador de pacotes sendo utilizado:

+++ NPM

```bash
npm install next-auth
```

+++ PNPM

```bash
pnpm add next-auth
```

+++ YARN

```bash
yarn add next-auth
```

+++
