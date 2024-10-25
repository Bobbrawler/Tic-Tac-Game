import { IMode } from "../../interfaces";

export const needLineToWin = 3;
export const rows = 3;
export const cols = 3;

export interface ICellsList {
    key: string;
    value: string;
}

const cellsList: ICellsList[][] = [];


for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  const row: ICellsList[] = [];
  for (let colIndex = 0; colIndex < cols; colIndex++) {
    if (rowIndex===0) {
        row.push({key: (String(rowIndex) + String(colIndex)), value: "None"});
        continue;
    }
    row.push({key: String(rowIndex * 10 + colIndex), value: "None"});
  }
  cellsList.push(row);
}

export default cellsList;

export const imageSrcPlayers: { [key: string]: string} = {
    "0": "/assets/images/circle.png",
    "1": "/assets/images/cross.png",
};

export const statusListImageSrc: { [key: string]: string} = {
    "Play": "/assets/images/clock.png",
    "Win": "/assets/images/trophy.png"
};

export const modeList: IMode[] = [
    {
        id: "people",
        imageSrc: "/assets/images/man.png",
    },
    {
        id: "bot",
        imageSrc: "/assets/images/robot.png",
    },
];

export const playersNamesList: { [key: string]: string} = {
    "0": "Player1",
    "1": "Player2"
}

export const playersIconsList: { [key: string]: string} = {
    "0": "Cross",
    "1": "Circle"
}


