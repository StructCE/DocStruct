---
order: 4
icon: book
label: "Indrodução ao Docker"
author:
  name: Gabriel Ribeiro
  avatar: ../assets/logo_struct.png
category: Explicação
tags:
  - container
  - Docker
  - instalação
date: 2024-09-02
---


## O que é container?

Containers são ambientes leves que agrupam uma aplicação e suas dependências, compartilhando o kernel do sistema operacional do host, o que os torna mais eficientes que máquinas virtuais. Ao contrário das VMs, que virtualizam um sistema operacional completo, os containers apenas isolam a aplicação e suas bibliotecas, permitindo maior portabilidade e melhor desempenho. Isso facilita a execução da aplicação em diferentes ambientes sem problemas de compatibilidade.

![A figura acima demostra as diferenças de quando temos aplicações sendo executadas nativamente, máquinas virtuais e por fim em containers.](/images/container.png)

## O que é Docker?


Docker é uma plataforma open-source que permite a automação do processo de desenvolvimento, implantação e execução de aplicações dentro de containers.


### História

Docker foi lançado em março de 2013 por Solomon Hykes, inicialmente como parte de um projeto interno da empresa dotCloud, uma plataforma como serviço (PaaS). A ideia de containers, que já existia em tecnologias como LXC (Linux Containers), foi aprimorada por Docker ao introduzir um formato padronizado para containers, tornando-o acessível e fácil de usar. A empresa dotCloud eventualmente mudou seu nome para Docker Inc., focando exclusivamente no desenvolvimento e aprimoramento do Docker. Desde então, Docker revolucionou a forma como aplicações são desenvolvidas e implantadas, ganhando adoção massiva na indústria de tecnologia.


### Importância

Docker simplificou significativamente o ciclo de vida do desenvolvimento de software. Antes do Docker, desenvolver e implantar aplicações de maneira consistente era um desafio, pois as dependências e o ambiente de execução variavam de máquina para máquina. Docker resolve esse problema ao empacotar a aplicação e todas as suas dependências em um container, garantindo que o software funcione da mesma maneira em qualquer ambiente. Isso acelera o desenvolvimento, facilita a colaboração entre equipes e reduz o tempo de entrega de novas funcionalidades ao mercado. Docker também desempenha um papel crucial em arquiteturas modernas de software, como microserviços, e é um componente essencial em pipelines de integração contínua (CI) e entrega contínua (CD).


## Instalando o Docker

### Instalando Docker no Debian/Ubuntu e derivados

Para instalar basta executar o comando abaixo:

```bash 
sudo apt install docker.io docker-compose
```

Após a instalação do Docker, é necessário garantir que ele seja iniciado automaticamente junto com o sistema e esteja disponível imediatamente para uso. Para fazer isso sem precisar reiniciar o servidor, utilize o seguinte comando:

```bash
sudo systemctl enable --now docker docker.socket containerd
```
Com o Docker já em execução, você pode acessar o menu de ajuda, que contém uma lista dos principais comandos disponíveis. Para isso, execute o seguinte comando:

```bash
docker --help
```

Para instruções detalhadas de instalação em diversas distribuições Linux, assim como em ambientes cloud, macOS e Windows, você pode acessar a [documentação oficial do Docker](https://docs.docker.com/engine/install/). Lá você encontrará guias completos e atualizados para garantir uma instalação bem-sucedida em qualquer ambiente.
