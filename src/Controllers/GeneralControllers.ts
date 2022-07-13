const selectNumberCards = () => {
  let promptText =
    prompt("Escolha o número de cartas para cada jogador (de 1 a 6)") || "";

  const isnum = /^\d+$/;

  while (
    !isnum.test(promptText) ||
    parseInt(promptText) < 1 ||
    parseInt(promptText) > 6
  ) {
    promptText =
      prompt("Escolha o número de cartas para cada jogador (de 1 a 6)") || "";
  }

  return parseInt(promptText);
};

const randomNumbers = (numberOfPokemons: number): number[] => {
  const quantity = selectNumberCards();
  let numbersArray: number[] = [];

  for (let i = 0; i < quantity * 2; i++) {
    let newNumber = Math.floor(Math.random() * numberOfPokemons + 1);

    const checkNumberInArray = numbersArray.find((n) => n === newNumber);

    if (checkNumberInArray) {
      newNumber = Math.floor(Math.random() * numberOfPokemons + 1);
    }

    numbersArray = [...numbersArray, newNumber];
  }
  return numbersArray;
};

export { randomNumbers };
