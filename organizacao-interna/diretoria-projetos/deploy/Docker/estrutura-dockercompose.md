---
order: 2
icon: repo
label: "Explorando Docker Compose"
author:
  name: Gabriel Ribeiro
  avatar: ../assets/logo_struct.png
category: Explicação
tags:
  - Docker Compose
  - Estrutura Docker Compose
  - Comandos Docker Compose
date: 2024-09-02
---

## O que é Compose?

O Docker Compose é uma ferramenta que facilita a orquestração de múltiplos containers Docker, permitindo que você defina e gerencie diversos containers de forma simplificada. Se você tem uma aplicação composta por diferentes serviços, como PHP e MySQL, em vez de criar manualmente cada container necessário para cada serviço, o Docker Compose permite que você especifique tudo em um único arquivo YAML. Nesse arquivo, você define quais containers são necessários e como eles devem ser configurados. Com isso, o processo de deploy da sua aplicação se torna muito mais eficiente, pois um único arquivo pode ser usado para criar, executar e atualizar todos os containers necessários de uma só vez.

## Comandos do Compose

Os comandos do Docker Compose são fundamentais para criar, iniciar, parar e gerenciar containers que trabalham juntos, simplificando a administração de ambientes complexos com vários serviços. A seguir, estão os comandos básicos mais utilizados no Docker Compose:

- **docker-compose build:** Realiza o apenas a etapa Build das imagens que serão usadas nos containers
- **docker-compose start:** Inicia os containers
- **docker-compose stop:** Para os containers
- **docker-compose restart:** Reinicia os containers
- **docker-compose ps:** Lista os containers
- **docker-compose up:** Cria e inicia os containers
- **docker-compose down:** Para e remove os containers
- **docker-compose logs:** Mostra o logs do containers
- **docker-compose scale:** Define o números de réplicas de um container

## Estrutura do arquivo YAML

A estrutura básica do arquivo YAML que controlará o Compose é essa:

```docker-compose.yml
version: '3.8'
networks:
volumes:

services:
  exemplo:
    image: 
    ports: 
    deploy:
    restart: 
    networks:
    volumes:
    environment:
```

No Docker Compose, cada container é tratado como um serviço, portanto, para declarar um container, é necessário especificá-lo dentro da seção services.

Para cada container definido em services, é importante especificar a imagem que será usada. A opção image permite indicar qual imagem será utilizada no container. Por exemplo, para criar um container MySQL, usamos image: mysql. Se você precisar construir uma imagem a partir de um Dockerfile, em vez de usar image, você usará a opção build, onde especificará o Dockerfile e o contexto para a construção da imagem.

A opção ports define quais portas do host serão mapeadas para o container, permitindo que ele ofereça serviços externamente. Por outro lado, a opção expose define as portas que o container abrirá para se comunicar com outros containers na mesma rede interna.

A opção networks especifica em quais redes o container irá participar, podendo incluir drivers e sub-redes. Já em volumes, você define os volumes que o container utilizará, permitindo que ele acesse ou crie volumes específicos no host.

Em environment, você pode definir as variáveis de ambiente que o container usará. A opção depends_on permite definir quais containers são necessários para a execução da sua aplicação. Por exemplo, uma aplicação PHP pode depender de um container MySQL para funcionar corretamente.

### Exemplo de um Arquivo Compose

```docker-compose.yml
version: '3'
    services:
        db:
            image: mysql:5.7
            volumes:
                - db_data:/var/lib/mysql
            environment:
                MYSQL_ROOT_PASSWORD: somewordpress
                MYSQL_DATABASE: wordpress
                MYSQL_USER: wordpress
                MYSQL_PASSWORD: wordpress

        wordpress:
            depends_on:
            - db
            image: wordpress:latest
            ports:
            - "8000:80"
            environment:
                WORDPRESS_DB_HOST: db:3306
                WORDPRESS_DB_USER: wordpress
                WORDPRESS_DB_PASSWORD: wordpress

volumes:
    db_data:
```

Esse arquivo docker-compose.yml define a configuração para um ambiente WordPress com um banco de dados MySQL.

1. Versão: O arquivo usa a versão 3 do Docker Compose.

2. Serviços:
  - db: Usa a imagem `mysql:5.7` para criar um contêiner MySQL.
    Monta um volume `db_data` no diretório `/var/lib/mysql` dentro do contêiner, onde os dados do banco de dados serão armazenados.
    Define variáveis de ambiente para configurar o banco de dados, incluindo a senha do root, o nome do banco de dados, o usuário e a senha do usuário.
  - wordpress:
  Depende do serviço db, garantindo que o MySQL esteja funcionando antes de iniciar o WordPress.
  Usa a imagem `wordpress:latest` para criar um contêiner WordPress.
  Mapeia a porta 8000 do host para a porta 80 do contêiner, permitindo o acesso ao site WordPress em `http://localhost:8000`.
  Define variáveis de ambiente para conectar o WordPress ao banco de dados, especificando o host do banco, o usuário e a senha.

3. Volumes:
  - db_data: Um volume nomeado usado para persistir os dados do banco de dados MySQL entre reinicializações dos contêineres.

Essencialmente, o arquivo configura um ambiente de desenvolvimento local para WordPress com MySQL, garantindo que ambos os serviços se comuniquem corretamente e que os dados do banco sejam persistentes.








