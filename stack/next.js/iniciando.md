---
icon: tools
label: "Iniciando projeto"
order: 6
author:
  name: Matheus das Neves e Pedro Amorim
date: 2023-10-26
category: Instalação
---

# Criando um projeto Next

Next não é instalado de fato em sua máquina, é um conjunto de pacotes que são iniciados no momento em que um projeto Next é criado.

!!!
Requisitos:

- É necessário possuir uma versão igual ou superio a 18.17 do Node.js.
- São suportados macOS, Windows (incluindo WSL) e Linux.

!!!

## Configuração Automática

Na configuração automática, são feitas algumas perguntas no terminal pra configuração automática do framework. A configuração é feita na criação de um projeto next, para isso rode o comando no terminal:

```bash
pnpm create next-app
```

Após isso, serão feitas algumas perguntas no terminal:

```bash
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```

Para a pergunta nº:

1. Nome do projeto que irá ser feito.
2. Uso ou não de TypeScript no projeto.
3. Uso do ESLint, um analisador estático de código, que encontra problemas no código e alerta no editor de texto.
4. Uso do Tailwind CSS, a principal ferramenta de estilização usada em Next.js.
5. Opção do diretório `src/` na pasta raiz do projeto, mais uma opção de organização para separar a pasta do projeto dos arquivos de configuração.
6. Opção de tipo de roteamento usando Pages Router ou App Router (mais recente). Nessa documentação, será explicado os dois tipos de roteamento, no entanto, a parte de Pages Router pode ser ignorada, pois atualmente a empresa utiliza o App Router.
7. A sétima e última estão relacionadas, respectivamente, a customização e configuração de importações, para facilitar a importação de alguma utilidade entre os diretórios, são como se fossem atalhos para imports. Caso queira saber mais a fundo, clique [aqui](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases).
