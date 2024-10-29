import React, {Dispatch, SetStateAction, Fragment, ReactElement } from "react";
import Cell from "../Cell";

import "./style.css"

export interface IColumnCellProps {
    rowCells: string[];
    winLineId: string[];
    setWinLineId: Dispatch<SetStateAction<string[]>>;
}

const RowCells = ({rowCells, winLineId, setWinLineId}: IColumnCellProps): ReactElement => (
    <div className="row-cell">
        {rowCells.map(cell => (
            <Cell key={cell} id={cell} winLineId={winLineId} setWinLineId={setWinLineId} />
        ))}

    </div>
)
    
export default RowCells;
