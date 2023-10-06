import React from 'react';
import { Cell, GameLogs, MazeType, PlayerId, PlayerPosition, Players } from './types.ts';
import { createRevealedMaze } from '../utils';
import { Maze } from '../components';
import { updateRevealed } from '../utils';
import { player1Image, player2Image } from '../variables/variables.ts';
import './game.css';
import CustomModal from '../components/modal.tsx';

const maze: MazeType = [
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
    const [revealed, setRevealed] = React.useState<boolean[][]>(createRevealedMaze(maze, player1, player2));
    const [vinner, setVinner] = React.useState<PlayerId | null>();
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [gameLogs, setGameLogs] = React.useState<GameLogs>([]);

    const togglePlayer = () => {
        setCurrentPlayer(prev => (prev === players.player1 ? players.player2 : players.player1));
    };

    const saveLogs = (currentPlayer: PlayerId, direction: string) => {
        const playerId = currentPlayer === players.player1 ? 'Player 1' : 'Player 2';
        const newLog = {
            playerId,
            direction,
            message: `${playerId} going ${direction} at ${new Date().toLocaleTimeString()}`,
        };
        setGameLogs(prevLogs => [...prevLogs, newLog]);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        const currentPlayerPosition = currentPlayer === players.player1 ? player1 : player2;
        let newX = currentPlayerPosition.x;
        let newY = currentPlayerPosition.y;
        let direction;
        switch (event.key) {
            case 'ArrowUp':
                newY -= 1;
                direction = '/up';
                break;
            case 'ArrowDown':
                newY += 1;
                direction = '/down';
                break;
            case 'ArrowLeft':
                newX -= 1;
                direction = '/left';
                break;
            case 'ArrowRight':
                newX += 1;
                direction = '/right';
                break;
            default:
                return;
        }

        saveLogs(currentPlayer, direction);

        if (maze[newY][newX] !== Cell.WALL) {
            if (currentPlayer === players.player1) {
                setPlayer1({ x: newX, y: newY });
                if (maze[newY][newX] === Cell.EXIT) {
                    setVinner(players.player1);
                    setShowModal(true);
                }
            } else {
                setPlayer2({ x: newX, y: newY });
                if (maze[newY][newX] === Cell.EXIT) {
                    setVinner(players.player2);
                    setShowModal(true);
                }
            }
        }
        setRevealed(updateRevealed(revealed, newX, newY));
        togglePlayer();
    };

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [player1, player2, currentPlayer]);

    const handleModalOk = () => {
        console.log('Winner is: ', vinner);
        setShowModal(false);
    };

    const handleModalCancel = () => {
        console.log('Winner is: ', vinner);
        setShowModal(false);
    };

    return (
        <div>
            <div className="player-info-block">
                Now its your turn:{' '}
                <div
                    className="player-name"
                    style={
                        currentPlayer === players.player1
                            ? { backgroundImage: `url(${player1Image})` }
                            : { backgroundImage: `url(${player2Image})` }
                    }
                />
            </div>
            <Maze maze={maze} player1={player1} player2={player2} revealed={revealed} />
            {vinner ? (
                <CustomModal
                    modalOpen={showModal}
                    onOk={handleModalOk}
                    title="Vinner"
                    content={`Player ${vinner} vins!`}
                    onCancel={handleModalCancel}
                    image={vinner === players.player1 ? player1Image : player2Image}
                    width={180}
                />
            ) : null}
        </div>
    );
};

export default Game;
