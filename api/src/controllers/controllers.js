const { Pokemon, Type } = require('../db.js');
const { fetchPokeApi, fetch, fetchOneByOne } = require('../utils/utils.js');

const POKEMON_API_ALL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_API_TYPES = 'https://pokeapi.co/api/v2/type';

const getPokemons = async (req, res) => {
	try {
		const { name, offset } = req.query;
		// console.log(name);
		if (name) {
			const pokeApiByName = await fetchOneByOne(`${POKEMON_API_ALL}/${name}`);

			if (pokeApiByName) return res.status(200).json(pokeApiByName);
			const pokeDbByName = await Pokemon.findOne({ where: { name } });

			if (pokeDbByName) return res.status(200).json(pokeDbByName);
			return res.status(400).json({ msg: 'Pokemon doesnt exist' });
			// return res.sendStatus(400);
		}
		//fetch all pokemons from pokeApi and DB
		const pokeApiData = await fetchPokeApi(
			`${POKEMON_API_ALL}?offset=${offset}&limit=40`
		);
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

		return res.status(200).json(allPokemonsData);
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
			return res.status(400).json({ msg: 'Pokemon doesnt exist' });
		}

		const pokeDbData = await Pokemon.findByPk(id, {
			include: [
				{
					model: Type,
					attributes: ['name'],
					// through: {
					// 	attributes: [],
					// },
				},
			],
		});
		const { dataValues } = pokeDbData;

		dataValues.types = dataValues.types.map((t) => t.name);

		if (pokeDbData) return res.status(200).json(dataValues);
		res.status(400).json({ msg: 'Pokemon doesnt exist' });
	} catch (error) {
		res.status(400).json({ msg: 'Pokemon doesnt exist', error });
	}
};

const postPokemons = async (req, res) => {
	try {
		const {
			name,
			attack,
			hp,
			defense,
			speed,
			height,
			weight,
			types,
			imgDesktop,
			imgMobile,
		} = req.body;
		if (!name) return res.status(400).json({ msg: 'Name is mandatory' });
		const lowerName = name.toLowerCase();
		const [pokemon, created] = await Pokemon.findOrCreate({
			where: {
				name: lowerName,
			},
			defaults: {
				attack,
				hp,
				defense,
				speed,
				height,
				weight,
				imgDesktop,
				imgMobile,
			},
		});

		const matchTypes = await Promise.all(
			types.map((name) => Type.findOne({ where: { name } }))
		);
		pokemon.addType(matchTypes);
		res.status(201).json({ pokemon, created });
	} catch (error) {
		res.send(error);
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
		res.send(error);
	}
};

module.exports = {
	getPokemons,
	getPokemonById,
	postPokemons,
	getPokemonTypes,
};
