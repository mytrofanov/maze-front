import { animalPrints, player1Image, player2Image, wallImage } from '../variables';
import { Cell, Direction, MazeCell, PlayerType } from '../game';

export const chooseImage = (cell: MazeCell) => {
    // const isPlayer1Here = player1.position.x === cellIndex && player1.position.y === rowIndex;
    // const isPlayer2Here = player2.position.x === cellIndex && player2.position.y === rowIndex;

    // if (player1Position && player2Position) {
    //     return {
    //         backgroundImage: `url(${player2Image}), url(${player1Image})`,
    //         backgroundSize: '50% 100%, 50% 100%',
    //         backgroundRepeat: 'no-repeat, no-repeat',
    //         backgroundPosition: 'left, right',
    //     };
    // }

    if (cell.player === PlayerType.PLAYER1) {
        return { backgroundImage: `url(${player1Image})` };
    }
    if (cell.player === PlayerType.PLAYER2) {
        return { backgroundImage: `url(${player2Image})` };
    }
    if (cell.type === Cell.WALL && cell.revealed) {
        return { backgroundImage: `url(${wallImage})` };
    }
    if (cell.type === Cell.PATH && cell.revealed) {
        const cellDirection = cell.direction;
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
