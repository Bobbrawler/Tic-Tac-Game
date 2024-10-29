import { createContext, Dispatch, SetStateAction } from "react";
import { TGame, TPlayers, TCells} from "../../interfaces";

export interface IGameContext {
  game: TGame;
  // players: TPlayers;
  cellsList: TCells;
  updateGame: Dispatch<SetStateAction<TGame>>;
  updateCellsList: Dispatch<SetStateAction<TCells>>;
}

const GameContext = createContext({} as IGameContext);

export default GameContext;
