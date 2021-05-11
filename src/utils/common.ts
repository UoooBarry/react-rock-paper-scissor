import _ from "lodash";

import scissorSvg from "../svgs/scissor.svg";
import rockSvg from '../svgs/rock.svg'
import paperSvg from "../svgs/paper.svg";



export enum SignType {
  Rock = "Rock",
  Paper = "Paper",
  Scissor = "Scissor"
};

export const Win: Map<SignType, SignType> = new Map([
  [SignType.Rock, SignType.Scissor],
  [SignType.Paper, SignType.Rock],
  [SignType.Scissor, SignType.Paper]
]);

export enum Status {
  going = 'Waiting for process',
  win = 'Win',
  loss = 'Loss',
  draw = 'Draw'
};

export const getRandomSignType = () => {
  return _.sample(Object.values(SignType))
};

export const getSignImage = (sign: SignType | null) => {
  if (sign === null) return "";

  switch (sign) {
    case SignType.Scissor:
      return scissorSvg;
    case SignType.Rock:
      return rockSvg;
    case SignType.Paper:
      return paperSvg;
  }
};