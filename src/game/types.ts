export enum Cell {
    WALL = 1,
    PATH = 0,
    EXIT = -1,
}

export type MazeType = Cell[][];

export enum PlayerId {
    PLAYER1 = 1,
    PLAYER2 = 2,
}

export type Players = {
    player1: PlayerId.PLAYER1;
    player2: PlayerId.PLAYER2;
};

export type PlayerPosition = {
    x: number;
    y: number;
};
