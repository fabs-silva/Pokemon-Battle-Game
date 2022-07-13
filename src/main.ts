import { createPlayers } from "./Controllers/PlayerController";
import {
  createNewPokemon,
  divideCards,
  getPokemonFakeApi,
  getPokemonsApi,
} from "./Controllers/PokemonContollers";
import { Pokemon } from "./models/Pokemon";

const promiseArray = getPokemonsApi();
const players = createPlayers();

if (promiseArray.length === 0) {
  const pokemonArray = getPokemonFakeApi();
  divideCards(pokemonArray, players);
}

Promise.allSettled(promiseArray).then((results) => {
  let pokemonArray: Pokemon[] = [];
  results.forEach((result) => {
    const newPokemon = createNewPokemon(result);
    pokemonArray.push(newPokemon);
  });

  divideCards(pokemonArray, players);
});
