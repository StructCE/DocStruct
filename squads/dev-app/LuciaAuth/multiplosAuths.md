---
order: 2
icon: organization
label: "Autenticação por diversos métodos"
author:
    name: "Pedro Amorim de Gregori"
category: Explicação
date: 2024-04-25
---

# Configurações para múltiplos métodos

Para utilizar vários métodos de autenticação, será necessário realizar algumas mudanças no `schema` e no `lucia` para deixar alguns atributos opcionais.

==- Exemplo de configuração
Exemplo baseado na junção dos credentials e OAuth apresentados na documentação.

```prisma schema.prisma
model User {
  id              String    @id @default(cuid())
  sessions        Session[]
  username        String
  email           String?   @unique
  hashed_password String?
  github_id       Int?      @unique
}
```

```ts auth/lucia.ts
//...
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			email: attributes.email,
			githubId: attributes.github_id,
		};
	},
});
//...
interface DatabaseUserAttributes {
	// Atributos do usuário
	username: string;
	email: string | null;
	github_id: number | null;
}
//...
```
===

# Mudanças?

Os métodos de login, cadastro, signout, etc. não necessitam de nenhuma mudança para funcionar com múltiplos métodos.