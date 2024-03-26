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

  function DiceFilter(counts: any, round: number) {
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

  function PairCounter(counts: Record<number, number>, round: number) {
    return DiceFilter(counts, 2)
      .sort((a: number, b: number) => {
        return b - a;
      })
      .slice(0, round);
  }
  function Pairs(x: Idice[], round: number) {
    let returnVal = PairCounter(DiceCounter(x), round);
    return returnVal.length === round
      ? returnVal.reduce((acc: number, curr: number) => acc + curr, 0)
      : 0;
  }

  function DiceOfaKind(x: Idice[], round: number) {
    return DiceFilter(DiceCounter(x), round);
  }

  function House(x: Idice[]) {
    let test = DiceCounter(x);
    let returnArr: Array<number> = [];
    Object.values(test).forEach((die, index) => {
      if (die === 2 || die === 3) {
        returnArr.push(Number(Object.keys(test)[index]) * die);
      }
    });

    return returnArr.length !== 2
      ? 0
      : returnArr.reduce((curr, arr) => curr + arr, 0);
  }

  function Straight(x: Idice[], size: number) {
    let check: { score: number; arr: string } =
      size === 1 ? { score: 20, arr: "23456" } : { score: 15, arr: "12345" };
    return StraightCounter(x) === check.arr ? check.score : 0;
  }

  function Chance(x: Idice[]) {
    return x.reduce((acc, obj) => acc + obj.value, 0);
  }

  function Yahtzee(x: Idice[]) {
    return DiceFilter(DiceCounter(x), 5).length === 0 ? 0 : 50;
  }
  let functions = [
    Pairs(props.arr, 1),
    Pairs(props.arr, 2),
    DiceOfaKind(props.arr, 3),
    DiceOfaKind(props.arr, 4),
    House(props.arr),
    Straight(props.arr, 0),
    Straight(props.arr, 1),
    Chance(props.arr),
    Yahtzee(props.arr),
  ];

  return functions[props.num - 7];
}
