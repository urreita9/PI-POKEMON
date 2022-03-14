const axios = require('axios');

const fetch = async (url) => {
	const response = await axios.get(url);
	const { results } = response.data;
	// console.log(results);
	return results;
};

const fetchOneByOne = async (url) => {
	try {
		const { data } = await axios.get(url);

		const { name, height, types, weight, id, stats, sprites } = data;

		const speed = stats.find((stat) => {
			if (stat.stat.name === 'speed') return stat.base_stat;
		});
		const hp = stats.find((stat) => stat.stat.name === 'hp');
		const defense = stats.find((stat) => stat.stat.name === 'defense');
		const attack = stats.find((stat) => stat.stat.name === 'attack');
		const mappedTypes = types.map((type) => type.type.name);
		const imgDesktop = sprites.other.dream_world.front_default;
		const imgMobile = sprites.front_default;
		//Height & Weight must be modified to cm and kg
		return {
			id: `${id}`,
			name,
			height: height * 10,
			weight: weight * 0.1,
			speed: speed.base_stat,
			hp: hp.base_stat,
			defense: defense.base_stat,
			attack: attack.base_stat,
			types: mappedTypes,
			imgDesktop,
			imgMobile,
			createdDb: false,
		};
	} catch (error) {
		return null;
	}
};

const fetchPokeApi = async (url) => {
	const data = await fetch(url);

	const allPokemons = await Promise.all(
		data.map(({ url }) => fetchOneByOne(url))
	);

	return allPokemons;
};

module.exports = { fetchPokeApi, fetch, fetchOneByOne };
