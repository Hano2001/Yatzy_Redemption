import React from "react";
import Idice from "./Interfaces/dice";

export default function Functions(props: { arr: Idice[]; num: number }) {
    
  function DiceCounter(y: Idice[]) {
    //let counts = {1:0,2:0,3:0,4:0,5:0,6:0};
    let counts:Record<number,number> =  {}
    y.map(die => {
        counts[die.value] = counts[die.value] ? counts[die.value] +1 : 1;
    })

    return counts;
    

  }
  function Pair(x: Idice[]) {
    console.log(x)
    console.log(DiceCounter(x))
    return props.num;
  }

  function TwoPair(x: Idice[]) {
    return props.num;
  }

  function Three(x: Idice[]) {
    return props.num;
  }
  function Four(x: Idice[]) {
    return props.num;
  }

  function House(x: Idice[]) {
    console.log(x)
    return props.num;
  }

  function Small(x: Idice[]) {
    let small = "12345";
    DiceCounter(props.arr)
    //return x.join("") === small ? 15 : 0;
    return props.num
  }

  function Large(x: Idice[]) {
    let large = "23456";
    //return x.join("") === large ? 20 : 0;
    return props.num
  }

  function Chance(x: Idice[]) {
    return x.reduce((acc,obj) => acc + obj.value,0);
  }

  function Yahtzee(x: Idice[]) {
    return props.num;
  }

  let returnVal = 0;
  switch (props.num) {
    case 7:
      returnVal = Pair(props.arr);
      break;

    case 8: {
      returnVal = TwoPair(props.arr);
      break;
    }
    case 9: {
      returnVal = Three(props.arr);
      break;
    }
    case 10: {
      returnVal = Four(props.arr);
      break;
    }
    case 11: {
      returnVal = House(props.arr);
      break;
    }
    case 12: {
      returnVal = Small(props.arr);
      break;
    }
    case 13: {
      returnVal = Large(props.arr);
      break;
    }
    case 14: {
      returnVal = Chance(props.arr);
      break;
    }
    case 15: {
      returnVal = Yahtzee(props.arr);
      break;
    }
  }

  return returnVal;
}
