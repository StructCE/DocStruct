---
icon: beaker
label: "Geral sobre animações"
order: 4
author:
    name: Pedro Amorim de Gregori
date: 2024-03-13
category: Explicação
---

# Componente Motion e suas propriedades

!!!
Os exemplos abaixo foram criados para o next.js com tailwind. O Framer Motion não necessita do Tailwind.
!!!

## Componente Motion

O componente motion é a forma mais básica de criar uma animação. Para utilizá-lo, será necessário colocar `<motion.elemento>`. As animações podem ocorrem quando o componente é montado e quando ele é "destruído".

## Propriedades

O componente motion possui certas propriedades que definem a animação do componente.

### Animate

A maior parte das animações poderá ser feita utilizando o component `motion` e a prop `animation`. Agora com a `tag` criada, poderá ser atribuída a prop `animation`. Ela poderá conter propriedades do `CSS` como `x`, `y` e `rotate`que ocasionarão animações se algum desses valores for alterado.

==- Exemplo

```tsx src/components/bloco.tsx
"use client";
import { motion } from "framer-motion";

export default function Bloco() {
	return (
		<motion.div
			animate={{ x: 100, y: 200, rotate: 360 }}
			className="w-10 h-10 bg-slate-600"
		></motion.div>
	);
}
```

!!!
A animação acima ocorrerá quando o componente for montado.
!!!
===

### Transition

É possível criar variantes de uma animação utilizando a prop `transition`. Ela torna possível alterações como duração da animação, atraso e o tipo, por exemplo.

==- Exemplo

```tsx tsx src/components/bloco.tsx
"use client";
import { motion } from "framer-motion";

export default function Bloco() {
	return (
		<motion.div
			animate={{ x: 100, y: 200, rotate: 45 }}
			transition={{ duration: 2, type: "spring", delay: 1.5 }}
			className="w-10 h-10 bg-slate-600"
		></motion.div>
	);
}
```

===

