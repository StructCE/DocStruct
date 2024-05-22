---
icon: paintbrush
label: Tamagui
order: 1
date: 2024-04-27
author:
  name: Guilherme Sampaio
---

# Tamagui

## O que é

Tamagui acelera o processo de desenvolvimento contendo componentes prontos para Android e iOS. Ele se concentra na saída nativa da plataforma, com um compilador de otimização opcional que melhora significativamente o desempenho do seu aplicativo ou site e possui sua propria forma de estilização.

Para mais detalhes leia a documentação em: [tamagui.dev/docs/intro/introduction](https://tamagui.dev/docs/intro/introduction)

## Configuração e Instalação

Há várias formas de instalar Tamagui em nosso projeto ou adicionar, mas como estaremos trabalhando com o Expo + Web, iremos começar da seguinte forma:

Com o npm instalado em seu computador, instale o yarn globalmente, pois yarn é o gerenciador de dependências recomendado pela expo:

```
npm i -g yarn

```

Após instalar o yarn, faça a criação de seu projeto em cima de um templete com Expo + Web e Tamagui usando o comando abaixo:

```
npm create tamagui@latest --template project_name

```

Com o projeto criado, navegue até apps/expo e rode o projeto de acordo com a suas preferências de configurações.

## Estilização

Se você está familiarizado com CSS e Tailwind, a estilização será simples, por exemplo abaixo está listado a diferença da estilização do Tamagui e estilização padrão do CSS.

| Tamagui         | CSS {.compact}         |
| --------------- | ---------------------- |
| bg="red"        | background-color: red; |
| p="$10"         | padding: 10px          |
| color="#ffffff" | color: #ffffff;        |
| display="flex"  | display: flex;         |

Lembrando que você tem total liberdade para abreviar as propriedades, por exemplo em vez de definir display="flex", você pode dsp="flex".

Abaixo você pode observar como colocar 2 elementos em display flex, um ao lado do outro usando a estilização do Tamagui:

```html
<View display="flex" margin="auto" flexDirection="row">
  <Text backgroundColor="red" color="#ffffff" ta="center"> Elemento 1 </Text>
  <Text backgroundColor="green" color="#ffffff" ta="center"> Elemento 2 </Text>
</View>
```

## Componentes disponibilizados

Existem diversos componetes UI prontos do Tamagui. Na no link abaixo você poderá ver todos os componentes detalhadamente.

[!ref Componentes](https://tamagui.dev/ui/intro)

Exemplo de componentes que serão mais utilizados

### XStack e YStack

XStack e YStack são componetes de propriedades flexíveis, ou seja, XStack seria como uma View com display flex e YStack uma View com display flex porém com propriedade flex direction column.

```tsx
<XStack>
  <View p="$4" bg="blue"></View>
  <View p="$4" bg="red"></View>
</XStack>

<YStack>
  <View p="$4" bg="white"></View>
  <View p="$4" bg="green"></View>
</YStack>
```

### Botão

![](/dev-app/images/Buttons.png)

```tsx
import { Activity, Airplay } from "@tamagui/lucide-icons";
import { Button, XGroup, XStack, YStack } from "tamagui";

export function ButtonDemo(props) {
  return (
    <YStack padding="$3" space="$3" {...props}>
      <Button>Simples</Button>
      <Button alignSelf="center" icon={Airplay} size="$6">
        Grande
      </Button>
      <XStack space="$2" justifyContent="center">
        <Button size="$3" theme="active">
          Ativo
        </Button>
        <Button size="$3" variant="outlined">
          Delineado
        </Button>
      </XStack>
      <XStack space="$2">
        <Button themeInverse size="$3">
          Inverso
        </Button>
        <Button iconAfter={Activity} size="$3">
          íconeDepois
        </Button>
      </XStack>
      <XGroup>
        <XGroup.Item>
          <Button width="50%" size="$2" disabled opacity={0.5}>
            desabilitado
          </Button>
        </XGroup.Item>

        <XGroup.Item>
          <Button width="50%" size="$2" chromeless>
            sem cromo
          </Button>
        </XGroup.Item>
      </XGroup>
    </YStack>
  );
}
```

```js
import { Button } from "tamagui";
export default () => <Button size="$6">Lorem ipsum</Button>;
```

### Switch

### AlertDialog

### Dialog

### Toast

### vatar

### Card

### Image
