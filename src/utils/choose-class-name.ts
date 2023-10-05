import { Cell, PlayerPosition } from '../game';

export const chooseClassName = (
    cell: Cell,
    revealed: boolean[][],
    player1: PlayerPosition,
    player2: PlayerPosition,
    rowIndex: number,
    cellIndex: number,
) => {
    let className = 'maze-cell';
    if (cell === Cell.WALL) {
        if (revealed[rowIndex][cellIndex]) {
            className = className + ' ' + 'wall';
        } else {
            className = className + ' ' + 'hidden';
        }
    }
    if (cell === Cell.PATH) {
        className = className + ' ' + 'path';
    }
    if (cell === Cell.EXIT) {
        className = className + ' ' + 'exit';
    }
    if (player1.x === cellIndex && player1.y === rowIndex) {
        className = className + ' ' + 'player1';
    }
    if (player2.x === cellIndex && player2.y === rowIndex) {
        className = className + ' ' + 'player2';
    }
    console.log('className: ', className);
    return className;
};
