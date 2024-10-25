import { TGame, TCells, TPlayers, IRound, ICheckResult } from "../../interfaces";
import { statusListImageSrc } from "../../utils/constants";
import { needLineToWin } from "../../utils/constants";
import { playersNamesList, playersIconsList } from "../../utils/constants";
import { imageSrcPlayers } from "../../utils/constants";
import { ICellsList } from "../../utils/constants";
import { IPossibleLine } from "../../interfaces";
import { ICheckLine } from "../../interfaces";

export class GameController {
    public static setFirstRound = (): IRound => {
        return {
            situation: "Play",
            situationImageSrc: statusListImageSrc["Play"],
            player: playersNamesList[0],
            playerIconSrc: imageSrcPlayers[0],
            round: 1,
            win: false,
            winLineId: []
        };
    };

    public static getKeyByValue(
        obj: { [key: string]: string },
        value: string
    ): string {
        const key = Object.keys(obj).find((key) => obj[key] === value);
        return key!;
    }

    public static foundLastRound = (gameRounds: TGame): IRound => {
        return gameRounds[gameRounds.length - 1];
    };

    public static createNextRound = (
        cellId: string,
        cellsList: ICellsList[][],
        lastRound: IRound,
        countPlayers: number
    ): IRound => {
        let currentPlayerIcon =
            playersIconsList[
                this.getKeyByValue(playersNamesList, lastRound.player)
            ];
        this.updateClickedCell(cellId, cellsList, currentPlayerIcon);

        let currentSituation = this.checkSituation(
            cellsList,
            needLineToWin
        );

        let nextPlayerNumber: number =
            (Number(this.getKeyByValue(playersNamesList, lastRound.player)) +
                1) %
            countPlayers;
        let newRound: IRound = {
            situation: currentSituation.situation,
            situationImageSrc: statusListImageSrc[currentSituation.situation],
            player: playersNamesList[String(nextPlayerNumber)],
            playerIconSrc: imageSrcPlayers[String(nextPlayerNumber)],
            round: lastRound.round + 1,
            win: this.checkWin(currentSituation.situation),
            winLineId: currentSituation.winLineId
        };

        return newRound;
    };

    private static updateClickedCell = (
        id: string,
        cellsList: ICellsList[][],
        playerIcon: string
    ) => {
        const row = Number(id[0]);
        const col = Number(id[1]);
        cellsList[row][col].value = playerIcon;
        return;
    };

    private static checkSituation = (
        cellsList: ICellsList[][],
        needLineToWin: number
    ): ICheckResult => {
        let situation: string = "Play";
    
        const directions = [
            { dx: 0, dy: 1, name: "Right" },
            { dx: 1, dy: 0, name: "Down" },
            { dx: -1, dy: 0, name: "Up" },
            { dx: 0, dy: -1, name: "Left" },
            { dx: 1, dy: 1, name: "DownRight" },
            { dx: -1, dy: -1, name: "UpLeft" },
            { dx: -1, dy: 1, name: "UpRight" },
            { dx: 1, dy: -1, name: "DownLeft" },
        ];
    
        for (let i = 0; i < cellsList.length; i++) {
            for (let j = 0; j < cellsList[i].length; j++) {
                let cellInfo: string = cellsList[i][j].value;
                if (cellInfo === "None") {
                    continue;
                }
    
                for (const dir of directions) {
                    let line: ICheckLine[] = [];
    
                    for (let lineIndex = 0; lineIndex < needLineToWin; lineIndex++) {
                        const newX = i + dir.dx * lineIndex;
                        const newY = j + dir.dy * lineIndex;
    
                        if (newX < 0 || newX >= cellsList.length || newY < 0 || newY >= cellsList[0].length) {
                            break;
                        }
    
                        line.push({
                            id: String(newX) + String(newY),
                            value: cellsList[newX][newY].value,
                        });
                    }
    
                    if (line.length === needLineToWin) {
                        const allEqual = line.every(value => value.value === line[0].value);
                        if (allEqual) {
                            situation = "Win";
                            return { situation: situation, winLineId: line.map(cell => cell.id) };
                        }
                    }
                }
            }
        }
        return { situation: situation, winLineId: [] };
    };
    

    private static checkWin = (situation: string): boolean => {
        if (situation !== "Win") {
            return false;
        }
        return true;
    };
}
