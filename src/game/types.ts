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

export type Player = {
    position: {
        x: number;
        y: number;
    };
    avatar: string;
};

export enum Direction {
    UP = '/up',
    DOWN = '/down',
    LEFT = '/left',
    RIGHT = '/right',
}

export type DirectionMap = (Direction | null)[][];

export type Position = { x: number; y: number };

export interface GameLog {
    playerId: Players;
    playerAvatar: string;
    direction: Direction | null;
    message: string;
    position: Position | null;
    created: string;
}

export type GameLogs = GameLog[];
