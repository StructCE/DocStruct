---
order: e
icon: shield-lock
label: "Proteção de Rotas"
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

# Proteção de Rotas

O next oferece a possibilidade da criação de arquivos `layout.tsx` para configuração de páginas que estão dentro de determinadas rotas/pastas.

Além disso, também podemos criar grupos de rotas capazes de ocultar parte dos endereços de acesso para o usuário. Para isso, basta criarmos uma pasta de rota nomeada entre parênteses.
Por exemplo, podemos separar nossas rotas em dois tipos agrupando todas páginas que necessitam de autenticação em uma única rota `(auth)` e rotas públicas em `(public)`.

Utilizando esses dois recursos juntamente com o NextAuth, podemos criar rotas seguras que agrupam determinadas páginas protegidas por login. Para isso, podemos criar um arquivo `layout.tsx` como no exemplo abaixo:

```js src/app/(auth)/(user)/layout.tsx
import { getServerAuthSession } from "~/server/auth";
import { permanentRedirect } from "next/navigation";
import { AuthProvider } from "~/components/authProvider";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const session = await getServerAuthSession();

  if (session?.user) {
    //permanentRedirect não deixa retornar
    permanentRedirect("/login");
  }

  return (
    <>
      <AuthProvider>{children}</AuthProvider>;
    </>
  );
}
```

Nesse exemplo, temos um grupo de rotas chamado `(user)` que agrupa todas páginas relacionadas ao perfil de um usuário qualquer. O componente `AuthProvider` engloba o `children` para que as páginas tenham acesso a sessão no `client-side`. Além disso, o layout pega o `session` no `server-side` e define que para acessar a rota, uma sessão precisa existir. Ou seja, o usuário deve estar estar logado senão ele é redirecionado para a página de login.

!!!
Para não ter que usar a diretiva `"use client"` diretamente no arquivo `layout.tsx`, criamos um um componente `AuthProvider` para a utilização do `SessionProvider`.

```js src/components/auth/authProvider.tsx
"use client";
import { SessionProvider } from "next-auth/react";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default AuthProvider;
```

!!!
Dentro do grupo `(user)`, podemos ter uma página para o perfil do usuário `(user)/profile/page.tsx`.

```js src/app/(auth)/(user)/profile/page.tsx
import { getServerAuthSession } from "~/server/auth";

export default async function ProfilePage() {
  const session = await getServerAuthSession();
  return (
    <>
      <h1>Página do Usuário</h1>

      <span>Meu Nome: {session?.user.name}</span>
      <span>Meu Email: {session?.user.email}</span>
      <span>Minha Senha: LOL</span>
    </>
  );
}
```

Também podemos criar uma nova rota para uma página de login `login/page.tsx`. Nessa página de login, de maneira análoga ao layout, direcionamos o usuário para seu perfil caso ele já esteja logado.

```js src/app/(public)/login/page.tsx
import { permanentRedirect } from "next/navigation";
import SessionControlButton from "~/components/user/signIn";
import { getServerAuthSession } from "~/server/auth";

export default async function LoginPage() {
  const session = await getServerAuthSession();

  if (session?.user) {
    permanentRedirect(`/profile`);
  }

  return (
    <>
      <h1>Página de Login Foda</h1>
      <SessionControlButton />
    </>
  );
}
```
