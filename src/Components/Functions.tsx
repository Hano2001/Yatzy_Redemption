import React from "react";
import Idice from "./Interfaces/dice";

export default function Functions(props: { arr: Idice[]; num: number }) {
  function DiceCounter(y: Idice[]) {
    let counts: Record<number, number> = {};
    y.forEach((die) => {
      counts[die.value] = counts[die.value] ? counts[die.value] + 1 : 1;
    });
    return counts;
  }

  function TestFunction(counts: any, round: number) {
    let returnArr: any = [];
    Object.keys(counts).filter((count) => {
      let countKey = Number(count);
      if (counts[Number(countKey)] >= round) {
        returnArr.push(countKey * round);
      }
    });
    return returnArr;
  }
  function StraightCounter(y: Idice[]) {
    return y
      .map((die) => {
        return die.value;
      })
      .sort((a, b) => {
        return a - b;
      })
      .join("");
  }

  function PairCounter(counts: any, round: number) {

    return TestFunction(counts, 2)
      .sort((a: number, b: number) => {
        return b - a;
      })
      .slice(0, round);
  }
  function Pair(x: Idice[]) {
    return PairCounter(DiceCounter(x), 1);
  }

  function TwoPair(x: Idice[]) {
    return PairCounter(DiceCounter(x), 2).reduce(
      (acc: number, curr: number) => acc + curr,
      0
    );
  }

  function Three(x: Idice[]) {
    return TestFunction(DiceCounter(x), 3);
  }
  function Four(x: Idice[]) {
    return TestFunction(DiceCounter(x), 4);
  }

  function House(x: Idice[]) {
     let test = DiceCounter(x);
     let returnArr: Array<number> = [];
    Object.values(test).forEach((die,index) => {
      if(die === 2 || die === 3){
        returnArr.push(Number(Object.keys(test)[index])*die)
      }
    })

    return returnArr.length !== 2 ? 0 : returnArr.reduce((curr,arr) => curr + arr,0)
  }

  function Small(x: Idice[]) {
    let small = "12345";
    return StraightCounter(x) === small ? 15 : 0;
  }

  function Large(x: Idice[]) {
    let large = "23456";
    return StraightCounter(x) === large ? 20 : 0;
  }

  function Chance(x: Idice[]) {
    return x.reduce((acc, obj) => acc + obj.value, 0);
  }

  function Yahtzee(x: Idice[]) {
    return TestFunction(DiceCounter(x),5).length === 0 ? 0 : 50; 
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
