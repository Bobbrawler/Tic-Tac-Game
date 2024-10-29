import { IMode, IPlayer } from "../../interfaces";

export const needLineToWin = 3;

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

export const playersList: IPlayer[] = [
    {
        id: "0",
        icon: "x",
        color: "rgb(255, 123, 0)",
    },
    {
        id: "1",
        icon: "○",
        color: "rgb(51, 179, 214)"
    },
]

export const playersNamesList: { [key: string]: string } = {
    "0": "player1",
    "1": "player2",
};

export const playersIconsList: { [key: string]: string } = {
    "0": "x",
    "1": "○",
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
    "x": "cell-clicked",
    "○": "cell-clicked",
    "win-player-1": "cell-win-player-1",
    "win-player-2": "cell-win-player-2",
    "no-win": "cell-clicked"
}

export const cellImagesSrc: {[key: string]: string} = {
    "none": "",
    "x": "assets/images/cross.png",
    "○": "assets/images/circle.png",
    "win-player-1": "assets/images/trophy.png",
    "win-player-2": "assets/images/trophy.png",
    "no-win": ""
}

export const cellValuesNoBadGame = [
    "none", "win-player-1", "win-player-2", "no-win"
]
