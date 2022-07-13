import { startGameLocalStorage } from '../Controllers/LocalStorageController';
import { Player } from '../models/Player';
import { playGameButton } from './CardRender';
import { renderPlayerArea } from './PlayerRender';
import { renderGameResults } from './ResultsRender';

const renderLogo = (): HTMLDivElement => {
  const logoElement = document.createElement('header') as HTMLDivElement;
  logoElement.classList.add('game-logo');
  logoElement.innerHTML = `<img src="./assets/logo.png" alt="Pokemon Battle Game logo" />`;
  return logoElement;
};

const renderGameBody = (players: Player[]) => {
  const bodyElement = document.createElement('main') as HTMLDivElement;
  bodyElement.classList.add('game-body');
  bodyElement.appendChild(renderPlayerArea(players[0]));
  bodyElement.appendChild(renderGameResults(players));
  bodyElement.appendChild(renderPlayerArea(players[1]));

  return bodyElement;
};

const renderFooter = (): HTMLDivElement => {
  const footerElement = document.createElement('footer') as HTMLDivElement;
  footerElement.classList.add('game-footer');
  footerElement.innerText =
    'Letscode Dynamic FrontEnd Module Project - Using PokéAPI';
  return footerElement;
};

const renderBoard = (players: Player[]): void => {
  const app = document.getElementById('game-board') as HTMLDivElement;
  app.appendChild(renderLogo());
  app.appendChild(renderGameBody(players));
  app.appendChild(renderFooter());

  startGameLocalStorage(players);

  setTimeout(() => {
    const button = document.getElementById('game-start') as HTMLButtonElement;
    playGameButton();
    button.disabled = false;
  }, 500);
};

export { renderBoard };
