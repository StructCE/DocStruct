---
order: 2
icon: command-palette
label: "Instalação"
author:
    name: Matheus das Neves Fernandes
date: 2024-03-15
category: Instalação
tags:
    - data validation
    - instalação
---

# Instalando Zod

## Stack T3

A T3 Stack inclui Zod como uma de suas bibliotecas, caso você decida fazer um projeto T3 você poderá adicionar Zod simplesmente quando for rodar o `create t3-app@latest` e responder corretamente quando for perguntado sobre a utilização do Zod no seu projeto.

<br>

## Instalação manual

Agora, se não for o caso, você poderá adicioná-lo ao seu projeto via CLI:

!!! Pré-requisito
Antes de rodar o comando, certifique-se de que no seu arquivo `tsconfig.json` a configuração `strict` esteja configurada como `true`
!!!

```bash bash
pmpm add zod
```
