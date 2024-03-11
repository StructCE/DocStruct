---
order: d
icon: iterations
label: "Callbacks"
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

# Callbacks

## Session Callback

O `session callback` é chamado sempre que uma sessão é verificada (`getSession()`, `getServerSession()`, `/api/auth/session`, etc).

**Por padrão, apenas uma parte do token é retornado como medida de segurança**, mas podemos facilmente personalizar quais dados de sessão são retornados. Para isso, a stack do T3 traz uma conexão pronta entre a sessão e a database a partir da model `User` definida no Prisma e com isso podemos passar parâmetros extras e acessá-los utilizando os `fetches` de sessão no `client-side`.

Podemos também passar parâmetros extras retirados da database e passá-los junto com os dados de sessão padrão (dependem do `Session Provider`, no caso do google são `email`, `name` e `image`)

```go prisma/schema.prisma
model User {
    id            String    @id @default(cuid())
    name          String?
    email         String?   @unique
    emailVerified DateTime?
    image         String?
    accounts      Account[]
    sessions      Session[]
    newParam      String // novo parâmetro
}

```

Para fazer com que o session inclua esse novo parâmetro, basta ir no arquivo de configurações do NextAuth em `src/server/auth.ts` e adicionar esse parâmetro ao `session callback` do `authOptions`:

```js src/server/auth.ts
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session, // parâmetros default da session
      user: {     // usuário da session
        ...session.user, // parâmetros default
        newParam: user.newParam      // novo parâmetro para o objeto user da session
      },
    }),
  },
```

Quando você adicionar esse novo parâmetro ele já será passado dentro da sessão, mas o typescript apontará um erro de tipagem não segura. Para corrigir será necessário declarar uma nova interface para o user object da sessão no módulo `next-auth`:

```js src/server/auth.ts
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      newParam: string; // novo parâmetro (session.user.id)
    } & DefaultSession["user"];
  }

  // ...novas propriedades
  interface User {
    newParam: string; // novo parâmetro
  }
}
```

!!!warning Somente atualizar a interface mais externa não atualiza as demais interfaces que a utilizam. No caso do exemplo acima, será necessário atualizar o `user` dentro de `Session` por conta da tipagem.
!!!

## SignIn Callback

O `SignIn Callback` é chamado sempre que uma requisição de login é feita a um provedor do NextAuth.

Quando você utiliza o NextAuth.js com uma database, o objeto `User` será um objeto da database (id, name, newParam, etc.) se o usuário já realizou login anteriormente, senão ele será um protótipo simples.
Por exemplo, quando o usuário realiza login pelo Google sem conexão com a database, o `session.user` possui os parâmetros _name_, _email_ e _image_.

Já no caso do `Credentials Provider` o objeto `user` será a resposta do `authorize callback` e o objeto `profile` será a resposta do HTTP POST.

Você pode utilizar o `signIn() callback` para, por exemplo, verificar se um usuário tem permissão para fazer login e manejar redirecionamentos:

```js src/app/api/auth/[...nextauth]/route.ts
// ...
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    // você precisa fazer a lógica aqui ou pegar da db. Ex:
    if (email.endsWith("@struct.unb.br")) {
      return true
    }

    return "/unauthorized"
    // Ou pode retornar `false` para mostrar uma mensagem de erro padrão
    // return false
    }
  }
}
// ...
```
