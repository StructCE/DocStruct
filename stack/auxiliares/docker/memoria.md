---
order: 1
icon: cache
label: "Durabilidade de memória"
author:
  name: 
date: 2025-10-28
category: Explicação
tags:
  - fundamentos
  - explicacao
---

# Persistência de dados e containers

Quando um container é iniciado, ele usa os arquivos configurados na image. Embora o container possa criar, deletar e alterar arquivos ao longo de sua execução, os dados alterados são apagados ao finalizar o container. Para lidar com persistencia de dados, há 2 mecanismos possíveis, volume e bind. A documentação introdutória oficial para este assunto está disponível em https://docs.docker.com/get-started/docker-concepts/running-containers/persisting-container-data/.

## Volumes

Volumes são um mecanismo de persistência de dados que permite armazenar dados fora de um container. Esses arquivos são criados e gerenciados pelo docker, e ficam armazenados no host do container. Para criar um volume, usamos o comando à seguir:

`docker volume create <volume-name>`

Para conectar um volume à um container, operação chamado de "montar" um volume, é utilizada a flag -v ao iniciar o container:

`docker run -v <volume-name>:<source> <container-name>`

Isso faz como que todos os arquivos escritos em source sejam salvos no volume, que não é apagado quando o container é encerrado. Abaixo estão alguns comandos interessantes para o gerenciamento de volumes.

`docker volume ls`: lista os volumes

`docker volume rm <volume-name>`: apaga um volume, é necessário que este volume não esteja sendo utilizado por nenhum container, caso contrário sua destruição é bloqueada.

`docker volume prune`: remove todos os volumes não sendo usados por nenhum container.

`docker volume inspect <volume-name>`: fornece informações acerca do volume.

## Binds

Outro modo de adquirir durabilidade de dados é dar ao container acesso à arquivos no host, ou seja, compartilhar arquivos entre o host e o container. Para isso, o docker disponibiliza um mecanismo chamado bind, que pode ser feito com o seguinte comando:

`docker run --mount type=bind, source=<host-dir>, target=<container-dir> <container-name>`

Por exemplo, para bindar o seu diretorio /Documents para o diretorio /Documents de um container ubuntu, basta usar o seguinte comando:

`docker run --mount -ti type=bind, source = /home/<seu-username>/Documents, target=/Documents ubuntu`

Para fins de segurança, é possível fazer um bind read-only, basta adicionar a keyword `readonly`, separa por vírgula, após o argumento target.