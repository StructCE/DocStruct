---
order: b
icon: key
label: "Provedores de autenticação"
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
**Atenção!! A documentação a seguir assume que você está utilizando T3 Stack**
!!!

# Provedores de autenticação

## Providers

O Next Auth possibilita que o critério de autenticação (provedores) seja por meio de credenciais customizáveis (nome, senha, email, etc) ou por provedores externos (Google, GitHub, Discord, etc).

### OAuth (Externo)

OAuth (Open Authorization) é um protocolo de autorização que permite que um aplicativo obtenha acesso limitado a uma conta em um serviço de terceiros sem revelar credenciais de login.

Ele é o principal processo de autenticação utilizando por empresas na atualidade e é oferecido pelo NextAuth através de provedores de login externos preexistentes. A partir do OAuth, o usúario é capaz de realizar a autenticação por meio de outra plataforma como Google, Github, Discord, etc.

Por serem processos externos de várias fontes diferentes, cada autenticação escolhida terá uma documentação específica diferente. Para ter mais detalhes sobre provedores específicos oferecidos pelo NextAuth acesse suas [respectivas documentações](https://next-auth.js.org/providers/).

Você deve definir os provedores dentro de `authOptions` no arquivo `src/server/auth.ts`

```js src/server/auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // ...
  // Configure um ou mais provedores de autenticação
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // ...adicione mais provedores aqui. Exemplo:
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
  ],
};

export default NextAuth(authOptions);
```

#### Como conseguir as credenciais para a autenticação externa (Google)

Utilizarei o exemplo do Google como autenticador externo, pela grande gama de [documentação](https://developers.google.com/identity/protocols/oauth2?hl=pt-br) disponível.

Para configurar a autenticação com o Next Auth usando o Google como provedor, você precisará obter as credenciais apropriadas do Google. Siga estas etapas:

1. Acesse o [Console de Desenvolvedores do Google](https://console.developers.google.com/apis/credentials).

2. Com o projeto criado e/ou adicionado na plataforma, na barra de opções lateral clique no item `Credenciais` e em seguida, no botão `Criar credenciais`, escolha `ID do cliente OAuth` como tipo de credencial, e configure as informações do OAuth de acordo com as necessidades do projeto e seguindo as intruções.

3. Preencha o campo `Tipo de aplicativo` com a opção `Aplicativo da Web`, nas seções `Origens JavaScript autorizadas` e `URLs de redirecionamento autorizados`, adicione URLs de acordo com a natureza do aplicativo, por exemplo, vale colocará `http://localhost:3000` e `http://localhost:3000/api/auth/callback/google` respectivamente, para uma aplicação que está rodando localmente. E, por fim ,clique em `Criar`.
   OBS:A segunda URL depende de como foram implementadas as rotas no projeto!!

4. Após a criação do cliente OAuth, serão exibidos O `ID do cliente` e a `Chave secreta do cliente`.

5. Por fim, crie um arquivo `.env` para guardar essas informações. Como, no exemplo:

```bash
# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
# This variable is necessary for production
# NEXTAUTH_SECRET=""

NEXTAUTH_URL="http://localhost:3000"

# Next Auth GOOGLE Provider
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Com as credenciais armazenadas de forma segura em seu arquivo .env, você pode configurar a autenticação com o provedor do Google de maneira segura e eficaz em seu projeto Next Auth.

### Credentials (Interno)

!!!warning
É **necessário ter um serviço de autenticação externo, ou criar um do zero**, para poder usar o CredentialsProvider de forma realmente útil! O NextAuth nesse caso é muito menos útil! Considere recorrer a outras bibliotecas, como [Lucia Auth](https://lucia-auth.com/) ou [bcrypt](https://www.npmjs.com/package/bcrypt) (criptografia de senhas).
!!!

O `credentials provider` permite lidar com o login usando credenciais arbitrárias, como nome de usuário e senha. A validação de sessão com base no banco de dados deve ser realizada de forma manual por meio da função `authorize()` na configuração dos providers no NextAuth.

```js src/app/api/auth/[...nextauth]/route.ts

import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/server/db";
...
providers: [
  CredentialsProvider({
    // O nome exibido no formulário de login (por exemplo, 'Entrar com...')
    name: "Credentials",

    // 'credentials' é usado para gerar um formulário na página de login.
    // Você pode especificar quais campos devem ser enviados, adicionando chaves ao objeto 'credentials'
    // por exemplo, domínio, nome de usuário, senha, token de autenticação de dois fatores, etc.
    // Você pode passar qualquer atributo HTML para a tag <input> por meio do objeto.
    credentials: {
      email: {
        label: "Email",
        type: "email",
        placeholder: "exemplo@gmail.com"
      },
      password: {
        label: "Password",
        type: "password",
        placeholder: `digite sua senha`,
      },
    },

    async authorize(credentials, req) {
      // Verifica algum campo é vazio
      if (!credentials?.email || !credentials.password) {
        return null //não lança erro
      };

      // Procura o usuário na database
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      });

      if (!user) {
        return null
      };

      // Compara a senha passada com a senha do bd
      // PERIGO!!! Senha do bd não está criptografada!
      if (credentials.password !== user.password) {
        return null
      };

      // Qualquer objeto retornado será salvo na propriedade user
      return {
        id: user.id + '',
        name: user.name,
        email: user.email,
        image: user.image,
      }
    }
  })
]
...

```

Você também pode rejeitar este retorno de chamada com um erro, assim o `client-side` pode lidar com o erro dependendo do status e da mensagem passada como um parâmetro de consulta. No tratamento desse erro o usuário pode, por exemplo, receber um aviso ou ser redirecionado para uma página de registro, ajuda, etc.
