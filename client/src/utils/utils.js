export const fetchTypes = async () => {
	const typesFetch = await fetch('http://localhost:3001/types');
	const types = await typesFetch.json();
	return types;
};
