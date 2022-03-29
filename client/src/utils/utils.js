const REACT_APP_API = process.env.REACT_APP_API || 'http://localhost:3001';
export const fetchTypes = async () => {
	try {
		const typesFetch = await fetch(`${REACT_APP_API}/types`);
		const types = await typesFetch.json();
		return types;
	} catch (error) {
		console.log(error);
	}
};

export const searchFromState = (arg, value, pokemons) => {
	const findMyPokemon = pokemons.find((pokemon) => {
		return pokemon[arg] === value;
	});

	if (findMyPokemon) return true;
	return false;
};

export const getPokemons = async (offset) => {
	try {
		const res = await fetch(
			`${REACT_APP_API}/pokemons?offset=${offset}&limit=40`
		);
		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};
