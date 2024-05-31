---
icon: rocket
label: Essencial
order: 1
date: 2024-04-27
author:
  name: Guilherme Sampaio
---

# Essencial de Tamagui


## Estilização

Se você está familiarizado com CSS e Tailwind, a estilização será simples, por exemplo abaixo está listado a diferença da estilização do Tamagui e estilização padrão do CSS.

| Tamagui         | CSS {.compact}         |
| --------------- | ---------------------- |
| bg="red"        | background-color: red; |
| p="$10"         | padding: 10px          |
| color="#ffffff" | color: #ffffff;        |
| dsp="flex"      | display: flex;         |

Lembrando que você tem total liberdade para abreviar as propriedades, por exemplo em vez de definir display="flex", você pode dsp="flex".

Abaixo você pode observar como colocar 2 elementos em display flex, um ao lado do outro usando a estilização do Tamagui:

```html
<View display="flex" margin="auto" flexDirection="row">
  <Text backgroundColor="red" color="#ffffff" ta="center"> Elemento 1 </Text>
  <Text backgroundColor="green" color="#ffffff" ta="center"> Elemento 2 </Text>
</View>
```

## Componentes disponibilizados

Existem diversos componetes UI prontos do Tamagui. No link abaixo você poderá ver todos os componentes detalhadamente.

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

![](/assets/dev-app/Buttons.png)

Como usar:

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

### Switch

![](/assets/dev-app/Switch.png)

```tsx
import { Switch } from "tamagui"; // or '@tamagui/switch'
export default () => (
  <Switch size="$4">
    <Switch.Thumb animation="bouncy" />
  </Switch>
);
```

### AlertDialog

Mostrar um prompt de alerta em uma caixa de diálogo, por exemplo poderia ser um alerta a uma ação de confirmação de remoção.

Como usar:

```jsx
import { AlertDialog, Button, XStack, YStack } from "tamagui";
export function AlertDialogDemo() {
  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <Button>Show Alert</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>Accept</AlertDialog.Title>

            <AlertDialog.Description>
              By pressing yes, you accept our terms and conditions.
            </AlertDialog.Description>
            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action asChild>
                <Button theme="active">Accept</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
```

### Dialog

Mostre um modal com layout configurável e ações acessíveis.

Como usar:

```tsx
import { X } from "@tamagui/lucide-icons";
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Sheet,
  TooltipSimple,
  Unspaced,
  XStack,
} from "tamagui";

export function DialogDemo() {
  return <DialogInstance />;
}
function DialogInstance() {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button>Show Dialog</Button>
      </Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Edit profile</Dialog.Title>

          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>

          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Name
            </Label>

            <Input flex={1} id="name" defaultValue="Nate Wienert" />
          </Fieldset>

          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="username">
              <TooltipSimple
                label="Pick your favorite"
                placement="bottom-start"
              >
                <Paragraph>Food</Paragraph>
              </TooltipSimple>
            </Label>

          </Fieldset>
          <XStack alignSelf="flex-end" gap="$4">
            <DialogInstance />
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>
          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### Avatar

Exibe imagens com aspecto fixo com um substituto durante o carregamento.

![](/assets/dev-app/Avatar.png)

Como usar:

```tsx
import { Avatar } from "tamagui";
export default () => (
  <Avatar circular size="$6">
    <Avatar.Image src="http://picsum.photos/200/300" />

    <Avatar.Fallback bc="red" />
  </Avatar>
);
```

### Card

Cartões grandes e temáticos com uma API flexível.

![](/assets/dev-app/Card.png)

Como usar:

```jsx
import type { CardProps } from "tamagui";

import { Button, Card, H2, Image, Paragraph, XStack } from "tamagui";
export function CardDemo() {
  return (
    <XStack $sm={{ flexDirection: "column" }} paddingHorizontal="$4" space>
      <DemoCard
        animation="bouncy"
        size="$4"
        width={250}
        height={300}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
      />

      <DemoCard size="$5" width={250} height={300} />
    </XStack>
  );
}
export function DemoCard(props: CardProps) {
  return (
    <Card elevate size="$4" bordered {...props}>
      <Card.Header padded>
        <H2>Sony A7IV</H2>

        <Paragraph theme="alt2">Now available</Paragraph>
      </Card.Header>

      <Card.Footer padded>
        <XStack flex={1} />

        <Button borderRadius="$10">Purchase</Button>
      </Card.Footer>

      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            uri: "uri_imagem",
          }}
        />
      </Card.Background>
    </Card>
  );
}
```

### Image

Insira imagens da web ou localmente com adereços de estilo do Tamagui.

Como usar:

```jsx
import { Image } from "tamagui";

export function ImageDemo() {
  return (
    <Image
      source={{
        uri: "https://picsum.photos/200/300",
        width: 200,
        height: 300,
      }}
    />
  );
}
```

## useMedia

Com o useMedia você pode definir media queries de diferentes tamanhos de tela.

No arquivo `tamagui.config.ts` as configurações estarão da seguinte forma:

```ts
export default createTamagui({
  media: {
    xs: { maxWidth: 660 },
    gtXs: { minWidth: 660 + 1 },
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    md: { maxWidth: 980 },
    gtMd: { minWidth: 980 + 1 },
    lg: { maxWidth: 1120 },
    gtLg: { minWidth: 1120 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  },
});
```

Como usar:

Em qualquer componente, importe `useMedia` de tamagui.

```tsx
import { Button, XStack, useMedia } from "tamagui";
export default () => {
  return (
    <XStack
      backgroundColor="red"
      $gtSm={{
        backgroundColor: "green",
      }}
      $gtMd={{
        backgroundColor: "blue",
      }}
    ></XStack>
  );
};
```

O código acima diz que: Quando a tela estiver numa resolução maior que 860px o elemento XStack aplicará a propriedade backgroundColor green e se a tela estiver maior que 980px aplicará o backgroundColor blue e para as telas restantes, no caso menor que Sm (860px), será red.
