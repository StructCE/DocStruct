---
label: "Introdução ao clean code"
icon: search
order: 1
author:
  name: Pedro Amorim
date: 2024-08-01
---

# Introdução

A construção de um projeto se torna extremamente complexo com o passar do tempo, pois cada `feature` requer uma construção lógica que pode interagir com diferentes partes do código causando acoplamento, um `fix` pode quebrar uma dependência, etc. Para reduzir o atrito no desenvolvimento, o programador pode aplicar técnicas que melhoram legibilidade, entendimento e manutenção do código. Essas técnicas podem ser padrões de código `patterns` ou princípios como `SOLID` e `DRY`.

# Princípios do clean code

Clean code é um livro famoso da área de computação que apresenta técnicas que podem ser utilizadas para melhorar a qualidade do código e, consequentemente, do projeto.

## Evite escrever números diretamente no código (Hard-coded numbers)

Escrever expressões com números diretos no código pode gerar confusão em futuras correções ou refatorações e até mesmo bugs quando existe duplicação de código, mas uma alteração não ocorre em todas as áreas necessárias. Dê significado ao código para melhorar o entendimento de cada linha e, para resolver o problema anteriormente descrito, o número pode ser substituído por uma constante com um nome que representa bem a utilidade daquele número na expressão.

```ts
function tempoDeViagemSuperficieTerraCentroTerraEmH(velocidade: number) {
  // return 6371 / velocidadeKmH
  const RAIO_TERRA_KM = 6371;
  return RAIO_TERRA_KM / velocidadeEmKmH;
}
```

## Use nomes significativos e descritivos

Utilize nomes que descrevem a funcionalidade de uma função, o valor de uma variável ou conteúdo de um arquivo sem causar ambiguidade e proporcionando detalhes. Nomear coisas é um dos maiores desafios quando se está escrevendo um código e com certeza é uma das principais características a ser olhada. Um bom código precisa ser legível e entendível, então, utilize bons nomes para os elementos do seu projeto.

```ts
/*
function tempoSuperficieCentro(velocidade: number) {
  const RAIO = 6371;
  return RAIO / velocidade;
}
*/

function tempoDeViagemSuperficieTerraCentroTerraEmH(velocidadeEmKmH: number) {
  const RAIO_TERRA_KM = 6371;
  return RAIO_TERRA_KM / velocidadeEmKmH;

```

!!!
Um nome bem escrito vale mais que um comentário mal feito.
!!!

## Escreva comentários significativos

Escreva comentários quando avaliar necessário a explicação de uma funcionalidade ou lógica para um melhor entendimento do código. Quando for escrevê-los não êxite em colocar os detalhes da implementação. Evite escrever comentários superficiais.

```ts
/*
function tempoDeViagemSuperficieTerraCentroTerraEmH(velocidadeEmKmH: number) {
  const RAIO_TERRA_KM = 6371;
  return RAIO_TERRA_KM / velocidadeEmKmH;
*/

function tempoDeViagemSuperficieTerraCentroTerraEmH(velocidadeEmKmH: number) {
  // Função retorna o tempo, em horas, para que um objeto viajando a dada velocidade em Km/h cruze da superficie do planeta terra até ao seu centro.
  const RAIO_TERRA_KM = 6371;
  return RAIO_TERRA_KM / velocidadeEmKmH;
}
```

## Evite duplicação de código ou lógica

Duplicação de código é um dos problemas que pode ser encontrado no desenvolvimento de um programa. Ela pode gerar bugs e mais trabalho para manutenções futuras. Evite repetir blocos idênticos de código e priorize a formulação de funções para substituí-los.

```ts
/*
function raizesDeUmaFuncaoQuadratica(a: number, b: number, c: number) {
  x1 = (-b + Math.sqrt(Math.pow(b, 2) - (4 * a * c)))/2;
  x2 = (-b - Math.sqrt(Math.pow(b, 2) - (4 * a * c)))/2;
  return `x1 = ${x1} e x2 = ${x2}`;
*/

function raizesDeUmaFuncaoQuadratica(a: number, b: number, c: number) {
  function delta(a: number, b: number, c: number) {
    return Math.sqrt(Math.pow(b, 2) - 4 * a * c);
  }
  x1 = (-b + delta(a, b, c)) / 2;
  x2 = (-b - delta(a, b, c)) / 2;
  return `x1 = ${x1} e x2 = ${x2}`;
}
```

## Siga padrões de escrita de código

Veja qual padrão de escrita de código sua equipe usa como formatador e forma de escrita dos nomes como camelCase e snake_case. Pode não parecer muito importante, mas quando a quantidade de linhas cresce seguir esses padrões pode ajudar na identificação dos elementos.

## Evite aninhar blocos if else e escrever expressões grandes nas verificações

Estruturas de controle de fluxo estão presentes em boa parte do código, desse modo, a escrita delas deve ser feita com o objetivo de realizar a lógica e manter um bom nível de legibilidade. Blocos aninhados tendem a dificultar o entendimento do fluxo do programa. Para melhorar a legibilidade, utilize a técnica `early return` que será demonstrada abaixo. Outro ponto nessa questão é a utilização de expressões complexas nos Ifs, variando a lógica talvez seja possível quebrar em outras checagens e realizar `early return`, se não for possível, é recomendado a substituição da expressão de checagem por uma função com um nome descritivo.

```ts
/*
function apiAutenticacaoCamadaMaxima(session: Session | null) {
  
  if (session) {
    if (session.user) {
      if (session.user.admin)
      return 200;
    }
  }

  return 401;
}
*/

function apiAutenticacaoCamadaMaxima(session: Session | null) {
  if (!session) {
    return 401;
  }

  if (!session.user) {
    return 401;
  }

  if (!session.user.admin) {
    return 401;
  }

  return 200;
}
```

## Utilize ferramentas de versionamento

O padrão é a utilização do `git` e `github` para controlar a versão do código. A utilização correta dessas ferramentas auxilia tanto na manutenção do código como no desenvolvimento. Toda mudança seja `feature`, `fix`, etc. deve passar por uma branch auxiliar. Caso você não tenha 100% de certeza do que está fazendo ou não testou direito nunca commit direto na `main`. Quebrar a `main` causa muita dor de cabeça, enquanto uma branch nova pode ser subida a qualquer instante.
