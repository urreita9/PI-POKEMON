import {
	GET_POKEMONS,
	GET_POKEMON_BY_NAME_FROM_API,
	GET_POKEMON_BY_NAME_FROM_STATE,
	GET_POKEMON_BY_ID_FROM_API,
	GET_POKEMON_BY_ID_FROM_STATE,
	FILTER_ALL_ALL,
	FILTER_ALL_TYPE,
	FILTER_ORIGINALS_CREATED_ALL,
	FILTER_ORIGINALS_CREATED_BY_TYPE,
	ORDER_NAME_A_Z,
	ORDER_NAME_Z_A,
	ORDER_STRENGTH_S_F,
	ORDER_STRENGTH_W_F,
	CLEAN_POKEMON,
	POST_POKEMON,
} from '../actions/actions';

const initialState = {
	pokemons: [],
	filteredPokemons: [],
	pokemon: {},
};

const pokemonReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_POKEMONS:
			let takeOutPrevDb = state.pokemons.filter(
				(pokemon) => pokemon.createdDb === false
			);

			return {
				...state,
				pokemons: [...takeOutPrevDb, ...payload],
				filteredPokemons: [...takeOutPrevDb, ...payload],
			};

		case GET_POKEMON_BY_NAME_FROM_API:
			return {
				...state,
				pokemon: payload,
			};

		case GET_POKEMON_BY_NAME_FROM_STATE:
			const findPokemon = state.pokemons.find(
				(pokemon) => pokemon.name === payload
			);
			return { ...state, pokemon: findPokemon };

		case GET_POKEMON_BY_ID_FROM_API:
			if (payload.createdDb) {
				return {
					...state,
					pokemon: payload,
					pokemons: [...state.pokemons, payload],
					filteredPokemons: [...state.pokemons, payload],
				};
			}
			return {
				...state,
				pokemon: payload,
			};

		case GET_POKEMON_BY_ID_FROM_STATE:
			const findByIdFromState = state.pokemons.find(
				(pokemon) => pokemon.id === payload
			);
			return { ...state, pokemon: findByIdFromState };

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

		case ORDER_NAME_A_Z:
			const order1 = [...state.filteredPokemons];
			console.log(state.filteredPokemons);
			const orderNameAZ = order1.sort((a, b) => {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 1;
				}
				return 0;
			});

			return { ...state, filteredPokemons: orderNameAZ };

		case ORDER_NAME_Z_A:
			const order2 = [...state.filteredPokemons];
			const orderNameZA = order2.sort((a, b) => {
				if (a.name > b.name) {
					return -1;
				}
				if (a.name < b.name) {
					return 1;
				}
				return 0;
			});
			return { ...state, filteredPokemons: orderNameZA };

		case ORDER_STRENGTH_W_F:
			const order3 = [...state.filteredPokemons];
			const orderStrengthWF = order3.sort((a, b) => {
				if (a.hp < b.hp) {
					return -1;
				}
				if (a.hp > b.hp) {
					return 1;
				}
				return 0;
			});
			return { ...state, filteredPokemons: orderStrengthWF };

		case ORDER_STRENGTH_S_F:
			const order4 = [...state.filteredPokemons];
			const orderStrengthSF = order4.sort((a, b) => {
				if (a.hp > b.hp) {
					return -1;
				}
				if (a.hp < b.hp) {
					return 1;
				}
				return 0;
			});
			return { ...state, filteredPokemons: orderStrengthSF };

		case CLEAN_POKEMON:
			return { ...state, pokemon: payload };

		case POST_POKEMON:
			return {
				...state,
				pokemon: payload.pokemon,
			};
		default:
			return state;
	}
};

export default pokemonReducer;
