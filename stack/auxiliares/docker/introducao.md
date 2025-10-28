---
order: 6
icon: question
label: "O que é docker?"
author:
  name: 
date: 2025-10-28
category: Explicação
tags:
  - fundamentos
  - explicacao
---

# O que é docker?

Docker é uma plataforma para desenvolvimento, distribuição e execução de aplicações. É uma plataforma baseada em containers, permitindo isolamento e segurança entre diferentes processos. Como containers são feitos para consumirem poucos recursos, isso permite o uso eficiente de recursos, ao distribuir a memória e poder computacional entre diversos containers.

# O que é um container?

Um container é uma unidade de software que contém todos os pacotes necessários para rodar uma determinada aplicação. Esses containeres funcionam como processos isolados, rodando em um ambiente próprio. Isso garante alguns benefícios, como:

-Independência: como cada container existe em um ambiente isolado, é possível evitar conflitos de dependência entre processos ao incluir diferentes versões de bibliotecas em cada container.

-Velocidade: containers podem ser iniciados e finalizados em um intervalo de tempo muito pequeno(segundos ou minutos), permitindo mais rapidez no desenvolvimento, manutenção e distribuição de aplicações.

-Segurança: como cada container é um ambiente isolado, ataques ou falhas de segurança em um container não podem afetar outros containeres e nem a máquina que está executando o processo.

-Portatibilidade: containers podem rodar em qualquer máquina que suporte o sistema docker, desde computadores pessoais até ambientes de nuvem.

## Containers não são máquinas virtuais

Enquanto VM’s são abstrações de uma máquina física, containeres são abstrações à nível de aplicação. Máquinas virtuais precisam ter um sistema operacional próprio, o que as faz consumir muitos recursos do sistema. Containeres não precisam de um sistema operacional instalad   o internamente, podendo compartilhar o kernel com outros containeres, o que demanda muito menos recursos.