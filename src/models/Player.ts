import { Pokemon } from './Pokemon';

interface PlayerContract {
  id: number;
  name: string;
  image: string;
  points: number;
  cards?: Pokemon[];
}

export class Player implements PlayerContract {
  public id: number;
  public name: string;
  public image: string;
  public points: number;
  public cards: Pokemon[];

  constructor({ id, name, image, points }: PlayerContract) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.points = points;
    this.cards = [];
  }
}
