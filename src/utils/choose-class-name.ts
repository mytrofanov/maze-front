import { Cell, PlayerType } from '../game';
import { PayloadCell, SocketUser } from '../web-socket';

export const chooseClassName = (cell: PayloadCell, currentPlayer?: PlayerType, currentUser?: SocketUser) => {
    let className = 'maze-cell';
    if (cell.type === Cell.WALL) {
        if (cell.revealed) {
            className = className + ' ' + 'wall';
        } else {
            className = className + ' ' + 'hidden';
        }
    }
    if (cell.type === Cell.PATH) {
        className = className + ' ' + 'path';
    }
    if (cell.type === Cell.EXIT) {
        className = className + ' ' + 'exit';
    }
    if (cell.player === PlayerType.PLAYER1) {
        className = className + ' ' + 'player1';
        if (currentPlayer === cell.player) {
            className = className + ' ' + 'active-player';
        }
    }
    if (cell.player === PlayerType.PLAYER2) {
        className = className + ' ' + 'player2';
        if (currentPlayer === cell.player) {
            className = className + ' ' + 'active-player';
        }
    }

    return className;
};
