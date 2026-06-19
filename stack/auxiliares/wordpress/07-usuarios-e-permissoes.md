---
label: Usuários e Permissões
order: 40
---

# Usuários e Permissões no WordPress

## Visão geral

O WordPress possui um sistema nativo de usuários, permitindo criar contas com diferentes níveis de acesso ao sistema.

Cada usuário pode ter informações como:

- nome;
- e-mail;
- senha;
- função;
- permissões;
- perfil.

## Onde gerenciar usuários

Os usuários do sistema podem ser gerenciados pelo painel administrativo:

```text
Painel > Usuários
```

Nessa área, é possível criar, editar, visualizar e remover usuários.

## Funções padrão de usuários

O WordPress possui algumas funções nativas. As principais são:

- administrador;
- editor;
- autor;
- colaborador;
- assinante.

Plugins também podem adicionar novas funções, como cliente, vendedor, aluno, instrutor, membro ou fornecedor.

## Administrador

O administrador possui acesso total ao site.

Essa função permite:

- instalar e remover plugins;
- alterar configurações;
- gerenciar usuários;
- alterar temas;
- editar conteúdos;
- acessar áreas críticas do sistema.

Por ser uma função com muitos privilégios, deve ser usada com cuidado.

## Editor

O editor possui acesso às funções de gestão de conteúdo.

Ele pode criar, editar e publicar posts e páginas, incluindo conteúdos criados por outros usuários.

## Autor

O autor pode criar, editar e publicar seus próprios posts.

Ao contrário do editor, ele não pode manipular conteúdos de outros usuários.

## Colaborador

O colaborador pode criar e editar seus próprios posts, mas não pode publicá-los.

Normalmente, o conteúdo criado por um colaborador precisa ser revisado por um editor ou administrador antes da publicação.

## Assinante

O assinante é o nível mais baixo de permissão.

Ele pode apenas gerenciar informações associadas ao próprio perfil.

## Funções adicionadas por plugins

Em projetos como lojas virtuais, plataformas de cursos ou áreas de membros, alguns plugins podem adicionar novas funções.

Exemplos comuns:

- cliente;
- gerente;
- aluno;
- instrutor;
- membro;
- fornecedor.

### Cliente

Em lojas virtuais, o cliente pode acessar informações relacionadas à própria conta, como:

- carrinho;
- pedidos;
- métodos de pagamento;
- endereço;
- dados pessoais.

### Gerente

Em projetos com WooCommerce, a função de gerente pode permitir acesso a áreas como:

- pedidos;
- produtos;
- relatórios;
- informações da loja.

## Segurança

A função de cada usuário deve ser condizente com seu papel dentro do site.

A prática mais segura é fornecer o menor nível de permissão necessário para cada pessoa. Isso reduz o número de usuários com capacidade de alterar partes importantes do sistema.

Algumas boas práticas de segurança são:

- usar senhas fortes;
- usar uma conta por pessoa;
- remover usuários inativos;
- revisar permissões periodicamente;
- manter poucos administradores;
- documentar contas com alto nível de acesso;
- verificar funções criadas por plugins.
