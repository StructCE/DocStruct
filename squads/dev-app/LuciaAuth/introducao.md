---
order: 5
icon: chevron-right
label: "Introdução ao Lucia Auth"
author:
  - name: Pedro Amorim de Gregori
    avatar: /assets/logo_struct.png
category: Explicação
date: 2024-04-10
---

# O que é o Lucia Auth?

O `Lucia Auth` é uma biblioteca de autorização que fornece abstrações do manuseio de sessões, como criação e invalidação de sessão. Ela apresenta suporte tanto para autenticação de terceiros (*OAuth*) quanto para autenticação por credenciais.

# Instalação

A instalação do `Lucia` pode ser feito utilizando o gerenciador de pacotes do projeto. O hash das senhas será feito utilizando a biblioteca `bcrypt`.

```shell
npm install lucia bcrypt
npm install --save @types/bcrypt
```

# Inicialização

Será necessário a escolha de um adaptador para abstrair o contato do Lucia com o banco de dados ou ORM. Como na empresa utilizamos a ORM `prisma` para lidar com o banco de dados, aqui também será utilizado.

```shell
npm install @lucia-auth/adapter-prisma
```

Para utilizarmos o adaptador do prisma será necessário realizar o setup do prisma. É Recomendado a leitura da documentação do prisma. O lucia requer as models `user` e `session` com alguns campos predefinidos no `schema.prisma`.

```sql schema.prisma
//...
model User {
  id       String    @id @default(cuid()) // O id pode ser numerico sequencial ou usar uuid se quiser
  sessions Session[]
}

model Session {
  id        String   @id
  expiresAt DateTime
  user      User     @relation(references: [id], fields: [userId], onDelete: Cascade)
//...
}
```

Após configuração da ORM, pode-se realizar a configuração do lucia. Para isso, poderá ser utilizado o seguinte código:

```ts auth/lucia.ts
import { Lucia } from "lucia";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}

```