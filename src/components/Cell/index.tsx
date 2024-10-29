import React, {Dispatch, SetStateAction, ReactElement, useContext, useEffect, useState } from "react";
import GameContext from "../GameContext";
import { imageSrcPlayers, playersNamesList } from "../../utils/constants";
import { GameController } from "../GameController";
import { TGame, IRound, ICell, TCells } from "../../interfaces";
import { cellStyles, cellImagesSrc } from "../../utils/constants";
import "./style.css";

export interface ICellProps {
    id: string;
    winLineId: string[];
    setWinLineId: Dispatch<SetStateAction<string[]>>;
}

const Cell = ({id, winLineId, setWinLineId}: ICellProps): ReactElement => {
    const { game, updateGame, cellsList, updateCellsList } = useContext(GameContext);
    const [cellStyle, setCellStyle] = useState<string>("cell-start");
    const [cellImageSrc, setCellImageSrc] = useState<string>("");
    const gameRounds: TGame = [...game];
    var currentCellsList: TCells= [...cellsList];
    const countPlayers: number = Object.keys(imageSrcPlayers).length;
    const [lastPlayerNumber, setLastPlayerNumber] = useState<string>("");
    const cellRow = Number(id[0]);
    const cellCol = Number(id[1]);

    const updateClickedCell = (
        id: string,
        cellsList: ICell[][],
        playerIcon: string
    ) => {

        const newCellsList = cellsList.map(row => [...row]);
        newCellsList[cellRow][cellCol].value = playerIcon;
        updateCellsList(newCellsList);
        return;
    };

    const setWinLineInList = (currentCellsList: ICell[][], winLineId: string[]) => {
       
            if (!winLineId.some(winId => (winId === id))) {
                currentCellsList[cellRow][cellCol].value = "no-win";
                return
            }

            currentCellsList[cellRow][cellCol].value = `win-player-${lastPlayerNumber}`;
            return;

    }

    const handleClick = () => {
        let lastRound: IRound = GameController.foundLastRound(gameRounds);
        setCellImageSrc(lastRound.playerIconSrc);
        let currentPlayerIcon = GameController.foundCurrentPlayerIcon(lastRound.player);
        currentCellsList = [...cellsList];
        updateClickedCell(id, currentCellsList, currentPlayerIcon);

        let nextRound: IRound = GameController.createNextRound(
            currentCellsList,
            lastRound,
            countPlayers
        );

        gameRounds.push(nextRound);
        updateGame(gameRounds);
        setWinLineId(nextRound.winLineId);
        let lastPlayerNum = Number(GameController.getKeyByValue(playersNamesList, lastRound.player)) + 1;
        setLastPlayerNumber(String(lastPlayerNum));
        
        console.log(nextRound)
        return;
    };

    useEffect(() => {
        currentCellsList = [...cellsList];
        if ((currentCellsList.length === 0) || (winLineId.length === 0)) {
            return;
        }

        setWinLineInList(currentCellsList, winLineId);
    }, [winLineId])

    useEffect(() => {
        currentCellsList = [...cellsList];

        if (currentCellsList.length === 0) {
            return;
        }

        let cellValue = currentCellsList[cellRow][cellCol].value;
        setCellStyle(cellStyles[cellValue]);
        setCellImageSrc(cellImagesSrc[cellValue]);
        return;
    }, [cellsList])

    return (
        <div className={cellStyle} onClick={handleClick}>
            <img className="cell-image" src={cellImageSrc} alt="" />
        </div>
    );
};

export default Cell;
