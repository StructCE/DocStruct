---
label: "Clean Code no Front-End"
icon: browser
author:
  name: Pedro Amorim
  avatar: ../assets/logo_struct.png
date: 2024-08-01
---

# Clean code no Front-End

## Composition pattern

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

## Custom Hooks

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

```tsx /useUserForm.tsx
import useLocalStorage from "/hooks/useLocalStorage";

export default function useUserForm() {
  const [nome, setNome] = useLocalStorage("nome", "");
  const [idade, setIdade] = useLocalStorage("idade", "");

  const handleSubmit = (e) => {
    //...
  };

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleIdadeChange = (e) => {
    setIdade(e.target.value);
  };
  return {
    nome,
    setNome,
    idade,
    setIdade,
    handleSubmit,
    handleNomeChange,
    handleIdadeChange,
  };
}
```

```tsx /userForm.tsx
import useUserForm from "./useUserForm";

export default function userForm() {
  const form = useUserForm();

  return (
    <form>
      <input onChange={form.handleNomeChange} defaultValue={form.name} />
      <input onChange={form.handleIdadeChange} defaultValue={form.idade} />
      <button onSubmit={form.handleSubmit}></button>
    </form>
  );
}
```

## Libs

Um exemplo bom de biblioteca é a função `cn` utilizada no exemplo de composition pattern, pois ela é uma lógica que não é responsibilidade do componente e pode ser reutilizada em diversos componentes.

```ts /lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
```
