---
order: c
icon: person
label: "Sessões de usuário"
author:
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

# Sessões de usuário

No `NextAuth`, uma sessão de usuário é um período de tempo durante o qual um usuário está autenticado em sua aplicação. Quando um usuário faz login em sua aplicação, o `NextAuth` cria uma sessão de usuário, que é mantida enquanto o usuário permanecer autenticado.

Durante essa sessão, o `NextAuth` armazena informações sobre o usuário, como seu ID e outras informações de perfil, que podem ser acessadas para personalização das páginas ou restringir o acesso a determinadas partes do site.
A sessão de usuário é encerrada quando o usuário faz logout ou quando a sessão expira devido a inatividade ou a um tempo de expiração configurado.

## Controle

O NextAuth provê medidas de controle de sessão para que você consiga iniciar (SignIn) e encerrar (SignOut) sessões facilmente.

!!!warning
Não existe função "SignUp" para registro de usuários! Usando autenticação externa o SignUp é feito no SignIn caso os dados ainda não estejam no banco de dados, já usando credentials o signUp deve ser feito manualmente. Você pode fazer o controle de login e o registro de usuários a partir do [SignIn Callback](#signin-callback).
!!!

### SignIn()

!!!
Execução:

- Client-Side: **YES**

- Server-Side: **NO**

!!!

Por padrão, ao chamar o método `signIn()` sem argumentos, você será redirecionado para a página de login do NextAuth dentro da rota `/api/auth/session`. Essa página possui uma interface básica que lista todos os provedores de autenticação inseridos no `authOptions`, mas não pode ser personalizada e expõe a rota api ao usuário.

#### Provedor externo

Você pode redirecionar o usuário diretamente para a página seu provedor de autenticação externo passando o `id` do provedor dentro de `signIn()`.
Além disso, você pode especificar para qual página o usuário irá retornar após o login passando uma Url no segundo argumento da função.

```js googleSignInButton.tsx
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/user/profile" });
      }
    >
      Sign in with Google
    </button>
  );
}
```

#### Provedor interno

No caso do `crendentials` ou `email` provider, além das opções acima, você tem a possibilidade lidar com a resposta do `SignIn()` na **sua própria página de login/cadastro** em que a função é chamada ao **desabilitar seu redirecionamento padrão**. Por exemplo, se ocorrer um erro (como credenciais incorretas fornecidas pelo usuário), você pode querer tratar o erro na mesma página. Para isso, você pode passar `redirect: false` dentro do segundo parâmetro da função.

!!!warning
A opção de `redirect` só funciona para `credentials` e `email` providers.

!!!

```js login/page.tsx
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
export default function LoginPage() {
  //hook para ter acesso ao resultado do SignIn
  const [signInResponse, setSignInResponse] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignIn = async () => {
    const response = await signIn("credentials", {
      redirect: false,
      // callbackUrl: "/user/profile",
      password: password,
    });
    setSignInResponse(response);
  };

  // Formulário de login
  // ...
  // ...
  // Botão de login:
  <button onClick={handleSignIn}>Sign in</button>;
}
```

### SignOut()

!!!
Execução:

- Client-Side: **YES**

- Server-Side: **NO**

!!!

Quando chamado, o método `signOut()` encerra a sessão e por padrão redireciona o usuário à página inicial (`/`). Assim como na função de login, você pode especificar o `callbackUrl` dentro do segundo parâmetro ou desativar o redirecionamento utilizando `redirect: false`.

```js signOutButton.tsx
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ redirect: true, callbackUrl: "/homepage" })}
    >
      Sign out
    </button>
  );
}
```

Se após o logout você precisar redirecionar para outra página sem recarregar a atual, você pode capturar a resposta da chamada da função:

`const response = await signOut({redirect: false, callbackUrl: "/homepage"})`.

Nessa linha, `response.url` é a URL validada para a qual você pode redirecionar o usuário, usando `useRouter().push(response.url)` do Next.js.

## Session Fetching

### useSession()

!!!
Execução:

- Client-Side: **YES**

- Server-Side: **NO**

!!!

O `useSession` é um importante hook do React que é utilizado nas aplicações Next Auth para recuperar informações da sessão de usuário. Para utilizá-lo primeiro é preciso expor o conteudo da sessão de usuário por meio do `<SessionProvider>`. Para saber como utilizar o `SessionProvider`, vá para a seção [Proteção de Rotas](#proteção-de-rotas).

#### Exemplo

O Hook do React `useSession` pode ser usado como uma maneira simples de verificar se alguém está autenticado ou não:

```js src/components/auth/sessionControlButton.tsx
"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SessionControlButton = () => {
  const { data: session } = useSession(); // hook que pega os dados da sessão

  //se não existir a sessão ou o usuário, mostra o botão de login
  if (!session || !session.user) {
    return <button onClick={() => signIn()}>Sign In</button>;
  } else {
    //caso contrário, mostra os dados e a opção de SignOut
    return (
      <div>
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
};

export default SessionControlButton;
```

A ideia é armazenar os resultados do `useSession` em props para aferir se o usuário ja foi autenticado, assim você pode criar componentes que se comportam de maneiras diferentes caso o usuário esteja logado ou não. Um outro exemplo de uso poderia ser uma foto de perfil em uma navbar, que mostra um icone default ou a foto do usuário dependendo da sessão.

### getServerSession()

!!!
Acesso:

- Client-Side: **NO**

- Server-Side: **YES**

!!!

Como o nome já diz, o `getServerSession` é utilizado para obter a sessão no `server-side`, fazendo os fetches e renderizações no servidor antes de serem passados para o usuário. Geralmente ele é utilizando em contextos de `Route Handlers`, `React Server Components`, `rotas API` ou no `getServerSideProps`

#### Exemplo (App Router)

Para pegar os dados no server side dentro das páginas no `App Router`, você precisa importar o `authOptions` e passar dentro da função.

```js
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";

export default async function Page() {
  // Use se não estiver usando um sessionProvider, caso contrário use useSession()
  const session = await getServerSession(authOptions);
  ...
}
```

### getServerAuthSession()

!!!
Execução:

- Client-Side: **NO**

- Server-Side: **YES**

!!!

A stack do T3 oferece a função auxiliar `getServerAuthSession` para fazer o pre-fetch da sessão no server-side. Essa função é parecida com a `getServerSession`, mas com a vantagem de que você não precisa importar o `authOptions` toda vez que você precisar realizar um pre-fetch da sessão.

```js
import { getServerAuthSession } from "~/server/auth";

export default function HomePage() {
  // Use se não estiver usando um sessionProvider, caso contrário use useSession()
  const session = getServerAuthSession();
  return <pre>{JSON.stringify(session.user)}</pre>;
}
```

## Route Handler

Se você precisa buscar dados do servidor em um `client component`, você pode chamar um `Route Handler` (manipulador de rota).
Os manipuladores de rota são executados no servidor e retornam os dados para o cliente. Eles devem ser utilizados quando você não quer expor informações confidenciais ao cliente, como tokens.

No caso do NextAuth, temos um handler padrão definido que é executado sempre que a API de autenticação é chamada na rota `api/auth`. Ele é necessário para o funcionamento das funções `SignIn()`, `SignOut()` entre outras coisas.

```js src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import { authOptions } from "~/server/auth";

const handler = NextAuth(authOptions);

// você pode adicionar mais exports compatíveis
export { handler as GET, handler as POST };
```

!!!
Projetos criados a partir da stack do T3 separam o `authOptions` do `route handler` por questão de organização e modularidade. Para saber mais sobre a configuração NextAuth acesse a [documentação do authOptions](https://next-auth.js.org/configuration/options#options). Veja também um exemplo de uso em [Session Callback](/stack/next-auth/callbacks.md#session-callback)
!!!
