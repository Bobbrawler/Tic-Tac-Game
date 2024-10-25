import React, {Dispatch, SetStateAction, Fragment, ReactElement } from "react";
import Cell from "../Cell";
import "./style.css"
import { ICellsList } from "../../utils/constants";

export interface IColumnCellProps {
    cellsColumn: ICellsList[];
    winLineId: string[];
    setWinLineId: Dispatch<SetStateAction<string[]>>
}

const ColumnCell = ({cellsColumn, winLineId, setWinLineId}: IColumnCellProps): ReactElement => (
    <div className="column-cell">
        {cellsColumn.map(cell => (
            <Cell key={String(cell.key)} id={String(cell.key)} winLineId={winLineId} setWinLineId={setWinLineId} />
        ))}

    </div>
)
    
export default ColumnCell;
