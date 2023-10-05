import React from 'react';
import { Cell, Maze } from './types.ts';

const Game = () => {
    const [player1, setPlayer1] = React.useState({ x: 1, y: 1 });
    const [player2, setPlayer2] = React.useState({ x: 1, y: 8 });
    const [currentTurn, setCurrentTurn] = React.useState(1); // 1 for player1 and 2 for player2

    const handleMove = direction => {
        // Logic to handle the movement of players
        // Check for walls, change player position, etc.
        // Don't forget to switch turns using setCurrentTurn
    };

    const maze: Maze = [
        [Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
        [Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL], // Cell.PATH represents a path
        [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
        [Cell.WALL, Cell.WALL, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
        [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
        [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
        [Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
        [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
        [Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.EXIT],
        [Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL], // -1 represents the exit
    ];

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
