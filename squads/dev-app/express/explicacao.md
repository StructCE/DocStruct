---
order: 2
icon: home
label: "Introdução sobre Express"
---

# O que é Express e para quê usamos

Express é um framework usado para servir uma aplicação, encoplando roteadores, middlewares, callback's etc. 
Nós usaremos Express como nosso framework de back-end que será acompanhado de tRPC, para formar nossa API, Prisma, para nosso banco de dados, e Lucia Auth, para nossa autenticação de usuário e sessão.

## Instalação

O gerenciador de pacotes usado na Struct tem sido principalmente o PNPM, então instalaremos o Express usando este gerenciador, além de alguns outros pacotes uteis para o Express e para rodar o projeto:

```bash
pnpm init # iniciar o pnpm primeiramente
pnpm install express @types/express tsx # adicionar os pacotes necessários
```

## Essencial de Express

### App

Primeiramente, para criar servir uma aplicação com Express, precisamos iniciar o express:

```ts server.ts
import express from "express"

const app = express();
// Criar aplicação Express

app.listen(3000) 
// Aqui estamos falando pro servidor escutar a porta 3000, 
// mas pode ser qualquer porta que quiser
```

### Middleware's

Devemos usar um middleware, que terá acesso à resposta e à requisição, para retornar o que quisermos dependendo do PATH acessado e do tipo de requisição feita ao nosso servidor Express.
Vamos supor que para a url `localhost:3000/helloWorld`, quando usarmos um método GET, queremos retornar um "Hello World" em JSON:

```ts server.ts

...

app.get("/helloWorld", (req, res) => {
    res.json({
        data: "Hello World"
    })
})
// O que vem primeiro é o PATH a ser acessado,
// depois a função a ser executada.
```

Precisamos receber como parâmetro a `res` que é o parâmetro de resposta, por onde enviaremos nossos dados.
Neste caso, usamos a propriedade `json` para setar um json como resposta. Na documentação do Express, há todas propriedades tanto do [res](https://expressjs.com/pt-br/api.html#res.properties) quanto do [req](https://expressjs.com/pt-br/api.html#req.properties).

Desta mesma maneira, podemos definir ações para qualquer método HTTP e qualquer PATH.
Vamos manipular agora a propriedade `req` com um método POST no PATH `/message`.

```ts server.ts

...

app.use(express.json());
    
app.post("/message", (req, res) => {
    const message = `O usuário ${req.body.name} tem a seguinte mensagem ao mundo: ${req.body.message}`;
    res.send(message);
})
```

Neste exemplo tivemos que receber um JSON como body da requisição, mas para isso foi preciso usar o `app.use(express.json())` que é um `callback`, o que vai ser explicado no próximo tópico. Usamos mais uma propriedade do `res`, o `res.send`, o qual seta como resposta uma string, um objeto ou uma array.

### Callback's

Um callback é uma função a ser executada quando uma rota definida for acessada ou suas subrotas (filhas).
A principal funcionalidade dele é setar algumas propriedades no `res` ou `req` para poder ser usado no `middleware`em si, que será executado após o callback se usarmos a propriedade `next`ao final.

O que o `app.use(express.json())` do exemplo anterior fez foi basicamente:

```ts server.ts

...

app.use("/", (req, res, next) => {
    const body = pegar dados e transformar como objeto;
    // Não sei exatamente como isso é feito, mas essa é a ideia haha

    req.body = body;
    next();
    // Ele setou o req.body como os dados recebidos em formato JSON e 
    // passou para um possível próximo callback ou para o middleware em si
})
```
    
No caso do exemplo anterior, não foi passado nenhum PATH porque o PATH default é a raiz (ou `/`), o que é intencional já que queremos que o callback do `express.json()` envolva toda nossas rotas.
    
## Como rodar o servidor

Tendo como exemplo o seguinte arquivo `server.ts`:

```ts server.ts
import express from "express"

const app = express();

app.listen(3000) 
```

Nós iremos adicionar ao nosso `package.json`, que está no mesmo diretório que o `server.ts`, o comando:

```json package.json
{
...
"scripts": {
    "dev": "tsx watch server.ts"
},
...
}
```

O `tsx` é o que será usado para rodar o arquivo typescript com a flag `watch` para captar qualquer mudança que houver no arquivo enquanto o servidor estiver rodando.
E, dando um `pnpm dev` no mesmo diretório em que está o `package.json`, o servidor estará de pé no `localhost:3000`, porta escolhida no nosso app Express.

::: sample
Para mais informações sobre Express, consulte [aqui](https://expressjs.com)  
:::

<style>
    .sample {
        text-align: center;
        color: #1956AF;
        border-radius: 10px;
        background-color: #E1EDFF;
        border: 1px solid #1956AF;
        padding-top: 20px;
        margin-bottom: 20px;
    }
</style>