/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
	name: 'Pikachu',
};

describe('Pokemon routes', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	beforeEach(() =>
		Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
	);
	describe('GET /pokemons', () => {
		it('should get 200', () => {
			agent.get('/pokemons').expect(200);
		});

		it('responds with bulbasaur and ivysaur as the first two elements', () =>
			agent.get('/pokemons').then((res) => {
				expect(res._body[0].name).to.equal('bulbasaur');
				expect(res._body[1].name).to.equal('ivysaur');
			}));
		it('if name is passed by query, responds with that pokemon', () =>
			agent.get('/pokemons?name=charmander').then((res) => {
				expect(res._body.name).to.equal('charmander');
			}));
		it('if name doesnt exist, sends error msg', () =>
			agent.get('/pokemons?name=noExist').then((res) => {
				expect(res._body.msg).to.equal('Pokemon doesnt exist');
			}));
	});
});
