---
order: 1
icon: versions
label: "O compose"
author:
  name: Pedro Santos
date: 2025-10-28
category: Explicação
tags:
  - explicacao
  - images
  - compose
---

# O que é Docker compose

Docker compose é uma ferramenta para definir e manter aplicações multi-container. Esta ferramenta facilita a manutenção
da aplicação, suas redes e volumes, ao permitir a configuração em um único arquivo YAML.

## Instalação

Para instalar o plugin do docker compose, basta usar o seguinte comando:

```bash
sudo apt-get install docker-compose-plugin
```

## Exemplo

Este exemplo foi copiado da documentação oficial do docker compose, disponível em https://docs.docker.com/compose/gettingstarted/#step-1-set-up.

```bash
 mkdir composetest
 cd composetest
```

```python3 app.py
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return f'Hello World! I have been seen {count} times.\n'
```

```requirements.txt
flask
redis
```

```docker Dockerfile
FROM python:3.10-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run", "--debug"]
```

Até agora estes foram os passos padrão para definir uma image, para usar o compose é preciso criar um arquivo de configuração YAML.

```yaml compose.yaml
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
```

Esse arquivo define 2 serviços, `web` e `redis`. O serviço `web` utiliza dockerfile presente no diretório para fazer o build, e utiliza uma conexão entre as portas do container e uma porta externa.

## Building

Para fazer o build usando o docker compose, use o comando:

`docker compose up`

É possível utilizar as flags para execução de container no docker compose, por exemplo, `-d` faz com que os containers rodem no background.

## Alguns comandos interessantes

A lista completa de comandos pode ser acessada em https://docs.docker.com/reference/cli/docker/compose/.

- `docker compose down [OPTIONS] [SERVICES]`: Interrompe e remove containers, redes e volumes criados por um comando `up`.

- `docker compose images [OPTIONS] [SERVICE]`: lista as imagens utilizadas por containers.

- `docker compose kill [OPTIONS] [SERVICE]`: força a interrupção de containers.

- `docker compose ls [OPTIONS]`: lista os projetos compose sendo executados.

- `docker compose ps [OPTIONS] [SERVICE]`: lista e fornece informações acerca dos containers em um projeto compose.

- `docker compose pull [OPTIONS] [SERVICE]`: faz download de uma image associada a um serviço definido por um arquivo `compose.yaml`.

- `docker compose up [OPTIONS] [SERVICE]`: builda, cria e inicia containers para um serviço.

## Documentação para YAML

A documentação para os arquivos `compose.yaml` é extremamente extensa, a documentação oficial pode ser acessada em https://docs.docker.com/reference/compose-file/. 

