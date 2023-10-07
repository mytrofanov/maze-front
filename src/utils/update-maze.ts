import { MazeCell, PlayerType, Direction, Position } from '../game';

export const updateMazeCell = (
    maze: MazeCell[][],
    currentPosition: Position,
    prevPosition: Position,
    revealed: boolean,
    direction?: Direction,
    player?: PlayerType,
): MazeCell[][] => {
    if (maze[currentPosition.y][currentPosition.x].player) {
        console.log('Two players on one cell is not allowed');
        return maze;
    }
    const updatedMaze = maze.map(row => row.slice());

    if (updatedMaze[currentPosition.y] && updatedMaze[currentPosition.y][currentPosition.x]) {
        updatedMaze[currentPosition.y][currentPosition.x].revealed = revealed;
        updatedMaze[currentPosition.y][currentPosition.x].direction = direction;
        updatedMaze[currentPosition.y][currentPosition.x].player = player;
        updatedMaze[prevPosition.y][prevPosition.x].player = undefined;
    }

    return updatedMaze;
};
