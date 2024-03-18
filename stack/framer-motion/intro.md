---
icon: command-palette
label: "Introdução ao Framer Motion"
order: 5
author:
    name: Pedro Amorim de Gregori
date: 2024-03-13
category: Explicação
---

# O que é o Framer Motion?

Framer Motion é uma biblioteca de movimento feita para o React. Ela simplifica a implementação de animações utilizando o `motion component`.

# Instalação

!!!
O Framer Motion requer a utilização da versão 18+ do `React`.
!!!

Para instalar utilize:

```
npm install framer-motion
```

Para importar os componentes, hooks, etc. utilize:

```tsx page.tsx
import { motion } from "framer-motion"; // Depois do import é o que você necessitar
```

!!!
Componentes criados utilizando o Framer Motion deverão ser `Client Components`, logo, a diretiva `"use client"` do `next.js` é obrigatória.
!!!

!!!
É recomendado a visualização dos exemplos para o entendimento da biblioteca.
!!!
