const initialState = {
	pokemons: [],
};

const pokemonReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'GET_POKEMONS':
			return { ...state, pokemons: payload };

		default:
			return state;
	}
};

export default pokemonReducer;
