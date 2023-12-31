export enum Cell {
    WALL = 'WALL',
    PATH = 'PATH',
    EXIT = 'EXIT',
}

export enum PlayerType {
    PLAYER1 = '1',
    PLAYER2 = '2',
}

export type MazeCell = {
    type: Cell;
    revealed: boolean;
    direction?: Direction;
    player?: PlayerType;
    rowY?: number;
    colX?: number;
};

export type MazeType = Cell[][];

export enum Direction {
    UP = '/up',
    DOWN = '/down',
    LEFT = '/left',
    RIGHT = '/right',
}

export type Position = { x: number; y: number };

export interface GameLog {
    playerType: PlayerType;
    playerId: number;
    direction: Direction | null;
    message: string;
    rowY: number | null;
    colX: number | null;
    gameId?: number;
    id: number;
    updatedAt: string;
    createdAt: string;
    mazeSnapShot: string;
}

export type GameLogs = GameLog[];
