export enum Cell {
    WALL = 1,
    PATH = 0,
    EXIT = -1,
}

export enum PlayerType {
    PLAYER1 = 1,
    PLAYER2 = 2,
}

export type MazeCell = {
    type: Cell;
    revealed: boolean;
    direction?: Direction;
    player?: PlayerType;
};

export type MazeType = Cell[][];

export enum Direction {
    UP = '/up',
    DOWN = '/down',
    LEFT = '/left',
    RIGHT = '/right',
}

export enum GameStage {
    WAITING = 'WAITING',
    NEW_GAME = 'NEW_GAME',
    CONNECTING = 'CONNECTING',
    CONNECTED = 'CONNECTED',
    LOST_CONNECTION = 'LOST_CONNECTION',
}

export type Position = { x: number; y: number };

export interface GameLog {
    playerType: PlayerType;
    playerId: number;
    direction: Direction | null;
    message: string;
    position: Position | null;
    created: string;
}

export type GameLogs = GameLog[];
