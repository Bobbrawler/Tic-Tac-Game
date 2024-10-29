import {
    ReactElement,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";
import GameContext from "../GameContext";
import { GameController } from "../GameController";
import "./style.css";

export interface IStatusProps {
    info: string;
    player: string;
    imageSrc: string;
    checkWin: boolean;
    rows: number;
    cols: number;
    restartButtonStyle: string;
    setRestartButtonStyle: Dispatch<SetStateAction<string>>;
    setCheckWin: Dispatch<SetStateAction<boolean>>;
    checkBadGame: boolean;
    setCheckBadGame: Dispatch<SetStateAction<boolean>>;
    setCellsBoardStyle: Dispatch<SetStateAction<string>>;
    setBadGameContainerStyle: Dispatch<SetStateAction<string>>;
    setCheckRestart: Dispatch<SetStateAction<boolean>>;
    playersNames: string[];
}

const Status = ({
    info,
    player,
    imageSrc,
    checkWin,
    rows,
    cols,
    restartButtonStyle,
    setRestartButtonStyle,
    setCheckWin,
    checkBadGame,
    setCheckBadGame,
    setCellsBoardStyle,
    setBadGameContainerStyle,
    setCheckRestart,
    playersNames
}: IStatusProps): ReactElement => {
    const { updateCellsList } = useContext(GameContext);
    const playerId = Number(player[player.length - 1]) - 1;

    useEffect(() => {
        if (!checkWin) {
            return;
        }

        setRestartButtonStyle("restart-button-show");
    }, [checkWin]);

    const gameRestart = () => {
        updateCellsList(GameController.createCellsList(rows, cols));

        if (checkBadGame) {
            setBadGameContainerStyle("bad-game-container-hidden");
            setTimeout(() => {
                setBadGameContainerStyle("no-display");
                setCellsBoardStyle("cells-board-hidden");
            }, 500);
            setTimeout(() => {
                setCellsBoardStyle("cells-board-show");
                setRestartButtonStyle("restart-button-show");
            }, 540);
            setCheckBadGame(false);
        }
        setCheckWin(false);
        setCheckRestart(true);
        setRestartButtonStyle("restart-button-hidden");
        return;
    };

    return (
        <div className="status-container">
            <div className="image-container">
                <img className="status-image" src={imageSrc} alt={info} />
            </div>

            <div className="status-info-container">
                <div className="status-header">STATUS</div>
                <div className="status-info">{`${info} ${playersNames[playerId]}`}</div>
            </div>

            <div className={restartButtonStyle}>
                <img
                    className="restart-button-image"
                    onClick={gameRestart}
                    src="assets/images/restart.png"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Status;
