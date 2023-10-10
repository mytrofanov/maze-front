import { MazeCell } from '../game';

export function flattenMaze(maze: MazeCell[][]): MazeCell[] {
    const flatMaze: MazeCell[] = [];

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            flatMaze.push({
                ...maze[y][x],
                rowY: y,
                colX: x,
            });
        }
    }

    return flatMaze;
}

export function unflattenMaze(flatMaze: MazeCell[]): MazeCell[][] {
    const maze: MazeCell[][] = [];

    for (const cell of flatMaze) {
        if (!maze[cell.rowY!]) {
            maze[cell.rowY!] = [];
        }
        maze[cell.rowY!][cell.colX!] = cell;
    }

    return maze;
}
