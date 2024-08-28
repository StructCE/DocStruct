---
label: "Padrões de código"
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

#### Composition pattern

O padrão de composição fala que um componente maior pode ser quebrado quase que atomicamente em componentes menores para facilitar a reusabilidade e a manuteção do código. Outro problema que ele resolve é o `props` sendo passadas entre vários componentes até o alvo e um "oceano" de `props` para customizar um componente.

!!!
A função cn, utilizada nos exemplos abaixo, resolve conflitos de classes e é importante para o código, pois ele permite a reusabilidade do componente entre diferentes contextos. As classes escritas no componente da página vão ter prioridade sobre aquelas escritas na definição do componente.
!!!

=== Exemplo composition pattern

Abaixo tem a abstração de um código que não segue o composition pattern, mas tenta reaproveitar o mesmo componente para outras várias áreas dos site.

```tsx /components/post.tsx
// ...
export default function Post({
  post,
  hasLikeCount,
  hasContent,
  hasReplies,
}: {
  post: Prisma.PostGetPayload<{ include: { replies: true; createdBy: true } }>;
  hasLikeCount?: bool;
  hasContent?: bool;
  hasReplies?: bool;
}) {
  return (
    <div className="Algumas classes">
      <div className="Algumas classes">
        <div className="Algumas classes">
          <img src={post.user.image} className="Algumas classes" />
        </div>
        <div className="Algumas classes">
          <p className="Algumas classes">{post.user.name}</p>
          <p className="Algumas classes">{post.createdAt}</p>
        </div>
      </div>
      <div className="Algumas classes">
        <h3 className="Algumas classes">{post.title}</h3>
        <div className="Algumas classes" />
      </div>
      <div className="Algumas classes">
        {hasContent && (
          <div className="Algumas classes">
            <p className="Algumas classes">post.content</p>
          </div>
        )}
        {hasLikeCount && (
          <div className="Algumas classes">
            <p className="Algumas classes">post.rating</p>
          </div>
        )}
        {hasReplies && (
          <div className="Algumas classes">
            {post.replies.map((reply, index) => {
              return (
                <div className="Algumas classes" key={index}>
                  <p className="Algumas classes">{reply.createdBy}</p>
                  <p className="Algumas classes">{reply.content}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
```

Esse código apresenta diversas renderizações condicionais que podem causar perda de performance, bugs de estilização e dificultar a manutenção e a extensão do componente. Para resolver esse problema, pode-se separar atômicamente elementos desse componente como no exemplo abaixo.

```tsx /components/post/root.tsx
import cn from "/lib/utils.ts";
export function PostRoot({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("Algumas classes", className)}>{children}</div>;
}
```

```tsx /components/post/header.tsx
import cn from "/lib/utils.ts";
export function PostHeader({
  className,
  userName,
  creationDate,
  imageSrc,
}: {
  className?: string;
  userName: string;
  creationDate: string;
  imageSrc: string;
}) {
  return (
    <div className={cn("Algumas classes", className)}>
      <div className="Algumas classes">
        <img src={imageSrc} className="Algumas classes" />
      </div>
      <div className="Algumas classes">
        <p className="Algumas classes">{userName}</p>
        <p className="Algumas classes">{creationDate}</p>
      </div>
    </div>
  );
}
```

```tsx /components/post/title.tsx
import cn from "/lib/utils.ts";
export function PostTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("Algumas classes", className)}>
      <h3 className="Algumas classes">{children}</h3>
      <div className="Algumas classes" />
    </div>
  );
}
```

```tsx /components/post/content.tsx
import cn from "/lib/utils.ts";
export function PostContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("Algumas coisas", className)}>
      <p className="Algumas classes">{children}</p>
    </div>
  );
}
```

```tsx /components/post/likeCount.tsx
import cn from "/lib/utils.ts";
export function PostLinkCount({
  likeCount,
  className,
}: {
  likeCount: number;
  className?: string;
}) {
  return (
    <div className={cn("Algumas coisas", className)}>
      <p className="Algumas coisas">{likeCount}</p>
    </div>
  );
}
```

```tsx /components/post/reply.tsx
import cn from "/lib/utils.ts";
export function PostReply({
  reply,
  className,
}: {
  reply: Prisma.ReplyGetPayload<Record<string, never>>;
  className?: string;
}) {
  return (
    <div className={cn("Algumas coisas", className)}>
      <p className="Algumas classes">{reply.createdBy}</p>
      <p className="Algumas classes">{reply.content}</p>
    </div>
  );
}
```

```tsx /components/post/index.tsx
import cn from "/lib/utils.ts";
import { PostRoot } from "./root.tsx";
import { PostHeader } from "./header.tsx";
import { PostTitle } from "./title.tsx";
import { PostContent } from "./content.tsx";
import { PostLikeCount } from "./likeCount.tsx";
import { PostReply } from "./reply.tsx";

export const Post = {
  Root: PostRoot,
  Header: PostHeader,
  Title: PostTitle,
  Content: PostContent,
  LikeCount: PostLikeCount,
  Reply: PostReply,
};

export default Post;
```

Depois de criar os componentes e exportá-los, pode-se utilizá-los em uma página como no exemplo a seguir.

```tsx /page.tsx
import Post from "/components/post";

export default function Feed() {
  const posts = db.post.findMany();
  <main>
    {
      //...
    }
    {posts.map((post, index) => {
      return (
        <Post.Root key={index}>
          <Post.Header imageSrc={post.user.image} userName={post.user.name} creationDate={post.createdAt}>
          <Post.Title>{post.title}</Post.Title>
          <div className="Algumas coisas">
            <Post.content className="Algumas classes para adaptar o componente.">
              {post.content}
            </Post.content>
            <Post.LikeCount likeCount={post.rating} />
          </div>
        </Post.Root>
      );
    })}
    {
      //...
    }
  </main>;
}
```

Desse modo, é possível retirar as props condicionais e reutilizar melhor as partes de um componente sem prejudicar a manutenção e a extensibilidade dele.

!!!
O cn funde as classes do Tailwind prevalecendo o className que é escrito na página. Para aprender mais pesquise clsx e twMerge no youtube. A definição dessa função é a seguinte:

```ts /lib/utils
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

!!!

===

=== Exemplo de custom hook
Custom hooks são hooks do react, mas que contêm uma lógica associada. Criá-lo em um componente fere a ideia de responsabilidade única e limita a reutilização dele. Então, pode ser interessante trazer esse hook para um arquivo próprio.

```ts /hooks/useLocalStorage.ts
// Exemplo encontrado no seguinte vídeo https://www.youtube.com/watch?v=6ThXsUwLWvc
import { useState, useEffect } from "react";

function getSavedValue(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (savedValue) return savedValue;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}
```

```tsx /userForm.tsx
import useLocalStorage from "/hooks/useLocalStorage";

export default function userForm() {
  const [nome, setNome] = useLocalStorage("nome", "");
  const [idade, setIdade] = useLocalStorage("idade", "");

  const handleSubmit = (e) => {
    //...
  };

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleidadeChange = (e) => {
    setIdade(e.target.value);
  };

  return (
    <form>
      <input onChange={handleNomeChange} defaultValue={name} />
      <input onChange={handleIdadeChange} defaultValue={idade} />
      <button onSubmit={handleSubmit}></button>
    </form>
  );
}
```

===

=== Exemplo de biblioteca
Um exemplo bom de biblioteca é a função `cn` utilizada no exemplo de composition pattern, pois ela é uma lógica que não é responsibilidade do componente e pode ser reutilizada em diversos componentes.

```ts /lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
```

===

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
