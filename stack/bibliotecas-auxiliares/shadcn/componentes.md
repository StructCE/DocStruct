---
order: 2
icon: copy
label: "Adicionando Componentes"
author:
    name: Eduardo P.P. Ferreira
date: 2024-04-15
category: Instalação
tags:
    - instalacao
    - user interface
    - typescript
---

# Instalando shadcn em NextJS

shadcn funciona de maneira simples em NextJS.

Seguindo [a documentação oficial](https://ui.shadcn.com/docs/installation/next), após iniciar um projeto em NextJS, rode o seguinte comando na raiz do projeto:

```bash
npm shadcn-ui@latest init
```

Após responder as perguntas, shadcn estará pronto para ser utilizado em sua aplicação.

## Configurando shadcn

Existem algumas configurações que podemos fazer em nosso projeto.

Na [documentação oficial](https://ui.shadcn.com/docs/installation/next), a partir do passo 4, o autor sugere algumas modificações em arquivos do projeto para configurar shadcn com fontes, por exemplo.

!!!info components.json e métodos de usar shadcn
Aqui, estamos utilizando a CLI (*command line interface*) para adicionar shadcn e seus componentes ao projeto. Mas, como mencionado na página de explicação, podemos simplesmente acessar [a página de componentes](https://ui.shadcn.com/docs/components/accordion) de shadcn e copiar o código disponível para o componente que quisermos usar, colando em qualquer arquivo que criarmos.
!!!

# Adicionando Componentes

Com shadcn configurado, podemos adicionar nossos componentes utilizando o comando


```bash
npm shadcn-ui@latest add <component>
```

Considerando que o projeto utiliza a pasta `/src/app`, o comando acima cria a pasta `src/components`, onde shadcn colocará os componentes adicionados. Lembrando que o que é adicionado é um arquivo `.tsx`, do qual temos total controle para modificar como quisermos.

Então, como exemplo, se rodarmos `npx shadcn-ui@latest add button`, shadcn criará, nesse caso, a pasta `/src/components/ui` e adicionará o arquivo `button.tsx` com o código necessário para esse componente.
Com isso, basta importá-lo em alguma página para utilizá-lo:

```typescript src/app/page.tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```
