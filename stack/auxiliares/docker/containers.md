---
order: 3
icon: rocket
label: "Executando um container"
author:
  name: 
date: 2025-10-28
category: Explicação
tags:
  - fundamentos
  - explicacao
---


# Rodando containers

Se já temos uma image, podemos executar um container a partir dessa image, para isso, utilizamos o comando `docker run`, que tem o seguinte formato.

`docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]`

Caso o docker não encontre localmente a image que você deseja rodar, ele fará uma busca no registro remoto configurado, o registro padrão é o dockerhub. A documentação introdutória oficial para este assunto está disponível em https://docs.docker.com/get-started/docker-concepts/running-containers/publishing-ports/

## Flags para o comando run

Abaixo estão algumas flags frequentemente utilizadas para modificar o comando de execução.

`--name <custom-name> <image>`: designa o nome `custom-name` ao container, caso não seja especificado, docker vai gerar um nome aleatório.

`-p <host-port>:<container-port>`: conecta a porta `host-port` à porta `container-port` do container.

`-d`: roda o container no background, ou seja, não ocupa o terminal atual.

`-e <var>=<value>`: define uma variavel de ambiente.

`--rm`: encerra o container quando a execução deste for concluida.

`-- memory <value>`: especifica um limite de memoria para o container, caso o limite seja ultrapassado o container é encerrado.

`-t`: conecta o terminal ao I/O stream do container.

`-i`: permite enviar texto ao stdin(input padrão) do container.

## Comandos úteis para o gerenciamento de containers

Aqui estão alguns comandos frequentemente utilizados para o gerenciamento de containers.

`docker ps`: lista os containers ativos.

`docker kill <container-name>`: finaliza um container de maneira abrupta.

`docker stop <container-name>`: finaliza um container, esperando um certo tempo por seu encerramento.

`docker port <container-name>`: lista as portas utilizadas por um container.

`docker stats <container-name>`: mostra os recursos atualmente utilizados pelo container.

`docker rename <container-name> <new-name>`: renomeia um container.

`docker restart <container-name>`: reinicia um container.

## Retomando o exemplo

Vamos rodar o servidor python que fizemos anteriormente, para isso, usamos o seguinte comando:

`docker run -p 8000:8000 -d server.py`

Verifique que o container está rodando utilizando o comando `docker ps`. Como nã utilizamos a flag `name`, nosso container recebeu automaticamente um nome aleatório.

Há algumas formas diferentes de interromper o container. A maneira mais "graciosa", de acordo com o docker, é utilizando o comando `docker stop`, pois este envia um sinal de parada ao container e espera seu encerramento. Ao contrário do `docker stop`, o comando `docker kill` finaliza abruptamente um container, o que pode comprometer processos que não são fechados corretamente.