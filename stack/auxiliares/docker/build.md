---
order: 4
icon: tools
label: "Fazendo o build"
author:
  name: Pedro Santos
date: 2025-10-28
category: Explicação
tags:
  - explicacao
  - images
---

# Fazendo a build de uma image

Com uma dockerfile em mãos, prosseguimos para construir, ou fazer o build de uma image. O comando usado para isso é o comando `docker build`, que segue o formato:

`docker build [OPTIONS] PATH | URL`

Onde `[OPTIONS]` indica as flags e `PATH|URL` indica o contexto de execução, que pode ser um diretório local ou um repositório remoto.

O comando build busca um arquivo com o nome Dockerfile dentro do contexto de execução e o usa para construir a image, por isso é mais conveniente sempre usar esse nome. Abaixo estão algumas flags interessantes que podem ser usadas para modificar o comportamento do comando build. A documentação introdutória para este assunto pode ser acessada em https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/.

## Flags frequentemente usadas

`--no-cache`: assegura que a build seja totalmente refeita, ignorando o cache de execuções prévias.

`-f <file>`: faz com que o docker busque e utilize o arquivo de nome `file` para a construção, ao invés de buscar o arquivo de nome padrão Dockerfile.

`--label <variable>=“<value>”`: permite adicionar metadados à build.

-`t <name>:<tag>`: adiciona tags à imagem, como nome e versão, caso não seja especificado o docker sempre utiliza a tag “:latest” como padrão.

## Comandos relacionas à images

Aqui estão alguns comandos mais frequentemente utilizados para gerenciar images docker.

-`docker image ls`: lista as images presentes no sistema.

-`docker image pull [OPTIONS] NAME[:TAG|@DIGEST]`: faz download de uma image em um registro remoto.

-`docker image push [OPTIONS] NAME[:TAG]`: faz upload de uma image para um registro remoto.

-`docker image rm [OPTIONS] IMAGE [IMAGE...]`: remove uma ou mais images.

-`docker image tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]`: cria uma nova tag para uma image já existente.

## Retomando o exemplo

Para fazer a build do servidor python simples demonstrado na seção anterior, utilizamos o seguinte comando, notando que é necessário estar no mesmo diretório que a dockerfile.

`docker build -t python-server:v1 .`

Utilizamos a flag `t` para nomear a image python-server, com a tag v1. Use o comando `docker image ls` para verificar que a image está de fato no seu sistema.  

