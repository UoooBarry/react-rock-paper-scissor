interface Sign {
  type: SignType | null;
  isPlayer: boolean;
}

declare enum SignType {
  Rock = "Rock",
  Paper = "Paper",
  Scissor = "Scissor"
}

type PropsFunction = () => void;