import { Direction, DirectionMap, MazeType, Position } from '../game';

export const directionsMap = (maze: MazeType) => {
    return Array(maze.length)
        .fill(null)
        .map(() => Array(maze[0].length).fill(null));
};

export const updateDirectionMap = (directions: DirectionMap, currentPlayerPosition: Position, direction: Direction) => {
    const newDirections = directions.map(row => [...row]);
    newDirections[currentPlayerPosition.y][currentPlayerPosition.x] = direction;
    return newDirections;
};
