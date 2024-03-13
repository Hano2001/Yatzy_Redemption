import React from "react";

export default function Functions(props: { arr: any; num: number }) {
  function Pair(x: any) {
    return props.num;
  }

  function TwoPair(x: any) {
    return props.num;
  }

  function Three(x: any) {
    return props.num;
  }
  function Four(x: any) {
    return props.num;
  }

  function House(x: any) {
    return props.num;
  }

  function Small(x: any) {
    return props.num;
  }

  function Large(x: number) {
    return props.num;
  }

  function Chance(x: any) {
    return props.num;
  }

  function Yahtzee(x: any) {
    return props.num;
  }

  let returnVal = 0
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
