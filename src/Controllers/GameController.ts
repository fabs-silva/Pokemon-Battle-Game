import { Player } from '../models/Player';
import { Pokemon } from '../models/Pokemon';
import { updateCardsLeft } from '../views/PlayerRender';
import {
  changeScore,
  roundResultsDraw,
  roundResultsWinner,
} from '../views/ResultsRender';
import { TypeEffectiveness } from './../../assets/TypeEffectiveness';
import { updateGameLocalStorage } from './LocalStorageController';

export const compareTypeEffectiveness = (
  pokemon1: Pokemon,
  pokemon2: Pokemon,
  players: Player[]
) => {
  for (let i = 0; i < pokemon1.types.length; i++) {
    for (let j = 0; j < pokemon2.types.length; j++) {
      const compareEffectiveness = getTypeEffectiveness(
        pokemon1.types[i],
        pokemon2.types[j]
      );

      if (isNaN(compareEffectiveness)) {
        return;
      }

      if (compareEffectiveness === 1) {
        changeScore(players[0]);
        roundResultsWinner(pokemon1, pokemon2, players[0]);
        setTimeout(() => {
          endOfRound(pokemon1, pokemon2, players);
        }, 1000);

        return;
      }

      if (compareEffectiveness === 2) {
        changeScore(players[1]);
        roundResultsWinner(pokemon2, pokemon1, players[1]);
        setTimeout(() => {
          endOfRound(pokemon1, pokemon2, players);
        }, 1000);
        return;
      }
    }
  }

  roundResultsDraw();
  setTimeout(() => {
    endOfRound(pokemon1, pokemon2, players);
  }, 1000);
};

const endOfRound = (
  pokemon1: Pokemon,
  pokemon2: Pokemon,
  players: Player[]
): void => {
  removeCard(players[0], pokemon1);
  removeCard(players[1], pokemon2);
  updateGameLocalStorage(players[0]);
  updateGameLocalStorage(players[1]);

  setTimeout(() => {
    const mainCards = document.querySelectorAll('.game-main-card');

    mainCards.forEach((card) => {
      card.innerHTML = `
      <img src="./assets/pokeball.png" alt="pokebola" />
      `;
    });

    const cardsLeftContainer = document.querySelectorAll(
      '.game-player-cards-left'
    );

    cardsLeftContainer.forEach((container) => {
      const button = document.getElementById('game-start') as HTMLButtonElement;
      const cardsLeft = container.childNodes;
      if (cardsLeft.length > 0) {
        container.removeChild(cardsLeft[0]);
      }

      button.disabled = false;
    });
  }, 2000);
};

const removeCard = (player: Player, pokemon: Pokemon) => {
  const newCardsList = player.cards.filter((card) => card.id !== pokemon.id);
  player.cards = newCardsList;

  updateCardsLeft(player);
};

const getTypeEffectiveness = (
  pokemon1Type: string,
  pokemon2Type: string
): number => {
  const typeEffectiveness = returnTypeEffectiveness(pokemon1Type, pokemon2Type);

  if (typeEffectiveness > 1) {
    return 1;
  }

  if (typeEffectiveness < 1) {
    return 2;
  }
  return 0;
};

const returnTypeEffectiveness = (
  pokemon1Type: string,
  pokemon2Type: string
): number => {
  const pokemon1MainType = TypeEffectiveness.find(
    (type) => type.name.toLowerCase() === pokemon1Type.toLowerCase()
  )!;

  const pokemon2MainType =
    pokemon2Type[0].toUpperCase() + pokemon2Type.substring(1);

  return pokemon1MainType.effectiveness[pokemon2MainType];
};

export const endOfGame = (players: Player[]) => {
  if (players[0].points > players[1].points) {
    alert(`${players[0].name} ganhou`);
    return;
  }

  if (players[0].points < players[1].points) {
    alert(`${players[1].name} ganhou`);
    return;
  }
  alert('Deu empate');
};

export const restartGame = () => {};
