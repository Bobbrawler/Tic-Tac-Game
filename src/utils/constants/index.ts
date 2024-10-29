import { IMode } from "../../interfaces";

export const needLineToWin = 2;

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

export const playersNamesList: { [key: string]: string } = {
    "0": "player1",
    "1": "player2",
};

export const playersIconsList: { [key: string]: string } = {
    "0": "cross",
    "1": "circle",
};

export const imageSrcPlayers: { [key: string]: string } = {
    "0": "/assets/images/cross.png",
    "1": "/assets/images/circle.png",
};

export const statusListImageSrc: { [key: string]: string } = {
    play: "/assets/images/clock.png",
    win: "/assets/images/trophy.png",
    badGame: "/assets/images/casket.png"
};

export const statusListNames: { [key: string]: string} = {
    play: "play",
    win: "win",
    badGame: "bad game"
}

export const cellStyles: {[key: string]: string} = {
    "none": "cell-start",
    "cross": "cell-clicked",
    "circle": "cell-clicked",
    "win-player-1": "cell-win-player-1",
    "win-player-2": "cell-win-player-2",
    "no-win": "cell-clicked"
}

export const cellImagesSrc: {[key: string]: string} = {
    "none": "",
    "cross": "assets/images/cross.png",
    "circle": "assets/images/circle.png",
    "win-player-1": "assets/images/trophy.png",
    "win-player-2": "assets/images/trophy.png",
    "no-win": ""
}

export const cellValuesNoBadGame = [
    "none", "win-player-1", "win-player-2", "no-win"
]
