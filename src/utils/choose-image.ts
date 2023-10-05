import { player1Image, player2Image } from '../variables/variables.ts';
import { PlayerPosition } from '../game';

export const chooseImage = (player1: PlayerPosition, cellIndex: number, player2: PlayerPosition, rowIndex: number) => {
    if (player1.x === cellIndex && player1.y === rowIndex) {
        return { backgroundImage: `url(${player1Image})` };
    }
    if (player2.x === cellIndex && player2.y === rowIndex) {
        return { backgroundImage: `url(${player2Image})` };
    }
};
