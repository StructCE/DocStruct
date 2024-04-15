---
order: 1
icon: command-palette
label: "Exemplos"
author:
    name: Eduardo P.P. Ferreira
date: 2024-04-15
category: Exemplos
tags:
    - user interface
    - components
    - exemplos
---

# 

!!!info Documentação
Todos os exemplos apresentados aqui vieram da [documentação oficial](https://ui.shadcn.com/docs), que possui muitos exemplos a mais. Leia a documentação!
Lembrando que podemos adicionar componentes tanto por meio da CLI quanto copiando e colando o código.
!!!

# Tabs (Abas)

Adicione o arquivo do componente:

```bash
npx shadcn-ui@latest add tabs
```

Adicione o componente em alguma página sua:

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
    );
}
```

![Exemplo de Abas](../../assets/exemplos/shadcn_tabs.png)

# Label + Radio Group

```bash
npx shadcn-ui@latest add label
npx shadcn-ui@latest add radio-group
```

```typescript
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Page() {
    return (
        <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one"> Default </Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two"> Comfortable </Label>
            </div>
            <div>
                <RadioGroupItem value="option-three" id="option-three" />
                <Label htmlFor="option-three"> Compact </Label>
            </div>
        </RadioGroup>
    );
}

```

![Exemplo de Radio Group com Labels](../../assets/exemplos/shadcn_radio.png)
