const { Pokemon, Type } = require('../db.js');
const { fetchPokeApi, fetch, fetchOneByOne } = require('../utils/utils.js');

const POKEMON_API_ALL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_API_TYPES = 'https://pokeapi.co/api/v2/type';

const getPokemons = async (req, res) => {
	try {
		const { name } = req.query;

		//fetch all pokemons from pokeApi and DB
		const pokeApiData = await fetchPokeApi(POKEMON_API_ALL);
		const pokeDbData = await Pokemon.findAll({
			include: [
				{
					model: Type,
					attributes: ['name'],
					through: {
						attributes: [],
					},
				},
			],
		});

		const newArr = pokeDbData.map((pokemon) => {
			const typesStringArr = pokemon.dataValues.types.map((p) => p.name);
			return {
				...pokemon.dataValues,
				types: typesStringArr,
			};
		});

		const allPokemonsData = pokeApiData.concat(newArr);

		if (!name) return res.status(200).json(allPokemonsData);

		const pokemon = allPokemonsData.find((p) => p.name === name);
		if (!pokemon)
			return res.status(404).json({ msg: 'Pokemon does not exist' });

		res.status(200).json(pokemon);
	} catch (error) {
		console.log(error);
		res.status(500).send({ msg: 'Please contact administrator' });
	}
};

const getPokemonById = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id.includes('-')) {
			const pokeApiData = await fetchOneByOne(`${POKEMON_API_ALL}/${id}`);

			if (pokeApiData) return res.status(200).json(pokeApiData);
		}

		const pokeDbData = await Pokemon.findByPk(id, {
			include: [
				{
					model: Type,
					attributes: ['name'],
					through: {
						attributes: [],
					},
				},
			],
		});
		const { dataValues } = pokeDbData;

		dataValues.types = dataValues.types.map((t) => t.name);

		if (pokeDbData) return res.status(200).json(dataValues);
	} catch (error) {
		console.log(error);
		return res.status(404).json({ msg: 'Pokemon doesnt exist' });
	}
};

// const getPokemonByName = async (req, res) => {
// 	try {
// 		const { name } = req.query;
// 		//fetch all pokemons from pokeApi and DB
// 		const pokeApiData = await fetchPokeApi(POKEMON_API_ALL);
// 		const pokeDbData = await Pokemon.findAll();
// 		//Pokemon array from pokeApi and DB
// 		const allPokemonsData = [...pokeApiData, pokeDbData];
// 		const pokemon = allPokemonsData.find((pok) => pok.name === name);
// 		if (!pokemon) return res.status(404).json({ msg: 'No pokemon found' });
// 		res.status(200).json(pokemon);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ msg: 'Please contact administrator' });
// 	}
// };

const postPokemons = async (req, res) => {
	try {
		const { name, attack, hp, defense, speed, height, weight, types } =
			req.body;
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

		const matchTypes = await Promise.all(
			types.map((name) => Type.findOne({ where: { name } }))
		);
		pokemon.addType(matchTypes);

		res.status(201).json({ pokemon, created });
	} catch (error) {
		console.log(error);
	}
};

const getPokemonTypes = async (req, res) => {
	try {
		//fetch all types
		const pokeTypes = await fetch(POKEMON_API_TYPES);
		const data = pokeTypes.map(({ name }) => name);
		// console.log(data);
		data.forEach((type) => {
			Type.findOrCreate({
				where: {
					name: type,
				},
			});
		});

		const typesFromDb = await Type.findAll();
		res.status(200).json(typesFromDb);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getPokemons,
	getPokemonById,
	// getPokemonByName,
	postPokemons,
	getPokemonTypes,
};
