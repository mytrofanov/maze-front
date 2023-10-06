import { MazeType, Player } from '../game';

export const createRevealedMaze = (currentMaze: MazeType, player1: Player, player2: Player) => {
    const initialRevealed = Array.from({ length: currentMaze.length }, () => Array(currentMaze[0].length).fill(false));

    initialRevealed[player1.position.y][player1.position.x] = true; //initial player position
    initialRevealed[player2.position.y][player2.position.x] = true; //initial player position

    return initialRevealed;
};
