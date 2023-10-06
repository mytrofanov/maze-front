import { Cell, Player } from '../game';

export const chooseClassName = (
    cell: Cell,
    revealed: boolean[][],
    player1: Player,
    player2: Player,
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
    if (player1.position.x === cellIndex && player1.position.y === rowIndex) {
        className = className + ' ' + 'player1';
    }
    if (player2.position.x === cellIndex && player2.position.y === rowIndex) {
        className = className + ' ' + 'player2';
    }

    return className;
};
