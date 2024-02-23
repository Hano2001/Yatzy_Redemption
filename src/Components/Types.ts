export default interface Iplayers {
  id: number;
  name: string;
  score: number;
}

export default interface IboardItem {
  playerId: number;
  tableCord: string;
  value: number;
  dieSide: number;
}

export default interface IDice {
  dieId: number;
  value: number;
  locked: boolean;
}