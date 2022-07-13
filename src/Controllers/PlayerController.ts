import { Player } from '../models/Player';

export const createPlayers = () => {
  const player1 = new Player({
    id: 0,
    name: 'Ash',
    image: './assets/ash.png',
    points: 0,
  });

  const player2 = new Player({
    id: 1,
    name: 'Equipe Rocket',
    image: './assets/rocket-team.png',
    points: 0,
  });

  return [player1, player2];
};
