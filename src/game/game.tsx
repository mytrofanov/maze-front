import React from 'react';
import { Cell, Direction, GameLogs, MazeType, Players, PlayerPosition, DirectionMap } from './types.ts';
import { directionsMap, createRevealedMaze, updateDirectionMap } from '../utils';
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

const Game = () => {
    const [player1, setPlayer1] = React.useState<PlayerPosition>({ x: 1, y: 1 });
    const [player2, setPlayer2] = React.useState<PlayerPosition>({ x: 1, y: 8 });
    const [currentPlayer, setCurrentPlayer] = React.useState<Players>(Players.PLAYER1);
    const [revealed, setRevealed] = React.useState<boolean[][]>(createRevealedMaze(maze, player1, player2));
    const [vinner, setVinner] = React.useState<Players | null>();
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [gameLogs, setGameLogs] = React.useState<GameLogs>([]);
    const [directions, setDirections] = React.useState<DirectionMap>(directionsMap(maze));

    const togglePlayer = () => {
        setCurrentPlayer(prev => (prev === Players.PLAYER1 ? Players.PLAYER2 : Players.PLAYER1));
    };

    const saveLogs = (
        currentPlayer: Players,
        direction: Direction,
        newX: number,
        newY: number,
        prevX: number,
        prevY: number,
    ) => {
        const playerId = currentPlayer === Players.PLAYER1 ? Players.PLAYER1 : Players.PLAYER2;
        const newLog = {
            playerId,
            direction,
            prevPosition: { x: prevX, y: prevY },
            nextPosition: { x: newX, y: newY },
            message: `${playerId} going ${direction} at ${new Date().toLocaleTimeString()}`,
        };
        setGameLogs(prevLogs => [...prevLogs, newLog]);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        const currentPlayerPosition = currentPlayer === Players.PLAYER1 ? player1 : player2;
        let newX = currentPlayerPosition.x;
        let newY = currentPlayerPosition.y;
        let direction: Direction;
        switch (event.key) {
            case 'ArrowUp':
                newY -= 1;
                direction = Direction.UP;
                break;
            case 'ArrowDown':
                newY += 1;
                direction = Direction.DOWN;
                break;
            case 'ArrowLeft':
                newX -= 1;
                direction = Direction.LEFT;
                break;
            case 'ArrowRight':
                newX += 1;
                direction = Direction.RIGHT;
                break;
            default:
                return;
        }

        saveLogs(currentPlayer, direction, newX, newY, currentPlayerPosition.x, currentPlayerPosition.y);

        if (maze[newY][newX] !== Cell.WALL) {
            if (currentPlayer === Players.PLAYER1) {
                setPlayer1({ x: newX, y: newY });
                if (maze[newY][newX] === Cell.EXIT) {
                    setVinner(Players.PLAYER1);
                    setShowModal(true);
                }
            } else {
                setPlayer2({ x: newX, y: newY });
                if (maze[newY][newX] === Cell.EXIT) {
                    setVinner(Players.PLAYER2);
                    setShowModal(true);
                }
            }
            setDirections(prevDirections => updateDirectionMap(prevDirections, currentPlayerPosition, direction));
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
                <div
                    className="player-name"
                    style={
                        currentPlayer === Players.PLAYER1
                            ? { backgroundImage: `url(${player1Image})` }
                            : { backgroundImage: `url(${player2Image})` }
                    }
                />
                {'  '}
                Now its my turn!
            </div>
            <Maze maze={maze} player1={player1} player2={player2} revealed={revealed} directions={directions} />
            {vinner ? (
                <CustomModal
                    modalOpen={showModal}
                    onOk={handleModalOk}
                    title="Vinner"
                    content={`Player ${vinner} vins!`}
                    onCancel={handleModalCancel}
                    image={vinner === Players.PLAYER1 ? player1Image : player2Image}
                    width={180}
                />
            ) : null}
        </div>
    );
};

export default Game;
