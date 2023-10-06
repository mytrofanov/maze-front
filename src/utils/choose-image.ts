import { animalPrints, player1Image, player2Image, wallImage } from '../variables/variables.ts';
import { Cell, PlayerPosition } from '../game';

export const chooseImage = (
    cell: Cell,
    player1: PlayerPosition,
    cellIndex: number,
    player2: PlayerPosition,
    rowIndex: number,
    revealed: boolean[][],
) => {
    if (player1.x === cellIndex && player1.y === rowIndex) {
        return { backgroundImage: `url(${player1Image})` };
    }
    if (player2.x === cellIndex && player2.y === rowIndex) {
        return { backgroundImage: `url(${player2Image})` };
    }
    if (cell === Cell.WALL && revealed[rowIndex][cellIndex]) {
        return { backgroundImage: `url(${wallImage})` };
    }
    if (cell === Cell.PATH && revealed[rowIndex][cellIndex]) {
        return { backgroundImage: `url(${animalPrints})`, transform: rotation };
    }
    return {};
};
