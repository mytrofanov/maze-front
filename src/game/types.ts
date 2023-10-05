export enum Cell {
    WALL = 1,
    PATH = 0,
    EXIT = -1,
}

export type Maze = Cell[][];
