import { Fragment, type ReactElement, useEffect, useState } from "react";
import RowCells from "../RowCells";
import Status from "../Status";
import GameContext from "../GameContext";
import { TGame, TCells, IRound } from "../../interfaces";
import { GameController } from "../GameController";
import Settings from "../Settings";
import SettingsButton from "../SettingsButton";
import PlayerNameField from "../PlayerNameField";
import {
    statusListNames,
    needLineToWin,
    playersList,
} from "../../utils/constants";
import "./style.css";

const App = (): ReactElement => {
    const [rows, setRows] = useState<number>(3);
    const [cols, setCols] = useState<number>(3);
    const [countPlayers, setCountPlayers] = useState<number>(2);
    const [game, updateGame] = useState<TGame>([] as TGame);
    const [cellsList, updateCellsList] = useState<TCells>([] as TCells);
    const [playersNames, updatePlayersNames] = useState<string[]>(
        GameController.setStartPlayersNames(countPlayers)
    );
    const [winLineId, setWinLineId] = useState<string[]>([]);
    const [settingsStyle, setSettingsStyle] = useState<string>(
        "settings-container-hidden"
    );
    const [cellsBoardStyle, setCellsBoardStyle] =
        useState<string>("cells-board-show");
    const [badGameContainerStyle, setBadGameContainerStyle] =
        useState<string>("no-display");
    const [checkWin, setCheckWin] = useState<boolean>(false);
    const [checkRestart, setCheckRestart] = useState<boolean>(false);
    const [checkBadGame, setCheckBadGame] = useState<boolean>(false);
    const [mainContainerStyle, setMainContainerStyle] = useState<string>(
        "main-container-show"
    );
    const [restartButtonStyle, setRestartButtonStyle] = useState<string>(
        "restart-button-hidden"
    );
    const lastRoundCheck = GameController.isLastRound(game.length, game);
    const sizeList = GameController.createSizeList(rows, cols);

    const showBadGame = () => {
        let checkList = [...cellsList];
        let isGameEnd = GameController.isGameEnd(checkList);

        if (!isGameEnd) {
            return;
        }

        if (checkWin) {
            return;
        }
        setCellsBoardStyle("cells-board-hidden");
        setTimeout(() => {
            setCellsBoardStyle("no-display");
            setBadGameContainerStyle("bad-game-container-hidden");
        }, 500);
        setTimeout(() => {
            setBadGameContainerStyle("bad-game-container-show");
            setRestartButtonStyle("restart-button-show");
        }, 540);
        return;
    };

    useEffect(() => {
        if (checkRestart) {
            updateGame([]);
            setCheckRestart(false);
        }
        const firstRound = GameController.setFirstRound();
        updateGame((prevGame) => [...prevGame, firstRound]);
        updateCellsList(GameController.createCellsList(rows, cols));
    }, [rows, cols, checkRestart]);

    useEffect(() => {
        if (cellsList.length === 0 || !checkBadGame) {
            return;
        }
        showBadGame();
        return;
    }, [checkBadGame]);

    useEffect(() => {
        let currentSituation = GameController.checkSituation(
            cellsList,
            needLineToWin
        );

        if (game.length !== 0) {
            let isBadGame: boolean = GameController.isBadGame(
                cellsList,
                checkWin
            );
            setCheckBadGame(isBadGame);
        }

        setCheckWin(currentSituation.situation === "win");
        return;
    }, [cellsList, game]);

    return (
        <GameContext.Provider
            value={{
                game,
                cellsList,
                playersNames,
                updateGame,
                updateCellsList,
            }}
        >
            <Fragment>
                <div className={mainContainerStyle}>
                    <div className="game-logo">tic tac toe</div>

                    {lastRoundCheck && (
                        <Status
                            info={statusListNames[lastRoundCheck.situation]}
                            player={lastRoundCheck.player}
                            imageSrc={lastRoundCheck.situationImageSrc}
                            checkWin={checkWin}
                            rows={rows}
                            cols={cols}
                            restartButtonStyle={restartButtonStyle}
                            setRestartButtonStyle={setRestartButtonStyle}
                            setCheckWin={setCheckWin}
                            checkBadGame={checkBadGame}
                            setCheckBadGame={setCheckBadGame}
                            setCellsBoardStyle={setCellsBoardStyle}
                            setBadGameContainerStyle={setBadGameContainerStyle}
                            setCheckRestart={setCheckRestart}
                            playersNames={playersNames}
                        />
                    )}

                    <div className={badGameContainerStyle}>
                        <img
                            className="bad-game-image"
                            src="assets/images/casket.png"
                            alt=""
                        />
                    </div>

                    <div className={cellsBoardStyle}>
                        {sizeList.map((rowCells) => (
                            <RowCells
                                key={sizeList.indexOf(rowCells)}
                                rowCells={rowCells}
                                winLineId={winLineId}
                                setWinLineId={setWinLineId}
                            />
                        ))}
                    </div>

                    <div className="players-names-container">
                        {playersList.map((player) => (
                            <PlayerNameField
                                key={player.id}
                                id={player.id}
                                icon={player.icon}
                                color={player.color}
                                name={playersNames[Number(player.id)]}
                                playersNames={playersNames}
                                updatePlayersNames={updatePlayersNames}
                            />
                        ))}
                    </div>

                    <SettingsButton
                        setSettingsStyle={setSettingsStyle}
                        setMainContainerStyle={setMainContainerStyle}
                    />
                </div>
                <div className="settings-main-container">
                        <Settings
                            settingsStyle={settingsStyle}
                            setSettingsStyle={setSettingsStyle}
                            setMainContainerStyle={setMainContainerStyle}
                            setRows={setRows}
                            setCols={setCols}
                            rows={rows}
                            cols={cols}
                        />
                    </div>
            </Fragment>
        </GameContext.Provider>
    );
};

export default App;
