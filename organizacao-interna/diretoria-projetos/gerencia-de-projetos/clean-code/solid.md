---
label: "SOLID"
icon: code-of-conduct
order: 1
author:
  name: Pedro Amorim
date: 2024-08-01
---

# Padrões e antipadrões

Padrões e antipadrões são estruturas de código que se repetem durante o desenvolvimento de um programa. Os padrões são estruturas que resolvem os problemas e apresentam uma boa estrutura do código. Diferentemente, os antipadrões são estruturas que resolvem os problemas, pelo menos inicialmente, mas possuem um código de baixa qualidade.

As características esperadas de um códigos são legibilidade, entendibilidade, manutenibilidade e extensibilidade. Essas qualidades podem ser atingidas com técnicas de desenvolvimento de software. Aqui será explicado algumas, pois existem diversas.

## SOLID

SOLID é um conjunto de práticas muito utilizado para programas orientados à objetos, mas ele pode ser adaptado para a realidade de cada projeto.

### Princípio da responsabilidade única (Single responsibility)

A primeira prática é a responsabilidade única. Ela prega que partes do código seja funções, componentes, arquivos e etc, devem apresentar a solução de um único problema. Se o problema for grande, sempre é possível quebrar ele em diversas partes menores, assim como o código de um projeto pode ser separado em diferentes funções ou arquivos. Este princípio facilita a compreensão do código e reutilização de seus componentes a desenvolvedores que não estavam inseridos no desenvolvimento do mesmo.

Uns padrões que podem ser interessantes para essa prática é a utilização de `composition pattern`, `custom hooks` e criação de `libs` (bibliotecas) do projeto.

### Princípio Aberto-Fechado (Open-Closed principle)

Esse princípio diz que o código deve ser extensível, mas deve ser fechado a modificações. Em outras palavras, o código pode acrescentar novas features, mas não deve ser passível nas existentes, pois elas podem quebrar algum código dependente.

Uma forma de seguir esse princípio é utilizando o composition pattern visto anteriormente. Ele permite que os componentes sejam fechados a manutenção por não permitir uma alteração direta no código do componente, mas sim uma alteração no componente da página. Essa característica diminuí o atrito entre diferentes partes do código e fortalece a reutilização. O componente Root é "eternamente" expandível, pois ele aceita qualquer `ReactNode` válido, desse modo, ele garante que `features` futuras possão ser criadas com um custo mínimo.

### Princípio da substituição de Liskov (Liskov substitution)

Esse princípio diz que uma superclasse deve poder ser substituída por suas subclasses sem quebrar a aplicação. Em react, a programação segue mais o ramo funcional, mas ao ser adaptado para o mundo do React, ele poderia ser interpretado como: um componente deve poder ser substituído por outros componentes que derivam dele.

=== Exemplo

```tsx /components/searchBar.tsx
import { ArrowBigRight, Search } from "lucide-react";
import React from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
}

export default function SearchInput(props: SearchInputProps) {
  const { disabled, ...inputProps } = props;
  return (
    <div className="flex w-10/12 rounded-lg border-2 py-2 pl-4 pr-2 text-zinc-100">
      <Search size={24} className="mr-4" />
      <input
        className="w-full bg-transparent font-medium caret-zinc-100 focus:outline-none"
        placeholder="Pesquise textos de seu interesse"
        {...inputProps}
      />
      <button disabled={disabled}>
        <ArrowBigRight size={24} />
      </button>
    </div>
  );
}
```

Nesse exemplo, o componente `input` está sendo derivado para um componente mais complexo que ele tanto esticamente quanto em funcionalidades. Como o componente derivado extende as `props` do input e passa para ele, então, ele pode ser utilizado para substituí-lo sem consequências no código.

===

### Princípio da segregação de interfaces (Interface segregation)

Esse é outro princípio bem voltado para OOP, mas que pode ser utilizado em React. Ele diz que um cliente não deve depender de interfaces que ele não irá utilizar. No mundo do React, pode ser visto como os componentes não podem receber mais informações do que ele precisa. O overload de informação pode causar perda de performance e até mesmo levar ao `spaghetti code`, assim, deteriorando o código. Um exemplo disso pode ser visto abaixo.

```tsx /components/userAvatar.tsx
type User = {
  nome: string;
  idade: number;
  urlImagem: string;
  role: string;
};

export function UserAvatar({ user }: { user: User }) {
  return <Image src={user.urlImagem} className="Algumas classes" />;
}
```

Esse código passa muita informação desnecessária. E pode ser resolvido com a fácil alteração das `props`.

```tsx /components/userAvatar.tsx
export function UserAvatar({ urlImagem }: { urlImagem: string }) {
  return <Image src={urlImagem} className="Algumas classes" />;
}
```

### Princípio da inversão de dependência (Dependency Inversion)

Esse princípio fala que classes devem depender de interfaces e abstrações no lugar de implementações concretas. O react não tem a definição forte de classe como em OOP, mas o que pode ser tirado desse princípio é que os componentes devem depender de abstrações de outras partes do sistema ou de abstrações de sistemas externos e não depender diretamente da implementação de uma função. Isso possibilita a reusabilidade de código e a estabilidade, tornando as dependências independentes entre si e, consequentemente, diminuindo a complexidade em caso de erros e bugs no código.

O exemplo abaixo apresenta um componente Formulário que estrutura os dados passados por um usuário. Ele só depende do "contrato" da API que explicita quais dados devem ser fornecidos e as possíveis respostas, mas não precisa saber como a aplicação vai lidar com esses dados depois.

```tsx components/createUserForm.tsx
"use client";
//...

export function CreateUserForm(fetchData) {
  const handleSubmit = (e) => {
    e.preventDefault();
    //...
    const formData = new FormData(e.target);
    fetchData(formData)
      .then(() => "Faz alguma coisa")
      .catch((e) => {
        console.alert(e);
      });
    //...
  };
  return (
    <form onSubmit={}>
      <input placeholder="nome" />
      <input placeholder="email" />
      <input placeholder="senha" />
      <button type="submit">Cadastrar-se</button>
    </form>
  );
}
```
