import { FakeApi } from "../../assets/fakeApi";
import { Player } from "../models/Player";
import { Pokemon, ResponsePokemon } from "../models/Pokemon";
import { renderBoard } from "../views/BoardRender";
import { randomNumbers } from "./GeneralControllers";

const createNewPokemon = (result: any): Pokemon => {
  const pokemonResponse = result.value as ResponsePokemon;
  const types = pokemonResponse.types.map((type) => {
    return type.type.name;
  });

  return new Pokemon({
    id: pokemonResponse.id,
    name: pokemonResponse.species.name,
    image: pokemonResponse.sprites.other["official-artwork"].front_default,
    types: types,
  });
};

const getPokemonsApi = () => {
  const arrayNumbers = randomNumbers(899);
  let promiseArray: Promise<Response>[] = [];

  for (let number of arrayNumbers) {
    const pokPromise = new Promise<Response>((resolve, reject) => {
      let response: Promise<Response> = fetch(
        `https://pokeapi.co/api/v2/pokemon/${number}`
      )
        .then((response) => response.json())
        .then((result) => result);

      response ? resolve(response) : reject(undefined);
    });
    promiseArray.push(pokPromise);
  }

  return promiseArray;
};

const getPokemonFakeApi = () => {
  const arrayNumbers = randomNumbers(59);
  let pokemonArray: Pokemon[] = [];
  arrayNumbers.forEach((nbr) => {
    const pokemon: Pokemon = FakeApi.find((pokemon) => pokemon.id === nbr)!;

    pokemon ? pokemonArray.push(pokemon) : [];
  });

  return pokemonArray;
};

const divideCards = (pokemonArray: Pokemon[], players: Player[]) => {
  const numberOfCards = pokemonArray.length / 2;
  players[0].cards = pokemonArray.slice(0, numberOfCards);
  players[1].cards = pokemonArray.slice(numberOfCards, pokemonArray.length);

  renderBoard(players);
};

export { getPokemonsApi, createNewPokemon, getPokemonFakeApi, divideCards };
