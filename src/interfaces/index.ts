export type TGame = IRound[];

export type TCells = string[];

export type IPlayer = {[key: number]: string};

export type TPlayers = IPlayer[];

export interface IMode {
    id: string;
    imageSrc: string;
}

export interface IRound {
    situation: string;
    situationImageSrc: string;
    player: string;
    playerIconSrc: string;
    round: number;
    win: boolean;
    winLineId: string[];
}

export interface IPossibleLine {
    direction: string;
    line: ICheckLine[];
}

export interface ICheckLine {
    id: string;
    value: string;
}

export interface ICheckResult {
    situation: string;
    winLineId: string[];
}


