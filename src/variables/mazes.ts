import { Cell, MazeCell, PlayerType } from '../game';

const wall: MazeCell = {
    type: Cell.WALL,
    revealed: false,
    direction: undefined,
    player: undefined,
};

const path: MazeCell = {
    type: Cell.PATH,
    revealed: false,
    direction: undefined,
    player: undefined,
};

const exit: MazeCell = {
    type: Cell.EXIT,
    revealed: false,
    direction: undefined,
    player: undefined,
};

const startFirst: MazeCell = {
    type: Cell.PATH,
    revealed: true,
    direction: undefined,
    player: PlayerType.PLAYER1,
};

const startSecond: MazeCell = {
    type: Cell.PATH,
    revealed: true,
    direction: undefined,
    player: PlayerType.PLAYER2,
};

export const newMaze: MazeCell[][] = [
    [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
    [wall, startFirst, path, path, wall, startSecond, path, path, path, wall],
    [wall, wall, wall, path, wall, wall, path, wall, wall, wall],
    [wall, wall, path, path, wall, wall, path, wall, wall, wall],
    [wall, wall, wall, path, path, path, path, wall, wall, wall],
    [wall, wall, wall, path, wall, wall, path, wall, wall, wall],
    [wall, path, path, path, wall, wall, wall, wall, wall, wall],
    [wall, wall, wall, path, wall, wall, wall, wall, wall, wall],
    [exit, path, path, path, path, path, path, path, path, wall],
    [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
];
