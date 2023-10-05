import { Maze } from '../game';

export const createRevealedMaze = (currentMaze: Maze) => {
    return Array(currentMaze.length).fill(Array(currentMaze[0].length).fill(false));
};
