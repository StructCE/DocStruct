---
order: 3
icon: container
label: "Explorando DockerFile"
author:
  name: Gabriel Ribeiro
  avatar: ../assets/logo_struct.png
category: Explicação
tags:
  - DockerFile
  - Comandos DockerFile
date: 2024-09-02
---

## O que é DockerFile?

O dockerfile nada mais é do que um arquivo onde você determina todos os detalhes do seu container, como, por exemplo, a imagem que você vai utilizar, aplicativos que necessitam ser instalados, comandos a serem executados, os volumes que serão montados, etc., etc., etc.!

É um makefile para criação de containers, e nele você passa todas as instruções para a criação do seu container.

Para entender melhor os conceitos e mergulhar mais fundo no Dockerfile, é importante diferenciar claramente entre um container e uma imagem.

## Imagem x Container

Uma imagem nada mais é do que uma representação imutável de como será efetivamente construído um container. Por conta disso, nós não rodamos ou inicializamos imagens, nós fazemos isso com os containers.

O ponto que temos que entender agora é o seguinte: escrevemos um Dockerfile, construímos uma imagem a partir dele executando o comando `docker build`, e, por fim, criamos e rodamos o container com o comando `docker run`. O container é o fim enquanto a imagem é o meio.

## Executando um Dockerfile: Entendendo os Comandos

### FROM

O comando FROM é um dos mais importantes em um Dockerfile, e por uma boa razão: ele é obrigatório. Este comando define a imagem base a partir da qual sua nova imagem será construída. Por exemplo, se você quiser criar uma imagem que utilize Java, pode especificar a imagem do OpenJDK como base, assim:

`FROM openjdk`

No entanto, se você deseja criar uma imagem totalmente do zero, sem base em nenhuma imagem existente, você pode usar a imagem scratch.

`FROM scratch`

A imagem scratch é uma base vazia, que permite criar uma imagem completamente nova sem qualquer dependência de imagens anteriores. É uma maneira de começar com um ambiente completamente limpo e construir tudo a partir do início.

### RUN

A instrução RUN é bastante versátil. Ela pode ser utilizada uma ou várias vezes dentro de um Dockerfile, permitindo definir os comandos que serão executados durante a construção das camadas da imagem. Mas o que isso significa exatamente?

```dockerfile
FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install openjdk-8-jdk -y
```

Quando você executa o comando `docker build .`, além de baixar a imagem base do Ubuntu 18.04 para incorporá-la na sua nova imagem, o Docker também executa os comandos definidos. Primeiro, ele atualiza os repositórios do Ubuntu com `apt-get update`, e em seguida, instala o Java 8 com `apt-get install openjdk-8-jdk -y`. Esse processo envolve uma série de downloads e configurações para preparar o ambiente conforme especificado.

O RUN aceita parâmetros de dois jeitos:

`RUN apt-get install openjdk-8-jdk -y `ou `RUN ["apt-get", "install" "openjdk-8-jdk" ,"-y"]`

Ou seja, podemos passar os comandos separadamente entre aspas dentro dos colchetes. O resultado é o mesmo.

### CMD e ENTRYPOINT

Não há muito mistério na instrução **CMD**, ela na verdade é bem parecida com a instrução **RUN**. Diferentemente do RUN, que executa o comando no momento em que está "buildando" a imagem, o CMD irá fazê-lo somente quando o container é iniciado.

```dockerfile
FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install openjdk-8-jdk -y
CMD touch arquivo-de-boas-vindas
```

Um detalhe super importante de mencionar é que quando estamos trabalhando com **CMD** é que quando executarmos o comando `docker run -it <id da imagem> /bin/bash` , ele sobrescreveria o comando `CMD touch arquivo-de-boas-vindas` e executaria apenas o `/bin/bash`.

Um outro teste também poderia ser:

```dockerfile
FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install openjdk-8-jdk -y
CMD touch arquivo-de-boas-vindas
CMD touch outro-arquivo
```

Quando inicializei o container, percebi que apenas o "outro-arquivo" foi criado. Mas por que isso aconteceu? O motivo é que, embora você possa ter várias instruções CMD em um Dockerfile, apenas a última será executada. As anteriores serão ignoradas, sem gerar nenhum erro.

Agora, quanto à instrução **ENTRYPOINT**, ela funciona de forma semelhante ao CMD, mas com uma diferença importante: os parâmetros do ENTRYPOINT não são substituídos ou ignorados como acontece com o CMD.

### ADD e COPY

Os nomes dessas instruções são bastante autoexplicativos.

A instrução **ADD** é usada para copiar arquivos ou diretórios do sistema host para dentro da imagem. Além disso, ADD também permite fazer o download de arquivos diretamente de uma URL para dentro da imagem.

Já a instrução **COPY** serve exclusivamente para copiar arquivos ou diretórios do sistema host para a imagem. Diferente do ADD, COPY não permite downloads de URLs.

### LABEL

O comando **LABEL** é utilizado para adicionar metadados às suas imagens Docker. Esses metadados podem incluir informações como o autor da imagem, a versão da aplicação, descrição, e qualquer outro dado relevante que ajude a identificar ou documentar a imagem.

**Sintaxe:**

```dockerfile
LABEL <key>=<value> <key>=<value> ...
```

**Exemplo:**

```dockerfile
LABEL maintainer="seu_email@exemplo.com"
LABEL version="1.0"
LABEL description="Imagem para a aplicação Next.js"
```

### EXPOSE

Existe uma certa confusão em relação ao uso da instrução **EXPOSE**. Muitos acreditam que ela define em qual porta a aplicação irá rodar dentro do container, mas, na verdade, o objetivo principal é apenas de documentação.

Essa instrução não realiza a publicação da porta de fato; seu propósito é comunicar as intenções de quem escreveu o Dockerfile para quem irá executar o container, indicando quais portas devem ser expostas para comunicação interna entre containers.

```dockerfile
FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install openjdk-8-jdk -y
EXPOSE 8080
```

Logo, o Dockerfile acima não faz a publicação da porta, apenas serve como documentação.

### VOLUME

Essa instrução cria uma pasta em nosso container que será compartilhada entre o container e o host, funcionando do seguinte modo:

```dockerfile
FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install openjdk-8-jdk -y
VOLUME /data
```

Quando criarmos um container dessa imagem, ele criará uma pasta chamada data. Todo arquivo criado dentro dessa pasta será acessível a partir da máquina host no caminho `/var/lib/docker/volumes`.

### WORKDIR

Essa instrução tem o propósito de definir o nosso ambiente de trabalho. Com ela, definimos onde as instruções CMD, RUN, ENTRYPOINT, ADD e COPY executarão suas tarefas, além de definir o diretório padrão que será aberto ao executarmos o container.

### ENV

O comando **ENV** define variáveis de ambiente que estarão disponíveis durante o processo de construção e execução do contêiner. Essas variáveis podem ser usadas para configurar o comportamento da aplicação ou para armazenar informações sensíveis, como credenciais e URLs de serviços. Como veremos mais adiante na aplicação específica do repositório T3.

### ARG

O comando **ARG** define variáveis de build, que são usadas durante a construção da imagem Docker. Diferente das variáveis definidas com ENV, as variáveis ARG só estão disponíveis durante o processo de construção e não persistem no container final.
