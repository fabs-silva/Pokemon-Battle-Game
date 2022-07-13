import {
  compareTypeEffectiveness,
  endOfGame,
} from '../Controllers/GameController';
import { getGameLocalStorage } from '../Controllers/LocalStorageController';
import { Player } from '../models/Player';

const renderCardsStart = (player: Player): HTMLDivElement => {
  const playerCardsArea = document.createElement('div') as HTMLDivElement;
  playerCardsArea.classList.add('game-player-cards');
  playerCardsArea.id = `player${player.id + 1}-cards`;

  const mainCard = renderCard('game-main-card', `player${player.id}`);

  playerCardsArea.appendChild(mainCard);
  playerCardsArea.appendChild(renderCardsLeft(player.cards.length, player));

  return playerCardsArea;
};

const playGameButton = () => {
  const button = document.getElementById('game-start') as HTMLButtonElement;
  const players = getGameLocalStorage();

  button.addEventListener('click', (e: Event) => {
    e.preventDefault();
    button.disabled = true;
    players.forEach((player) => {
      if (player.cards.length >= 1) {
        const mainCard = document.getElementById(
          `game-main-card-player${player.id}`
        ) as HTMLDivElement;

        mainCard.innerHTML = `<h2>${player.cards[0].name}</h2>
      <img src=${player.cards[0].image} alt=${player.cards[0].name} />
        <p>${player.cards[0].types
          .map((type) => {
            return `<span>${type}</span>`;
          })
          .join(' / ')}</p>
        `;
      }
    });

    setTimeout(() => {
      if (players[0].cards.length > 1) {
        compareTypeEffectiveness(
          players[0].cards[0],
          players[1].cards[0],
          players
        );
        return;
      }
      compareTypeEffectiveness(
        players[0].cards[0],
        players[1].cards[0],
        players
      );

      setTimeout(() => {
        endOfGame(players);
        button.id = 'game-reset';
        button.disabled = false;
        button.innerText = 'Reiniciar';

        resetGameButton();
      }, 1000);
    }, 2000);
  });
};

const resetGameButton = () => {
  const button = document.getElementById('game-reset') as HTMLButtonElement;
  button.addEventListener('click', () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
};

const renderMainCard = (
  cardClass: string,
  player: Player,
  isTurned: boolean = true,
  index: number
): HTMLDivElement => {
  const playerCardsArea = document.createElement('div') as HTMLDivElement;
  playerCardsArea.classList.add('game-player-cards');
  playerCardsArea.id = `player${player.id + 1}-cards`;

  const card = renderCard(cardClass, `${player.cards[index].id}`);

  if (isTurned) {
    card.innerHTML = `
    <img src="./assets/pokeball.png" alt="pokebola" />
    `;
  } else {
    card.innerHTML = `<h2>${player.cards[index].name || 'Pikachu'}</h2>
      <img src=${player.cards[index].image} alt=${player.cards[index].name} />
      <p>${player.cards[index].types
        .map((type) => {
          return `<span>${type}</span>`;
        })
        .join('')}</p>
      `;
  }

  playerCardsArea.appendChild(card);

  return playerCardsArea;
};

const renderCardsLeft = (quantity: number, player: Player): HTMLDivElement => {
  const playerCardsLeft = document.createElement('div') as HTMLDivElement;
  playerCardsLeft.classList.add('game-player-cards-left');
  playerCardsLeft.id = `player${player.id + 1}-cards-left`;

  for (let i = 0; i < quantity - 1; i++) {
    const card = renderCard('game-small-card', `player${player.id + 1}-${i}`);

    card.innerHTML = `
    <img src="./assets/pokeball.png" alt="pokebola" />
    `;

    playerCardsLeft.appendChild(card);
  }

  return playerCardsLeft;
};

const renderCard = (cardClass: string, id: string) => {
  const card = document.createElement('div') as HTMLDivElement;
  card.classList.add(cardClass);
  card.id = `${cardClass}-${id}`;

  card.innerHTML = `
    <img src="./assets/pokeball.png" alt="pokebola" />
    `;

  return card;
};

export { renderMainCard, renderCardsLeft, renderCardsStart, playGameButton };
