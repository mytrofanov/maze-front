import React from 'react';
import { Cell, Maze, PlayerId, Players } from './types.ts';

const maze: Maze = [
    [Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
    [Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL],
    [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
    [Cell.WALL, Cell.WALL, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
    [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
    [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
    [Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
    [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
    [Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.EXIT],
    [Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
];

const players: Players = { player1: 1, player2: 2 };

const Game = () => {
    const [player1, setPlayer1] = React.useState({ x: 1, y: 1 });
    const [player2, setPlayer2] = React.useState({ x: 1, y: 8 });
    const [currentPlayer, setCurrentPlayer] = React.useState<PlayerId>(players.player1);

    const togglePlayer = () => {
        setCurrentPlayer(prev => (prev === players.player1 ? players.player2 : players.player1));
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        const currentPlayerPosition = currentPlayer === players.player1 ? player1 : player2;
        let newX = currentPlayerPosition.x;
        let newY = currentPlayerPosition.y;

        switch (event.key) {
            case 'ArrowUp':
                newY -= 1;
                break;
            case 'ArrowDown':
                newY += 1;
                break;
            case 'ArrowLeft':
                newX -= 1;
                break;
            case 'ArrowRight':
                newX += 1;
                break;
            default:
                return;
        }

        // Тут можна додати перевірку на те, чи є стіна на новій позиції. Якщо немає - оновити позицію гравця
        if (maze[newY][newX] !== Cell.WALL) {
            if (currentPlayer === players.player1) {
                setPlayer1({ x: newX, y: newY });
            } else {
                setPlayer2({ x: newX, y: newY });
            }
            togglePlayer();
        } else {
            //make wall visible
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentPlayer]);

    return (
        <div>
            {/* Render the maze here */}
            <button onClick={() => handleMove('up')}>Move Up</button>
            <button onClick={() => handleMove('down')}>Move Down</button>
            <button onClick={() => handleMove('left')}>Move Left</button>
            <button onClick={() => handleMove('right')}>Move Right</button>
        </div>
    );
};

export default Game;