!!!
Para mais informações sobre `trasition`, acesse [trasition](https://www.framer.com/motion/transition/)
!!!

### Initial

Para definir um estado inicial ao componente poderá ser utilizada a prop `initial`. Ela permite definir as propriedades que o elemento será iniciado.

==- Exemplo

```tsx src/components/bloco.tsx
"use client";
import { motion } from "framer-motion";

export default function Bloco() {
	return (
		<motion.div
			animate={{ x: 100, y: 200, rotate: 360 }}
			initial={{ x: 50 }}
			className="w-10 h-10 bg-slate-600"
		></motion.div>
	);
}
```

A prop `initial` poderá ser utilizada para evitar a animação de quando o elemento é montado. Para isso, utilize `initial={false}`. O componente será iniciado com as propriedades definidas no `animate`.

```tsx src/components/bloco.tsx
"use client";
import { motion } from "framer-motion";

export default function Bloco() {
	return (
		<motion.div
			animate={{ x: 100, y: 200, rotate: 45 }}
			initial={false}
			className="w-10 h-10 bg-slate-600"
		></motion.div>
	);
}
```

===

### Exit

É possível definir uma animação final para a saída de um componente do `DOM`. Para isso, é necessária a utilização da prop `exit` e do componente `AnimatePresence`. O componente efetado com a saída deve estar dentro do componente `AnimatePresence` para existir durante a animação de saída.

==- Exemplo

```tsx src/components/useStateBloco.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function BlocoVivo() {
	const [alive, setAlive] = useState(true);

	const swap = () => {
		alive ? setAlive(false) : setAlive(true);
	};

	return (
		<>
			<button
				className="bg-slate-600 text-slate-200 rounded-xl p-1"
				onClick={() => swap()}
			>
				Trocar estado
			</button>
			<AnimatePresence>
				{alive && (
					<motion.div
						animate={{ x: 100 }}
						transition={{ duration: 2 }}
						exit={{ x: 400, y: 400, opacity: 0 }}
						className="bg-slate-600 text-slate-200 w-20 h-20 text-center"
					>
						Olá, mundo!
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
```

===

### Múltiplas animações (KeyFrames)

O Framer Motion permite estruturar uma sequência de estados que o componente estará durante a animação. Uma array de valores em cada atributo nas props `initial`, `animate` e `exit` pode ser utilizado para essa finalidade. A prop `trasition` pode ter a `duration` que define o tempo total de cada prop de animação, mas o tempo de cada segmento da sequência será definido pelo atributo `times`.

!!!
O primeiro valor da array será o atributo inicial da animação. O valor inicial pode ser `null` para evitar mudanças bruscas, pois o atributo terá o valor inicial igual ao valor anterior a animação.

Os valores do `times` podem variar entre [0, 1]. Esses valores são o percentual que cada estado tem da duração.
!!!

==- Exemplo

```tsx tsx src/components/useStateBloco.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function BlocoAnimado() {
	const [alive, setAlive] = useState(true);

	return (
		<>
			<button
				className="bg-slate-600 text-slate-200 rounded-xl p-1"
				onClick={() => {
					setAlive(!alive);
				}}
			>
				Trocar estado
			</button>
			<AnimatePresence>
				{alive && (
					<motion.div
						animate={{ x: [null, 100, 200, 800] }}
						transition={{ duration: 2, times: [0, 0.25, 0.5, 1] }}
						exit={{
							x: 400,
							y: [null, 100, 200, 400],
							opacity: [1, 0.75, 0.5, 0],
						}}
						className="bg-slate-600 text-slate-200 w-20 h-20 text-center"
					>
						Olá, mundo!
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
```

===

!!!
Para mais informações sobre o componente motion e suas propriedades acesse [motion](https://www.framer.com/motion/component/)
!!!

## Gestos

O componente `motion`, também, permite a implementação de animações relacionadas com as ações do usuário. Elas são
`hover`, `tap`, `drag` e `inView`. O uso delas é parecido com o da prop `animate`, contudo, a `transition` fica no escopo do gesto.

==- Exemplo

```tsx src/components/Botao.tsx
"use client";
import { motion } from "framer-motion";

export default function Botao() {
	return (
		<motion.button
			className="bg-slate-600"
			whileTap={{
				backgroundColor: "#c52121",
				color: "white",
				padding: "1rem",
				transition: { duration: 1 },
			}}
		>
			Click me!
		</motion.button>
	);
}
```

===

!!!
O próprio framer resolve o estado do componente pós gesto.
Para mais informações sobre gestos, acesse [gestures](https://www.framer.com/motion/gestures/)
!!!

## Variants

As `Variants` são `objects` que representam as configurações do componente. As chaves representam o nome daquela configuração, assim, essa chave pode ser chamada na prop `animate` sem precisar escrever a configuração inteira dentro do componente `motion`.

Outra utilização interessante das `variants` é a criação de interação entre `parent` e `children`. Ela permite criar intervalo entre animações das `children` e sincronizar animações utilizando a chave.

Para utilizá-las, é preciso definir a prop `variant` do componente `motion`.

==- Exemplo

```tsx src/components/var.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Var() {
	const [show, setShow] = useState(false);

	const bloco = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.4,
			},
		},
	};

	const botao = {
		hover: { backgroundColor: "#c52121", color: "white" },
		visible: {
			opacity: 1,
			x: 0,
		},
		hidden: { opacity: 0, x: -40 },
	};

	const nums = [1, 2, 3, 4];

	return (
		<>
			<motion.button
				className="bg-slate-600 text-white"
				whileHover={{ backgroundColor: "#c52121", color: "white" }}
				onClick={() => {
					setShow(!show);
				}}
			>
				Click me!
			</motion.button>
			<motion.ul
				className="bg-slate-400 h-40 w-40"
				initial={false}
				animate={show ? "visible" : "hidden"}
				variants={bloco}
			>
				<p>Escolha uma opção:</p>
				{nums.map((num) => {
					return (
						<motion.li
							key={num}
							className="bg-slate-600 text-white p-1 text-center"
							variants={botao}
						>
							{num}
						</motion.li>
					);
				})}
			</motion.ul>
		</>
	);
}
```

!!!
Nesse exemplo, é possível presenciar a sincronização do nome do animate entre o `ul` e os `li`.
!!!
===

### Dynamic variants

É possível a utilização de "variáveis" em uma `variant`. Para isso, é necessário a prop `custom` colocando o valor da variável. E para utilizá-la na `variant` deverá ser criada uma `arrow function`.

==- Exemplo

```tsx src/components/var.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Var() {
	const [show, setShow] = useState(false);

	const bloco = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.4,
			},
		},
	};

	const botao = {
		visible: (i: number) => ({
			opacity: 1,
			x: 0,
			y: i * 20,
		}),
		hidden: { opacity: 0, x: -40 },
	};

	const nums = [1, 2, 3, 4];

	return (
		<>
			<motion.button
				className="bg-slate-600 text-white"
				whileHover={{ backgroundColor: "#c52121", color: "white" }}
				onClick={() => {
					setShow(!show);
				}}
			>
				Click me!
			</motion.button>
			<motion.ul
				className="bg-slate-400 h-64 w-40"
				initial={false}
				animate={show ? "visible" : "hidden"}
				variants={bloco}
			>
				<p>Escolha uma opção:</p>
				{nums.map((num) => {
					return (
						<motion.li
							key={num}
							className="bg-slate-600 text-white p-1 text-center"
							variants={botao}
							custom={num}
						>
							{num}
						</motion.li>
					);
				})}
			</motion.ul>
		</>
	);
}
```

===

## Layout

O FramerMotion possibilita criar animações performáticas utilizando mudanças no CSS e a prop `layout`.

!!!
É possível realizar mudanças dinâmicas no css utilizando o TailWind como no exemplo seguinte.

Se o projeto não utilizar TailWind é possivel a utilização de [_data attributes_](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) para possibilitar esse recurso.
!!!

==- Exemplo

```tsx src/components/switch.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Switch() {
	const [isOn, setIsOn] = useState(false);
	const handleClick = () => {
		setIsOn(!isOn);
	};

	return (
		<div
			className={`p-2 w-24 bg-slate-400 opacity-50 flex ${
				isOn ? "justify-start" : "justify-end"
			}`}
			onClick={handleClick}
		>
			<motion.div
				transition={{ duration: 0.5, type: "spring" }}
				layout // Recomendado visualizar sem o layout para perceber a diferença
				className="h-8 w-8 bg-slate-600 rounded-xl"
			></motion.div>
		</div>
	);
}
```

===

!!!
Para mais informações sobre `layout`, acesse [layout](https://www.framer.com/motion/layout-animations/).
!!!

## Scroll

As animações podem ser afetadas pelo uso do `scroll` tanto por progressão quanto por `viewport`. Para isso, utilizaremos o _motion value_ `useScroll` e o gesto `whileInView`, respectivamente.

==- Exemplo de progressão

```tsx src/components/ProgressionBar.tsx
"use client";
import { motion, useScroll } from "framer-motion";

export default function ProgressionBar() {
	const { scrollYProgress } = useScroll();
	return (
		<>
			<motion.div
				style={{ scaleY: scrollYProgress }}
				className="fixed h-full w-4 origin-top bg-slate-700"
			></motion.div>
			<div className="bg-slate-100 h-96"></div>
			<div className="bg-slate-200 h-96"></div>
			<div className="bg-slate-300 h-96"></div>
			<div className="bg-slate-400 h-96"></div>
			<div className="bg-slate-500 h-96"></div>
			<div className="bg-slate-600 h-96"></div>
		</>
		// Essas divs foram utilizadas para possibilitar o scroll
	);
}
```

===
==- Exemplo de Viewport

```tsx src/components/Expand
"use client";
import { motion } from "framer-motion";

export default function InView() {
	return (
		<>
			<div className="bg-slate-100 h-96 flex justify-center items-center">
				Scrolle para baixo!
			</div>
			<div className="bg-slate-200 h-96 flex justify-center items-center">
				Scrolle para baixo!
			</div>
			<div className="bg-slate-300 h-96 flex justify-center items-center">
				Scrolle para baixo!
			</div>
			<motion.div
				initial={{ scale: 0 }}
				whileInView={{ scale: 1 }}
				viewport={{ once: true }} // Para a animação ocorrer apenas uma vez
				className="bg-slate-400 text-blue-950 h-96 flex justify-center items-center"
			>
				<p>Olá, mundo!</p>
			</motion.div>
			<div className="bg-slate-500 h-96 flex justify-center items-center">
				Scrolle para cima!
			</div>
			<div className="bg-slate-600 h-96 flex justify-center items-center">
				Scrolle para cima!
			</div>
			<div className="bg-slate-700 h-96 flex justify-center items-center">
				Scrolle para cima!
			</div>
		</>
	);
}
```

===

!!!
Para mais informações sobre `scroll`, acesse [scroll](https://www.framer.com/motion/scroll-animations/).
!!!
