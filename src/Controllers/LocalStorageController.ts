import { Player } from "./../models/Player";

const getGameLocalStorage = (): Player[] => {
  let players: Player[] = [];

  let localStoragePlayers = localStorage.getItem("players");
  if (localStoragePlayers) {
    players = JSON.parse(localStoragePlayers);
  }

  return players;
};

const updateGameLocalStorage = (player: Player): void => {
  let players: Player[] = getGameLocalStorage();

  players = players.filter((p) => p.id !== player.id);

  players = [...players, player];

  localStorage.setItem("players", JSON.stringify(players));
};

const startGameLocalStorage = (players: Player[]): void => {
  let localStoragePlayers = localStorage.getItem("players");
  if (localStoragePlayers) {
    cleanLocalStorage();
  }

  localStorage.setItem("players", JSON.stringify(players));
};

const cleanLocalStorage = (): void => {
  localStorage.removeItem("players");
};

export {
  getGameLocalStorage,
  updateGameLocalStorage,
  startGameLocalStorage,
  cleanLocalStorage,
};
