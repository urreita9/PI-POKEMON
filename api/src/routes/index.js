const { Router } = require('express');
const {
	getPokemons,
	getPokemonById,
	getPokemonByName,
	getPokemonTypes,
	postPokemons,
} = require('../controllers/controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET /pokemons
router.get('/pokemons', getPokemons);

//GET /pokemons/{idPokemon}
router.get('/pokemons/:idPokemon', getPokemonById);

//GET /pokemons?name
router.get('/pokemons/', getPokemonByName);

//POST /pokemons
router.post('/pokemons', postPokemons);

//GET /types
router.get('/types', getPokemonTypes);

module.exports = router;
