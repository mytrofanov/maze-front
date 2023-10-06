export enum Cell {
    WALL = 1,
    PATH = 0,
    EXIT = -1,
}

export type MazeType = Cell[][];

export enum Players {
    PLAYER1 = 'player1',
    PLAYER2 = 'player2',
}

export type PlayerPosition = {
    x: number;
    y: number;
};

export enum Direction {
    UP = '/up',
    DOWN = '/down',
    LEFT = '/left',
    RIGHT = '/right',
}

export type DirectionMap = (Direction | null)[][];

export interface GameLog {
    playerId: Players;
    direction: Direction;
    message: string;
    prevPosition: { x: number; y: number };
    nextPosition: { x: number; y: number };
}

export type GameLogs = GameLog[];
