interface PokemonContract {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface ResponsePokemon {
  id: number;
  species: {
    name: string;
  };
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
  };
}

export class Pokemon implements PokemonContract {
  public id: number;
  public name: string;
  public image: string;
  public types: string[];

  constructor({ id, name, image, types }: PokemonContract) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.types = types;
  }
}
