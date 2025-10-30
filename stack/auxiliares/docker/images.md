---
order: 4
icon: paste
label: "Escrevendo images"
author:
  name: 
date: 2025-10-28
category: Explicação
tags:
  - fundamentos
  - explicacao
  - images
---

# Criando uma image

Para criar uma image, utilizamos uma dockerfile, que é um arquivo contendo instruções acerca de como construir a image requerida. Uma boa prática é sempre criar a dockerfile no mesmo diretório dos arquivos que serão necessários para o container. É comum escrever os comandos dentro de uma dockerfile utilizando letras maiúsculas, abaixo estão alguns comandos mais comunmente utilizados. A documentação introdutória oficial para este assunto pode ser acessada em https://docs.docker.com/get-started/docker-concepts/building-images/.

## Comandos mais utilizados

-`FROM <image>`: especifica uma image já existente para ser usada como base.

-`WORKDIR <path>`: especifica o diretório de trabalho atual dentro da image, ou seja, onde os próximos comandos serão executados e para onde os arquivos devem ser copiados. Caso o diretório ainda não exista, ele será criado automaticamente.

-`COPY <src> <dest>`: copia o arquivo `src` para dentro da image no path `dest`.

-`ADD <src> <dest>`: faz a mesma coisa que copy, mas permite que src seja uma URL.É importante notar que, caso `src` seja um arquivo .tar, este comando irá automaticamente fazer a extração dos arquivos no interior do .tar.

-`RUN <command>`: faz com que o construtor execute o comando especificado.

-`ENV <name> <value>`: define uma variável de ambiente.

-`EXPOSE <port>`: esse comando meramente indica ao usuário em qual porta o construtor da image gostaria que o container fosse exposto, porém não realiza de fato nenhuma ação.

-`CMD [“<command>”, “<arg1>”]`: especifica o comando padrão a ser executado pela image.

## Exemplo prático

Como exemplo, vamos fazer uma Dockerfile para um server http simples usando python, o server retorna apenas uma página com "Hello world".

```bash

mkdir Dockerteste
cd Dockerteste
touch server.py
touch index.html
touch Dockerfile
```

```python Dockerteste/server.py
from http.server import SimpleHTTPRequestHandler, HTTPServer

server = HTTPServer(("0.0.0.0", 8000), SimpleHTTPRequestHandler)
server.serve_forever()
```

```html Dockerteste/index.html
<h1> Hello world <h1>
```

```docker Dockerteste/Dockerfile
FROM ubuntu

RUN apt-get update
RUN apt-get install -y python3

WORKDIR /server
COPY index.html .
COPY server.py .

EXPOSE 8000
CMD ["python3", "server.py"]
```

Cada comando na Dockerfile de exemplo realiza os seguintes passos:

-`FROM ubuntu`: especifica que queremos usar uma image já existente do SO ubuntu.

-`RUN apt-get update`: executa o comando de busca de atualizações.

-`RUN apt-get install -y python3`: executa o comando para instalação do python.

-`WORKDIR /server`: cria o diretório `/server` e o configura como diretório de trabalho atual.

-`COPY index.html`: copia `index.html` para o diretório `/server`.

-`COPY server.py`: copia `server.py` para o diretório `/server`.

-`EXPOSE 8000`: mostra que queremos expor o container na porta 8000.

-`CMD ["python3", "server.py"]`: executa o comando "python3 server.py" ao iniciar o container.

## Podemos usar um .dockerignore

Caso não queira que o docker ignore completamente um arquivo específico, basta criar um arquivo `.dockerignore` e incluir o nome do arquivo. Assim como o `.gitignore`, os arquivos nomeados serão totalmente ignorados.
