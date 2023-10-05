import { MazeType } from '../game';

export const createRevealedMaze = (currentMaze: MazeType) => {
    return Array(currentMaze.length).fill(Array(currentMaze[0].length).fill(false));
};
