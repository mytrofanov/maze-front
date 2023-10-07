import { Cell, MazeCell, PlayerType } from '../game';

export const chooseClassName = (cell: MazeCell) => {
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
    }
    if (cell.player === PlayerType.PLAYER2) {
        className = className + ' ' + 'player2';
    }

    return className;
};
