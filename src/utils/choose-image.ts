import { animalPrints, player1Image, player2Image, wallImage } from '../variables/variables.ts';
import { Cell, Direction, DirectionMap, Player } from '../game';

export const chooseImage = (
    cell: Cell,
    player1: Player,
    cellIndex: number,
    player2: Player,
    rowIndex: number,
    revealed: boolean[][],
    directions: DirectionMap,
) => {
    const isPlayer1Here = player1.position.x === cellIndex && player1.position.y === rowIndex;
    const isPlayer2Here = player2.position.x === cellIndex && player2.position.y === rowIndex;

    if (isPlayer1Here && isPlayer2Here) {
        return {
            backgroundImage: `url(${player2Image}), url(${player1Image})`,
            backgroundSize: '50% 100%, 50% 100%',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'left, right',
        };
    }

    if (isPlayer1Here) {
        return { backgroundImage: `url(${player1Image})` };
    }
    if (isPlayer2Here) {
        return { backgroundImage: `url(${player2Image})` };
    }
    if (cell === Cell.WALL && revealed[rowIndex][cellIndex]) {
        return { backgroundImage: `url(${wallImage})` };
    }
    if (cell === Cell.PATH && revealed[rowIndex][cellIndex]) {
        const cellDirection = directions[rowIndex][cellIndex];
        let rotation = '';
        if (cellDirection === Direction.RIGHT) {
            rotation = 'rotate(90deg)';
        } else if (cellDirection === Direction.LEFT) {
            rotation = 'rotate(-90deg)';
        } else if (cellDirection === Direction.DOWN) {
            rotation = 'rotate(180deg)';
        } else if (cellDirection === Direction.UP) {
            rotation = '';
        }
        return { backgroundImage: `url(${animalPrints})`, transform: rotation };
    }
    return {};
};
