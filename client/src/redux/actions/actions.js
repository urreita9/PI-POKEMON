export const GET_POKEMONS = 'GET_POKEMONS';
export const FILTER_ALL_ALL = 'FILTER_ALL_ALL';
export const FILTER_ALL_TYPE = 'FILTER_ALL_TYPE';
export const FILTER_ORIGINALS_CREATED_ALL = 'FILTER_ORIGINALS_ALL';
export const FILTER_ORIGINALS_CREATED_BY_TYPE =
	'FILTER_ORIGINALS_CREATED_BY_TYPE';

export const getPokemons = () => {
	return async (dispatch) => {
		const res = await fetch('http://localhost:3001/pokemons');
		const data = await res.json();

		dispatch({ type: GET_POKEMONS, payload: data });
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
