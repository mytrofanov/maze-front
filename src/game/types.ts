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
export type Maze = MazeCell[][];

// export enum Players {
//     PLAYER1 = 'player1',
//     PLAYER2 = 'player2',
// }

// export type Player = {
//     position: {
//         x: number;
//         y: number;
//     };
//     avatar: string;
// };

export enum Direction {
    UP = '/up',
    DOWN = '/down',
    LEFT = '/left',
    RIGHT = '/right',
}

export type DirectionMap = (Direction | null)[][];

export type Position = { x: number; y: number };

export interface GameLog {
    playerId: PlayerType;
    playerAvatar: string;
    direction: Direction | null;
    message: string;
    position: Position | null;
    created: string;
}

export type GameLogs = GameLog[];
