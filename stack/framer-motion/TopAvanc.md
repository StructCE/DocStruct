---
icon: telescope-fill
label: "Controle avançado das animações"
order: 3
author:
    name: Pedro Amorim de Gregori
date: 2024-03-28
category: Explicação
---

# Controle avançado das animações

Nessa página da documentação, será explicado conceitos como `motion values` e o hook `animate` que proporcionam métodos para controlar melhor as animações.

## Motion Values

Os `motion values` são valores que designam o estado de uma animação. O estado de uma animação é definido por sua posição e velocidade.

### useMotionValue

Esses valores podem ser utilizados pelo `useMotionValue()` que apresenta métodos `get()` e `set()` para a posição e `getVelocity()` para velocidade. Para atribuir o `motion value` a um componente `motion` será necessário colocá-lo na prop `styles` no valor de "x" ou "y" variando com a direção escolhida.

!!!
Pode existir um `Motion Value` para a direção `x` e outro para a direção `y`.
!!!

### useTransform

O useTransform é um dos meios que utilizam o `MotionValue` para oferecer melhor controle da animação gerada. Ele recebe um valor , range de entrada e range
de saída e baseado nesses valores ele retorna um valor da range de saída.

!!!
Se a saída mudar de comportamento a partir de certo valor da entrada poderá ser utilizado mais de 2 valores na entrada e na saída para melhor descrever esse comportamento.
!!!

==- Exemplo de useMotionValue e useTransform

```tsx src/components/slider.tsx
"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

export default function BlocoMovel() {
	const x = useMotionValue(0);

	const defineXRange = () => {
		if (x.get() < 0) x.set(0); // Evita o slider estourar o limite
		if (x.get() > 191) x.set(191);
	};

	const dynamicColor = useTransform(x, [0, 191], ["#ffffff", "#21c559"]);
	const dynamicOpacity = useTransform(x, [0, 191], [1, 0]);

	return (
		<div className="relative w-64 h-16 bg-slate-600 rounded-3xl flex items-center text-center">
			<motion.p
				className="absolute ml-1/2 ml-20 select-none"
				style={{ opacity: dynamicOpacity }}
			>
				Arraste o botão
			</motion.p>
			<motion.div
				className="w-10 h-10 ml-3 z-10 rounded-full"
				drag="x"
				onDrag={defineXRange}
				style={{ x: x, backgroundColor: dynamicColor }}
				dragConstraints={{ left: 0, right: 0 }} // Faz o bloco voltar à posição inicial quando solto
			></motion.div>
		</div>
	);
}
```

!!!
Para mais informações sobre `use-transform` e `useTransform`, acesse [Framer Motion](https://www.framer.com/motion/motionvalue/)
!!!

===

## useAnimate

O hook `useAnimate` permite definir um escopo de animação e nele definir o que cada elemento irá fazer em uma sequência definida. Esse hook permite criar animações mais complexas e flexiveis para uso.

O gerenciamento da animação é feito dentro de um escopo e a seleção dos elementos pode ocorrer com o uso das `tags`, `classes` ou `ids`.

==- Exemplo
```tsx src/components/menu.tsx
"use client";

import { useAnimate, stagger, motion } from "framer-motion";
import { useState } from "react";

export default function Menu() {
	const [scope, animate] = useAnimate();
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen((prev) => !prev);
		if (open) {
			animate([
				["#item", { opacity: 0, x: -300 }, { delay: stagger(0.3) }],
				["#menu", { opacity: 0, x: -300 }, { duration: 2 }],
			]);
		} else {
			animate([
				["#menu", { opacity: 1, x: 0 }, { duration: 2 }],
				["#item", { opacity: 1, x: 0 }, { delay: stagger(0.3) }],
			]);
		}
	};

	const exampleArray = [1, 2, 3, 4];

	return (
		<div ref={scope}>
			<button onClick={handleClick}>Clicke!</button>
			<motion.div
				className="bg-slate-600 flex-col p-4 w-48"
				id="menu"
				initial={{ opacity: 0, x: -300 }}
			>
				{exampleArray.map((num) => {
					return (
						<motion.p
							className="text-center bg-slate-300 item"
							key={num}
							id="item"
							initial={{ opacity: 0, x: -300 }}
						>
							{num}
						</motion.p>
					);
				})}
			</motion.div>
		</div>
	);
}


```

===

## Extras

### Componentes

- (LazyMotion)[https://www.framer.com/motion/lazy-motion/]: Permite diminuir o pacote inicial do Framer Motion e carregar "partes" do pacote quando for utilizar na página.
- (Reorder)[https://www.framer.com/motion/reorder/]: Componente útil para criar sequências de elementos animadas que podem ser ordenadas pelo usuário.
  
### Motion Values

- (useVelocity)[https://www.framer.com/motion/use-velocity/]: Permite utilizar a velocidade ou acelereção de um componente para manipular alguma característica da animação.
- (useSpring)[https://www.framer.com/motion/use-spring/]: Pode ser utilizado para criar movimentações do tipo mola.

