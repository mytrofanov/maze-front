import { animalPrints, player1Image, player2Image, wallImage } from '../variables';
import { Cell, Direction, PlayerType } from '../game';
import { PayloadCell } from '../web-socket';

export const chooseImage = (cell: PayloadCell) => {
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
