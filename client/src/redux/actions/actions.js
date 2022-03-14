export const getPokemons = () => {
	return async (dispatch) => {
		const typesFetch = await fetch('http://localhost:3001/types');
		const types = await typesFetch.json();

		const res = await fetch('http://localhost:3001/pokemons');
		const data = await res.json();

		dispatch({ type: 'GET_POKEMONS', payload: data });
	};
};
