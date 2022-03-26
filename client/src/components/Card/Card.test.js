import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Card from './Card';

const pokeArray = [
	{
		id: '1',
		name: 'bulbasaur',
		height: 70,
		weight: 6.9,
		speed: 45,
		hp: 45,
		defense: 49,
		attack: 49,
		types: ['grass', 'poison'],
		imgDesktop:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
		imgMobile:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
		createdDb: false,
	},
	{
		id: '2',
		name: 'ivysaur',
		height: 100,
		weight: 13,
		speed: 60,
		hp: 60,
		defense: 63,
		attack: 62,
		types: ['grass', 'poison'],
		imgDesktop:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif',
		imgMobile:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
		createdDb: false,
	},
	{
		id: 'a9577794-bae2-4127-9707-c3714f64918c',
		name: 'kiko',
		height: null,
		weight: null,
		speed: 50,
		hp: 140,
		defense: 193,
		attack: 50,
		types: ['flying', 'fire'],
		imgDesktop:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/100.gif',
		imgMobile:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg',
		createdDb: true,
	},
];
test('<Card /> should render pokemon name and the first character should be transformed to Uppercase.', () => {
	let [poke1, poke2, poke3] = pokeArray;

	const component1 = render(<Card {...poke1} />);
	const component2 = render(<Card {...poke2} />);
	const component3 = render(<Card {...poke3} />);
	expect(component1.container).toHaveTextContent(
		`${poke1.name.charAt(0).toUpperCase() + poke1.name.slice(1)}`
	);
	expect(component2.container).toHaveTextContent(
		`${poke2.name.charAt(0).toUpperCase() + poke2.name.slice(1)}`
	);
	expect(component3.container).toHaveTextContent(
		`${poke3.name.charAt(0).toUpperCase() + poke3.name.slice(1)}`
	);
});

// test('<Card /> should render pokemon types.', () => {
// 	let [poke1, poke2, poke3] = pokeArray;

// 	const component1 = render(<Card {...poke1} />);
// 	const component2 = render(<Card {...poke2} />);
// 	const component3 = render(<Card {...poke3} />);
// 	expect(component1.container).toHaveTextContent(poke1[0]);
// 	expect(component2.container).toHaveTextContent(
// 		`${poke2.name.charAt(0).toUpperCase() + poke2.name.slice(1)}`
// 	);
// 	expect(component3.container).toHaveTextContent(
// 		`${poke3.name.charAt(0).toUpperCase() + poke3.name.slice(1)}`
// 	);
// });
