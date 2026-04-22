---
order: 6
icon: book
label: "Conceitos"
author:
  name: Pedro Santos
date: 2025-10-28
category: Conceitos importantes
tags:
  - fundamentos
  - explicacao
---

# Antes de iniciar...

Antes de iniciar a explicação sobre como usar docker para desenvolver suas aplicações, é necessário falar sobre alguns conceitos essenciais para a compreensão dos próximos tópicos. A documentação introdutória oficial para este assunto está disponível em https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/.

# Docker images

Container é como chamamos os processos sendo executado por uma máquina, mas como o container sabe qual é sua tarefa e quais são as dependencias necessárias para executar tal tarefa? Utilizando uma image.

Uma image é como chamamos o pacote que inclui os arquivos binários, dependências, bibliotecas e configurações para um container. Em termos da programação orientada à objetos, a docker image é uma classe, e os containeres são instâncias dessa classe.

É importante notar que images são imutáveis, uma vez criadas, só podem ser alteradas adicionado mudanças ou criando uma nova image do zero. Além disso, images são construídas em camadas, cada camada representa uma mudança no sistema de arquivos, adicionando, removendo ou modificando arquivos.

# Docker registry

Para compartilhar docker images, existem os docker registries, plataformas que permitem armazenamento e compartilhamento de images, de modo similar ao github, mas exclusivas para images. O registro oficial do docker é o DockerHub, que pode ser acessado em https://hub.docker.com/. Há outros registros, por exemplo, as grandes empresas fornecedoras de computação em nuvem, como Amazon (Amazon Elastic Container Registry) , Microsoft (Azure container registry), e Google (Google Container Registry) também oferecem registros para containeres.

