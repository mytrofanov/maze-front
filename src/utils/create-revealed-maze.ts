import { MazeType, PlayerPosition } from '../game';

export const createRevealedMaze = (currentMaze: MazeType, player1: PlayerPosition, player2: PlayerPosition) => {
    const initialRevealed = Array.from({ length: currentMaze.length }, () => Array(currentMaze[0].length).fill(false));

    initialRevealed[player1.y][player1.x] = true; //initial player position
    initialRevealed[player2.y][player2.x] = true; //initial player position

    return initialRevealed;
};
