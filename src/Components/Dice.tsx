import Idice from "../Components/Interfaces/dice";

export default function Dice(dice: Idice[]) {
  if (dice.length === 0) {
    for (let i = 1; i <= 5; i++) {
      let die = {
        id: i,
        value: Math.floor(Math.random() * 6) + 1,
        locked: false,
      };
      dice.push(die);
    }
    return dice;
  } else {
    return dice.map((die) => {
      if (die.locked === false) {
        return {
          id: die.id,
          value: Math.floor(Math.random() * 6) + 1,
          locked: false,
        };
      } else return die;
    });
  }
}
