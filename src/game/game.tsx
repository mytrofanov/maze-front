import React from 'react';
import { Cell, Maze, PlayerId, PlayerPosition, Players } from './types.ts';
import { createRevealedMaze } from '../utils';

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
    const [player1, setPlayer1] = React.useState<PlayerPosition>({ x: 1, y: 1 });
    const [player2, setPlayer2] = React.useState<PlayerPosition>({ x: 1, y: 8 });
    const [currentPlayer, setCurrentPlayer] = React.useState<PlayerId>(players.player1);
    const [revealed, setRevealed] = React.useState<boolean[][]>(createRevealedMaze(maze));
    const togglePlayer = () => {
        setCurrentPlayer(prev => (prev === players.player1 ? players.player2 : players.player1));
    };
    console.log('revealed: ', revealed);

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
    }, []);

    return (
        <div>
            <div>Now its your turn: {currentPlayer}</div>
        </div>
    );
};

export default Game;
