import {
    TGame,
    TCells,
    IRound,
    ICheckResult,
    ICell,
} from "../../interfaces";
import {
    statusListImageSrc,
    needLineToWin,
    playersNamesList,
    playersIconsList,
    imageSrcPlayers,
    cellValuesNoBadGame,
    statusListNames,
} from "../../utils/constants";
import { ICheckLine } from "../../interfaces";

export class GameController {
    public static setFirstRound = (): IRound => {
        return {
            situation: "play",
            situationImageSrc: statusListImageSrc["play"],
            player: playersNamesList[0],
            playerIconSrc: imageSrcPlayers[0],
            round: 1,
            win: false,
            winLineId: [],
            badGame: false,
        };
    };

    public static createCellsList = (
        rows: number,
        cols: number
    ): ICell[][] => {
        let startCellsList: ICell[][] = [];
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            const row: ICell[] = [];
            for (let colIndex = 0; colIndex < cols; colIndex++) {
                if (rowIndex === 0) {
                    row.push({
                        key: String(rowIndex) + String(colIndex),
                        value: "none",
                    });
                    continue;
                }
                row.push({
                    key: String(rowIndex * 10 + colIndex),
                    value: "none",
                });
            }
            startCellsList.push(row);
        }
        return startCellsList;
    };

    public static createSizeList = (rows: number, cols: number): string[][] => {
        let sizeList: string[][] = [];
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            const row: string[] = [];
            for (let colIndex = 0; colIndex < cols; colIndex++) {
                if (rowIndex === 0) {
                    row.push(String(rowIndex) + String(colIndex));
                    continue;
                }
                row.push(String(rowIndex * 10 + colIndex));
            }
            sizeList.push(row);
        }
        return sizeList;
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

    public static foundCurrentPlayerIcon = (
        currentPlayerName: string
    ): string => {
        let currentPlayerIcon =
            playersIconsList[
                this.getKeyByValue(playersNamesList, currentPlayerName)
            ];
        return currentPlayerIcon;
    };

    public static createNextRound = (
        cellsList: ICell[][],
        lastRound: IRound,
        countPlayers: number
    ): IRound => {
        let currentSituation = this.checkSituation(cellsList, needLineToWin);

        let checkWin: boolean = currentSituation.situation === "win";

        let checkBadGame: boolean = this.isBadGame(cellsList, checkWin);

        if (checkBadGame) {
            currentSituation.situation = "badGame";
        }

        let transmissionMove: number = checkWin ? 0 : 1;

        let nextPlayerNumber: number =
            (Number(this.getKeyByValue(playersNamesList, lastRound.player)) +
                transmissionMove) %
            countPlayers;
        let newRound: IRound = {
            situation: currentSituation.situation,
            situationImageSrc: statusListImageSrc[currentSituation.situation],
            player: playersNamesList[String(nextPlayerNumber)],
            playerIconSrc: imageSrcPlayers[String(nextPlayerNumber)],
            round: lastRound.round + 1,
            win: checkWin,
            winLineId: currentSituation.winLineId,
            badGame: checkBadGame,
        };

        return newRound;
    };

    public static checkSituation = (
        cellsList: ICell[][],
        needLineToWin: number
    ): ICheckResult => {
        let situation: string = "play";

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
                if (cellInfo === "none") {
                    continue;
                }

                for (const dir of directions) {
                    let line: ICheckLine[] = [];

                    for (
                        let lineIndex = 0;
                        lineIndex < needLineToWin;
                        lineIndex++
                    ) {
                        const newX = i + dir.dx * lineIndex;
                        const newY = j + dir.dy * lineIndex;

                        if (
                            newX < 0 ||
                            newX >= cellsList.length ||
                            newY < 0 ||
                            newY >= cellsList[0].length
                        ) {
                            break;
                        }

                        line.push({
                            id: String(newX) + String(newY),
                            value: cellsList[newX][newY].value,
                        });
                    }

                    if (line.length === needLineToWin) {
                        const allEqual = line.every(
                            (value) => value.value === line[0].value
                        );
                        if (allEqual) {
                            situation = "win";
                            return {
                                situation: situation,
                                winLineId: line.map((cell) => cell.id),
                            };
                        }
                    }
                }
            }
        }
        return { situation: situation, winLineId: [] };
    };

    private static isBadGame = (cellsList: TCells, win: boolean): boolean => {
        if (win) {
            return false;
        }
        for (let i = 0; i < cellsList.length; i++) {
            for (let j = 0; j < cellsList[i].length; j++) {
                if (
                    cellValuesNoBadGame.some(
                        (value) => value === cellsList[i][j].value
                    )
                ) {
                    return false;
                }
            }
        }

        return true;
    };

    public static isLastRound = (
        countRounds: number,
        game: TGame
    ): IRound | null => {
        return countRounds > 0 ? game[countRounds - 1] : null;
    };

    public static isGameEnd = (cellsList: TCells) => {
        for (let i = 0; i < cellsList.length; i++) {
            for (let j = 0; j < cellsList[i].length; j++) {
                if (cellsList[i][j].value === "none") {
                    return false;
                }
            }
        }
        return true;
    };
}
