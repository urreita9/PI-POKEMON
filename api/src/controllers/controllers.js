const { Pokemon, Type } = require('../db');
const { fetchPokeApi, fetch } = require('../utils/utils');

const POKEMON_API_ALL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemons = async (req, res) => {
	try {
		//fetch all pokemons from pokeApi and DB
		const pokeApiData = await fetchPokeApi(POKEMON_API_ALL);
		const pokeDbData = await Pokemon.findAll();
		//Pokemon array from pokeApi and DB
		const allPokemonsData = [...pokeApiData, pokeDbData];

		res.json(allPokemonsData);
	} catch (error) {
		console.log(error);
		res.status(500).send({ msg: 'Please contact administrator' });
	}
};

const getPokemonById = async (req, res) => {
	const { idPokemon } = req.params;
	console.log(idPokemon);
	const pokeApiData = await fetch(`${POKEMON_API_ALL}/${idPokemon}`);
	// const pokeApiData = await fetch('https://pokeapi.co/api/v2/pokemon/1');
	console.log(pokeApiData);
};

const getPokemonByName = (req, res) => {};

const postPokemons = async (req, res) => {
	try {
		const { name, attack, hp, defense, speed, height, weight } = req.body;
		if (!name) return res.status(400).json({ msg: 'Name is mandatory' });
		const [pokemon, created] = await Pokemon.findOrCreate({
			where: {
				name,
			},
			defaults: {
				attack,
				hp,
				defense,
				speed,
				height,
				weight,
			},
		});

		res.status(201).json({ pokemon, created });
	} catch (error) {
		console.log(error);
	}
};

const getPokemonTypes = async (req, res) => {
	//fetch all types
	const pokeTypes = await fetch('https://pokeapi.co/api/v2/type');
	const data = pokeTypes.map(({ name }) => name);
	data.forEach((type) => {
		Type.findOrCreate({
			where: {
				name: type,
			},
		});
	});
	const typesFromDb = await Type.findAll();
	res.status(200).json(typesFromDb);
};

module.exports = {
	getPokemons,
	getPokemonById,
	getPokemonByName,
	postPokemons,
	getPokemonTypes,
};
