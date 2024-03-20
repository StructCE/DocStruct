---
order: 1
icon: rocket
label: "Utilização"
author:
    name: Matheus das Neves Fernandes
date: 2024-03-15
category: Utilização
tags:
    - data validation
    - utilização
---

# Utilização 

Aqui vamos mostrar o importante e essencial para poder usufruir-se de uma biblioteca para validação dos seus dados em algum projeto. Para maior aprofundamento e uma validação mais complexa, sugiro que consulte a [documentação do Zod](https://zod.dev).

## Zod Schema

Assim como montamos nosso tipo no typescript, no zod iremos criar um Zod Type. Porém, existem infinitas possibilidades para estruturar seu schema de forma bem simples.
 Imagine que queremos montar um Zod Schema que representa o seguinte tipo:

```ts
import { z } from 'zod'

type Member = {
  id: string,
  name: string, 
  lastname: string, 
  role: "Membro" | "Diretor", 
  projects: string[] | undefined
}
```

Estamos tentando montar um tipo `Member` que possuirá um `id` (string com 3 a 12 caracteres), um nome (string), um `lastname` (string), um `role` (enumerável), e `projects` (array de strings ou indefinido). Usando Zod, nosso schema será do seguinte jeito:

```ts
import { z } from 'zod'

const memberSchema = z.object({
  id: z.string().min(3).max(12),
  name: z.string(), 
  lastname: z.string(),
  role: z.enum(["Membro", "Diretor"]),
  projects: z.array(z.string()).optional()
})
```

Agora queremos criar um Zod Type que representa um objeto de vários `Member`'s em que a chave de cada `Member` será seu respectivo nome (uma string):

```ts
import { z } from 'zod'

const memberSchema = z.object({
  ...
})

const members = z.record(z.string(), memberSchema)
```

Esses são só alguns exemplos essenciais de como montar um Zod Schema. Ok, agora temos nosso schema, mas ele é usado para validar dados, não para deixar nosso projeto type safe, até porque ele não é nem um tipo e sim uma constante.

## Inferir tipos

Para podermos deixar nosso projeto type safe a partir de um zod schema, teremos que inferir o tipo. Com essa finalidade, podemos inferir o tipo do schema da seguinte maneira:

```ts
import { z } from 'zod'

const memberSchema = z.object({
  ...
})

type Member = z.infer<typeof memberSchema>
```

Com o `z.infer<>` podemos inferir um tipo a partir de um Zod Schema e então tornar nosso projeto type safe.


## Validação dos dados

Agora, imagine que você tem uma função que irá mostar as informações do Member e já está tipada de acordo com a etapa anterior, você precisa garantir que o que esta função vai receber como parâmetro irá ser do tipo Member. Para isso, precisaremos de uma função parse, que irá fazer essa validação e nos retornará o dado em caso de sucesso ou um erro/mensagem dependendo da função que usarmos:

### Parse

Usando a função `.parse`, iremos validar o dado e, em caso de sucesso, será retornado o nosso valor totalmente tipado e, em caso de falha, levantará um erro:

```ts
import { z } from 'zod'

const memberSchema= ...
type Member = z.infer<typeof memberSchema>

function showMember({member} : {member: Member}) {
  // Função de mostar informações do membro
}

function main() {
  const data = // input de dado
  const validatedData = memberSchema.parse(data)
  showMember(validatedData)
}
```

Aqui estamos fazendo a validação e logo após executando a função para mostrar membros com os dados válidos, não precisamos fazer validação porque o Zod se encarrega de lançar um erro caso o dado não seja válido.

### safeParse

Usando a função `.safeParse` será retornado um objeto com um valor de sucess, podendo ser true ou false, e os dados, em caso de sucesso, ou o error, em caso de falha:

```ts
import { z } from 'zod'

const memberSchema= ...
type Member = z.infer<typeof memberSchema>

function showMember({member} : {member: Member}) {
  // Função de mostar informações do membro
}

function main() {
  const data = // input de dado
  const res = memberSchema.safeParse(data)
  if (res.sucess) {
    showMember(res.data)
  } else {
    console.log(res.error)
  }
}
```

Os dados são validados e, então, é retornado um true/false para o valor do sucess. Verifica-se se houve sucesso e, logo após, a função `showMember` é executada com os dados retornados, caso haja falha, damos um console.log() no erro retornado.


!!! Assíncronas
Ambas as funções de parse possuem versões assíncronas ([parseAsync](https://zod.dev/?id=parseasync) e [safeParseAsync](https://zod.dev/?id=safeparseasync)) para casos em que o schema possua [refinamentos](https://zod.dev/?id=refine) ou [transformações](https://zod.dev/?id=transform) assíncronos.
!!!

## Mensagens personalizadas

Quando faz-se a validação dos dados e é levantado/retornado algum erro, o Zod alerta com uma mensagem padrão. Mas podemos customizar essas mensagens pelos erros, como required_error ou invalid_type_error, ou configurando uma mensagem:

```ts
import { z } from 'zod'

const memberSchema = z.object({
  id: z.string({
    required_error: "É necessário haver um id",
    invalid_type_error: "O id deve ser uma string",
  }).min(3, {
    message: "O id deve possuir no mínimo 3 caracteres"
  }).max(12, {
    message: "O id deve possuir no máximo 12 caracteres"
  }),
  ...
})

```