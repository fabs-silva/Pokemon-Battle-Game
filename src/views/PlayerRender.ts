import { Player } from '../models/Player';
import { renderCardsStart } from './CardRender';

const renderPlayerHeader = (player: Player) => {
  const playerHeader = document.createElement('div') as HTMLDivElement;
  playerHeader.classList.add('game-player-header');
  playerHeader.id = `player${player.id + 1}-header`;

  const playerImage = document.createElement('img') as HTMLImageElement;
  playerImage.classList.add('game-player-image');
  playerImage.src = player.image;
  playerImage.alt = player.name;

  const playerInfo = document.createElement('div') as HTMLDivElement;
  playerInfo.classList.add('game-player-info');

  const playerName = document.createElement('p') as HTMLParagraphElement;
  playerName.classList.add('game-player-name');
  playerName.innerText = player.name;

  const playerData = document.createElement('p') as HTMLParagraphElement;
  playerData.classList.add('game-player-data');
  playerData.id = `game-player-data-player-${player.id}`;
  playerData.innerHTML = `${player.cards.length} cartas restantes`;

  playerHeader.appendChild(playerImage);
  playerHeader.appendChild(playerInfo);
  playerInfo.appendChild(playerName);
  playerInfo.appendChild(playerData);

  return playerHeader;
};

export const renderPlayerArea = (player: Player) => {
  const playerArea = document.createElement('div') as HTMLDivElement;
  playerArea.classList.add('game-player-area');
  playerArea.id = `player${player.id + 1}-area`;

  const playerHeader = renderPlayerHeader(player);

  const playerCards = renderCardsStart(player);

  playerArea.appendChild(playerHeader);
  playerArea.appendChild(playerCards);

  return playerArea;
};

export const updateCardsLeft = (player: Player) => {
  const playerData = document.getElementById(
    `game-player-data-player-${player.id}`
  ) as HTMLParagraphElement;
  playerData.innerHTML = `${player.cards.length} cartas restantes`;
};
