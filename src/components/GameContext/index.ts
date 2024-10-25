import { createContext, Dispatch, SetStateAction } from "react";
import { IRound, TGame, TPlayers, TCells } from "../../interfaces";

export interface IGameContext {
  game: TGame;
  // players: TPlayers;
  // cells: string[];
  updateGame: Dispatch<SetStateAction<TGame>>;
  // updateCells: Dispatch<SetStateAction<TCells>>;
}

const GameContext = createContext({} as IGameContext);

export default GameContext;
