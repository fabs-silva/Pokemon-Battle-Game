import { Player } from '../models/Player';
import { Pokemon } from '../models/Pokemon';

export const renderGameResults = (players: Player[]): HTMLDivElement => {
  const gameResults = document.createElement('section') as HTMLDivElement;
  gameResults.classList.add('game-results-area');

  gameResults.innerHTML = `<p class="game-results-versus"><span id="points-player1">${players[0].points}</span><span id="game-versus">X</span><span id="points-player2">${players[1].points}</span></p>
    <button type="button" class="game-results-button" id="game-start" disabled>Iniciar</button>
    <div class="game-results-round">
    <p class="game-results-round-winner"></p>
    <p class="game-results-round-result"></p>
    </div>
    `;

  return gameResults;
};

export const changeScore = (winner: Player): void => {
  const scoreElement = document.getElementById(
    `points-player${winner.id + 1}`
  )!;
  winner.points += 1;
  scoreElement.innerText = winner.points.toString();
};

export const roundResultsWinner = (
  pokemon1: Pokemon,
  pokemon2: Pokemon,
  winner: Player
): void => {
  const gameWinner = document.querySelector(
    '.game-results-round-winner'
  ) as HTMLParagraphElement;
  gameWinner.innerHTML = `${winner.name} pontua`;

  const roundResultText = document.querySelector(
    '.game-results-round-result'
  ) as HTMLParagraphElement;
  roundResultText.innerHTML = `${pokemon1.name} vence ${pokemon2.name}`;
};

export const roundResultsDraw = (): void => {
  const gameWinner = document.querySelector(
    '.game-results-round-winner'
  ) as HTMLParagraphElement;
  gameWinner.innerText = `Empate`;

  const roundResultText = document.querySelector(
    '.game-results-round-result'
  ) as HTMLParagraphElement;
  roundResultText.innerText = `Os dois pokemons têm a mesma força`;
};
