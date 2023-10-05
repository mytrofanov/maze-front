import { Player1Image, Player2Image } from '../variables/variables.ts';
import { PlayerPosition } from '../game';

export const chooseImage = (player1: PlayerPosition, cellIndex: number, player2: PlayerPosition, rowIndex: number) => {
    if (player1.x === cellIndex && player1.y === rowIndex) {
        return { backgroundImage: `url(${Player1Image})` };
    }
    if (player2.x === cellIndex && player2.y === rowIndex) {
        return { backgroundImage: `url(${Player2Image})` };
    }
};
