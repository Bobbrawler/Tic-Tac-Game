import React, {Dispatch, SetStateAction, Fragment, ReactElement } from "react";
import Cell from "../Cell";

import "./style.css"

export interface IColumnCellProps {
    rowCells: string[];
    winLineId: string[];
    setWinLineId: Dispatch<SetStateAction<string[]>>;
    setCheckWin: Dispatch<SetStateAction<boolean>>;
    setCheckBadGame: Dispatch<SetStateAction<boolean>>;
    checkBadGame: boolean;
}

const RowCells = ({rowCells, winLineId, setWinLineId, setCheckWin, setCheckBadGame, checkBadGame}: IColumnCellProps): ReactElement => (
    <div className="row-cell">
        {rowCells.map(cell => (
            <Cell key={cell} id={cell} winLineId={winLineId} setWinLineId={setWinLineId} setCheckWin={setCheckWin} setCheckBadGame={setCheckBadGame} checkBadGame={checkBadGame}/>
        ))}

    </div>
)
    
export default RowCells;
