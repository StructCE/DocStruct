---
order: a
icon: question
label: "O que é o tRPC?"
---

# O que é o tRPC?

tRPC é uma **biblioteca para desenvolvedores TypeScript** de aplicações web, que permite a **criação de APIs** totalmente **tipadas** de ponta a ponta.

Utilizando o poder do TypeScript para garantir segurança de tipos em todo o fluxo de dados, ela torna também fácil a maneira de escrever endpoints no backend, para serem usados de maneira segura no frontend, a partir dos contratos de API pré-estabelecidos no design do projeto

## Conceitos Básicos de RPC e tRPC

### O que é RPC?

RPC, ou _Remote Procedure Call_, é um protocolo que permite chamar **procedimentos** (ou rotinas) em um computador (servidor), a partir de outro computador na rede (cliente), sem que o programador precise codificar explicitamente os detalhes que permitem essa interação remota. O RPC **abstrai a complexidade da comunicação de rede**, permitindo que o desenvolvedor se concentre na lógica do procedimento.

Em _APIs HTTP/REST tradicionais_, você realiza uma requisição, por meio de um `URL`, e obtém uma resposta. Em uma _API RPC_, você chama uma `função` e obtém uma resposta.

==- Rest x RPC

```tsx
// HTTP/REST
const res = await fetch("/api/users/1");
const user = await res.json();

// RPC
const user = await api.users.getById({ id: 1 });
```

===

### Como o tRPC se Relaciona com RPC?

tRPC é uma biblioteca que implementa o RPC e é projetada para _monorepos_ com TypeScript full-stack.
