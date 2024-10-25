import { Fragment, ReactElement, useEffect, useState } from "react";
import cellsList from "../../utils/constants";
import ColumnCell from "../ColumnCell";
import { modeList } from "../../utils/constants";
import ModeButton from "../ModeButton";
import Status from "../Status";
import GameContext from "../GameContext";
import { TGame, TCells, TPlayers } from "../../interfaces";
import { GameController } from "../GameController";
import "./style.css";

const App = (): ReactElement => {
    const [game, updateGame] = useState<TGame>([] as TGame);
    // const [cells, updateCells] = useState<TCells>([] as TCells);
    // const [players, setPlayers] = useState<TPlayers>([] as TPlayers);
    const [winLineId, setWinLineId] = useState<string[]>([]);
    const lastRoundCheck = game.length > 0 ? game[game.length - 1] : null;

    useEffect(() => {
        const firstRound = GameController.setFirstRound();
        updateGame((prevGame) => [...prevGame, firstRound]);
    }, []);

    return (
        <GameContext.Provider
            value={{ game, updateGame }}
        >
            <div className="main-container">
                <div className="game-logo">tic tac toe</div>

                <div className="modes-container">
                    {modeList.map((mode) => (
                        <ModeButton
                            key={mode.id}
                            id={mode.id}
                            imageSrc={mode.imageSrc}
                        />
                    ))}
                </div>

                {lastRoundCheck && (
                    <Status
                        info={lastRoundCheck.situation}
                        player={lastRoundCheck.player}
                        imageSrc={lastRoundCheck.situationImageSrc}
                    />
                )}

                <div className="cells-board">
                    {cellsList.map((cellsColumn) => (
                        <ColumnCell
                            key={cellsList.indexOf(cellsColumn)}
                            cellsColumn={cellsColumn}
                            winLineId={winLineId}
                            setWinLineId={setWinLineId}
                        />
                    ))}
                </div>
            </div>
        </GameContext.Provider>
    );
};

export default App;
