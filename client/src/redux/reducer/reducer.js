import {
	GET_POKEMONS,
	FILTER_ALL_ALL,
	FILTER_ALL_TYPE,
	FILTER_ORIGINALS_CREATED_ALL,
	FILTER_ORIGINALS_CREATED_BY_TYPE,
} from '../actions/actions';
const initialState = {
	pokemons: [],
	filteredPokemons: [],
};

const pokemonReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_POKEMONS:
			return { ...state, pokemons: payload, filteredPokemons: payload };

		case FILTER_ALL_ALL:
			return { ...state, filteredPokemons: state.pokemons };

		case FILTER_ALL_TYPE:
			const filtered = state.pokemons.filter((pokemon) =>
				pokemon.types.includes(payload)
			);
			return { ...state, filteredPokemons: filtered };

		case FILTER_ORIGINALS_CREATED_ALL:
			const filteredOriginalsCreated = state.pokemons.filter(
				(pokemon) => pokemon.createdDb === payload
			);
			return { ...state, filteredPokemons: filteredOriginalsCreated };

		case FILTER_ORIGINALS_CREATED_BY_TYPE:
			const { createdDb, type } = payload;
			const filteredCase = state.pokemons.filter(
				(pokemon) =>
					pokemon.createdDb === createdDb && pokemon.types.includes(type)
			);
			return { ...state, filteredPokemons: filteredCase };

		default:
			return state;
	}
};

export default pokemonReducer;
