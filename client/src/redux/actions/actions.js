export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_NAME_FROM_API = 'GET_POKEMON_BY_NAME_FROM_API';
export const GET_POKEMON_BY_NAME_FROM_STATE = 'GET_POKEMON_BY_NAME_FROM_STATE';
export const GET_POKEMON_BY_ID_FROM_STATE = 'GET_POKEMON_BY_ID_FROM_STATE';
export const GET_POKEMON_BY_ID_FROM_API = 'GET_POKEMON_BY_ID_FROM_API';
export const POST_POKEMON = 'POST_POKEMON';
export const FILTER_ALL_ALL = 'FILTER_ALL_ALL';
export const FILTER_ALL_TYPE = 'FILTER_ALL_TYPE';
export const FILTER_ORIGINALS_CREATED_ALL = 'FILTER_ORIGINALS_ALL';
export const FILTER_ORIGINALS_CREATED_BY_TYPE =
	'FILTER_ORIGINALS_CREATED_BY_TYPE';
export const ORDER_NAME_A_Z = 'ORDER_NAME_A_Z';
export const ORDER_NAME_Z_A = 'ORDER_NAME_Z_A';
export const ORDER_STRENGTH_W_F = 'ORDER_STRENGTH_W_F';
export const ORDER_STRENGTH_S_F = 'ORDER_STRENGTH_S_F';
export const CLEAN_POKEMON = 'CLEAN_POKEMON';

export const getPokemons = (offset) => {
	return async (dispatch) => {
		const res = await fetch(
			`http://localhost:3001/pokemons?offset=${offset}&limit=40`
		);
		const data = await res.json();

		dispatch({ type: GET_POKEMONS, payload: data });
	};
};

export const postPokemons = (pokemon) => {
	return async (dispatch) => {
		console.log(pokemon);
		const res = await fetch(`http://localhost:3001/pokemons`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(pokemon),
		});
		const data = await res.json();
		console.log(data);
		dispatch({ type: POST_POKEMON, payload: data });
	};
};

export const getPokemonByNameFromApi = (name) => {
	return async (dispatch) => {
		try {
			const res = await fetch(`http://localhost:3001/pokemons?name=${name}`);
			const data = await res.json();
			const { msg } = data;
			if (msg) {
				return msg;
			}
			dispatch({ type: GET_POKEMON_BY_NAME_FROM_API, payload: data });
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const getPokemonByIdFromApi = (id) => {
	return async (dispatch) => {
		try {
			const res = await fetch(`http://localhost:3001/pokemons/${id}`);
			const data = await res.json();
			const { msg } = data;
			if (msg) {
				return msg;
			}
			dispatch({ type: GET_POKEMON_BY_ID_FROM_API, payload: data });
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const getPokemonByNameFromState = (payload) => {
	return {
		type: GET_POKEMON_BY_NAME_FROM_STATE,
		payload,
	};
};

export const getPokemonByIdFromState = (payload) => {
	return {
		type: GET_POKEMON_BY_ID_FROM_STATE,
		payload,
	};
};

export const filterAllAll = () => {
	return {
		type: FILTER_ALL_ALL,
		payload: null,
	};
};

export const filterAllType = (payload) => {
	return {
		type: FILTER_ALL_TYPE,
		payload,
	};
};

export const filterOriginalsCreatedAll = (payload) => {
	return {
		type: FILTER_ORIGINALS_CREATED_ALL,
		payload,
	};
};

export const filterOriginalsCreatedByType = (payload) => {
	return {
		type: FILTER_ORIGINALS_CREATED_BY_TYPE,
		payload,
	};
};

export const orderNameAZ = () => {
	return {
		type: ORDER_NAME_A_Z,
		payload: null,
	};
};
export const orderNameZA = () => {
	return {
		type: ORDER_NAME_Z_A,
		payload: null,
	};
};
export const orderStrengthWF = () => {
	return {
		type: ORDER_STRENGTH_W_F,
		payload: null,
	};
};
export const orderStrengthSF = () => {
	return {
		type: ORDER_STRENGTH_S_F,
		payload: null,
	};
};

export const cleanPokemon = () => {
	return {
		type: CLEAN_POKEMON,
		payload: {},
	};
};
