---
label: "Clean Code no Back-End"
icon: rocket
author:
  name: Matheus das Neves
  avatar: ../assets/logo_struct.png
date: 07-08-2024
---

# Clean Code no Back-End

Aqui você verá algumas práticas e design patterns para se usar na construção do Back-End de um projeto. Mas primeiramente, vamos definir e esclarecer o que seria o Back-End.

O Back-End seria a parte do projeto composta pelo banco de dados e api, OK, mas o que é um banco de dados e api?

Banco de dados é um aglomerado de tabelas que possuem seus respectivos atributos e, em SQL, fazem relações entre si, é onde criamos uma estrutura de objetos (por isso banco de dados é praticamente POO) para representar informações que precisamos armazenar. Então, fazemos a estrutura das informações que queremos armazenar (conhecido como Schema), fazemos nossas chamadas (querys) para o banco de dados e criamos, alteramos, listamos ou deletamos determinada informação.

Já a API é onde, do cliente, vamos fazer uma determinada requisição que irá receber dados sobre o tipo da requisição, headers, body e entre outras informações, e, então, irá fazer uma determinada operação, manipulando o banco de dados e, dependendo da requisição, retornando alguma informação.

Agora, para a construção desse sistema, é bom usarmos algumas boas práticas para organizar melhor o código e torná-lo mais legível.

## Repository Pattern

O Repository Pattern é um design pattern bem conhecido e utilizado na criação de sistemas e back-end. Ele consiste basicamente na divisão da lógica utilizada na chamada do banco de dados e da lógica utilizada na api para manipulação dos dados recebidos do banco de dados e, então, retornado para o cliente.

Tendo esse design pattern em mente, iremos fazer a seguinte divisão nos nossos projetos: routes, interfaces e repositories.

**Repositories** será o local onde colocaremos a lógica de chamada de banco de dados, onde chamaremos o prisma client e faremos as chamadas ao banco de dados necessárias ao projeto.

**Routes**, como usamos nossa stack T3 que conta com tRPC para construção da nossa api, será onde fazemos as procedures em si, localizada em `routers` no repositório padrão da T3.

Já **interfaces** será onde colocaremos todas as tipagens de saída e de entrada tanto dos nossos repositories quanto das nossas routes.

Vamos supor que em nosso projeto temos uma model Product que precisamos listar todos os produtos com somnete seu nome e quantidade em um determinado estoque, em outra página precisamos listar um determinado produto com todas as suas informações, em outra precisamos criar/atualizar/deletar produtos:

### Repositories

Em repositories nós colocamos somente a lógica de chamada ao banco de dados. De acordo com a descrição dada do nosso projeto, precisaremos então ter uma função que irá pegar todos os produtos do banco de dados, uma para pegar um determinado produto, uma para criar produto, uma para atualizar e, finalmente, uma para deletar:

```ts src/server/repositories
import db from "algum lugar no seu repo"
import { productRepositoryInterface } from "../interfaces/product" // Desenvolvemos essa interface em interfaces/product para tipar os props das funções do repository

async function getAll() => {
  return await db.product.findMany() // Nós não precisamos de nenhum input de dados neste caso
}

async function getOneById( props: productRepositoryInterface["GetOneByIdProps"]) => {
  return await db.product.findFirst({ where: { id: props.id}})
}

async function create( props: productRepositoryInterface["CreateProps"]) => {
  return await db.product.create({ data: {...props}})
}

async function update( props: productRepositoryInterface["UpdateProps"]) => {
  return await db.product.update({ where: { id: props.id}, data: { ...props.data}})
}

async function remove( props: productRepositoryInterface["DeleteProps"]) => {
  return await db.product.delete({ where: { id: props.id}})
}

export const productRepository = {
  getAll,
  getOneById,
  create,
  update,
  remove
}
```

### Interfaces

Aqui você pode fazer tanto um arquivo para ambos repository e route dos produtos quanto fazer separado, irei fazer de maneira separada. Como só fizemos o repository por enquanto, iremos criar as interfaces usadas no repository. Essas tipagens também serão usadas para validar as entradas de dados nas procedures, que é feita em zod no tRPC, então iremos fazer direto em zod e, então, inferimos o tipo para uso no repository.

```ts src/server/interfaces/product.repository,interfaces.ts
import z from "zod";

const getOneByIdProps = z.object({
  id: z.string(),
});

type GetOneByIdProps = z.infer<typeof getOneByIdProps>;

const createProps = z.object({
  name: z.string(),
  currentAmount: z.string(),
  // outras propriedades do produto
});

type CreateProps = z.infer<typeof createProps>;

const updateProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    currentAmount: z.string().optional(),
    // outras propriedades do produto
  }),
});

type UpdateProps = z.infer<typeof updateProps>;

const deleteProps = z.object({
  id: z.string(),
});

type DeleteProps = z.infer<typeof deleteProps>;

export type ProductRepositoryInterfaces = {
  // Este é o schema zod usado para fazer a validação dos inputs nas procedures
  GetOneByIdProps: GetOneByIdProps;
  CreateProps: CreateProps;
  UpdateProps: UpdateProps;
  DeleteProps: DeleteProps;
};

export const productRepositorySchema = {
  // E este é a interface do repository para fazer a tipagem
  getOneByIdProps,
  createProps,
  updateProps,
  deleteProps,
};
```

### Routes

## Tratamento de erros
