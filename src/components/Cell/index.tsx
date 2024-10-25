import React, {Dispatch, SetStateAction, ReactElement, useContext, useEffect, useState } from "react";
import GameContext from "../GameContext";
import { imageSrcPlayers, playersNamesList } from "../../utils/constants";
import { GameController } from "../GameController";
import { TGame, IRound } from "../../interfaces";
import cellsList from "../../utils/constants";
import { statusListImageSrc } from "../../utils/constants";
import "./style.css";

export interface ICellProps {
    id: string;
    winLineId: string[];
    setWinLineId: Dispatch<SetStateAction<string[]>>
}

const Cell = ({id, winLineId, setWinLineId}: ICellProps): ReactElement => {
    const { game, updateGame } = useContext(GameContext);
    const [cellStyle, setCellStyle] = useState<string>("cell-start");
    const [cellImageSrc, setCellImageSrc] = useState<string>("");
    const gameRounds: TGame = [...game];
    const countPlayers: number = Object.keys(imageSrcPlayers).length;
    const [lastPlayerNumber, setLastPlayerNumber] = useState<string>("");

    const handleClick = () => {
        let lastRound: IRound = GameController.foundLastRound(gameRounds);
        let nextRound: IRound = GameController.createNextRound(
            id,
            cellsList,
            lastRound,
            countPlayers
        );
        gameRounds.push(nextRound);
        updateGame(gameRounds);
        setCellImageSrc(nextRound.playerIconSrc);
        setWinLineId(nextRound.winLineId);
        let lastPlayerNum = Number(GameController.getKeyByValue(playersNamesList, lastRound.player)) + 1;
        setLastPlayerNumber(String(lastPlayerNum));
        return;
    };

    useEffect(() => {

        if (!winLineId.some(winId => (winId === id))) {
            return;
        }
        let cellStyleName = `cell-win-player-${lastPlayerNumber}`; 
        setCellStyle(cellStyleName);
        setCellImageSrc(statusListImageSrc["Win"]);
        return;
    }, [winLineId])


    return (
        <div className={cellStyle} onClick={handleClick}>
            <img className="cell-image" src={cellImageSrc} alt="" />
        </div>
    );
};

export default Cell;
