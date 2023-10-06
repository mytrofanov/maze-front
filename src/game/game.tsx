import React, { ChangeEvent } from 'react';
import { Cell, Direction, DirectionMap, GameLogs, MazeType, Player, Players } from './types.ts';
import { createRevealedMaze, directionsMap, updateDirectionMap, updateRevealed } from '../utils';
import { Maze } from '../components';
import { localStorageUserName, player1Image, player2Image } from '../variables/variables.ts';
import CustomModal from '../components/modal.tsx';
import CreateUserModal, { CreateUserFormValues } from '../components/create-user-modal.tsx';
import PrivatePageLayout from '../page-layout/private-page-layout.tsx';

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
    const [player1, setPlayer1] = React.useState<Player>({ position: { x: 1, y: 1 }, avatar: player1Image });
    const [player2, setPlayer2] = React.useState<Player>({ position: { x: 1, y: 8 }, avatar: player2Image });
    const [currentPlayer, setCurrentPlayer] = React.useState<Players>(Players.PLAYER1);
    const [revealed, setRevealed] = React.useState<boolean[][]>(createRevealedMaze(maze, player1, player2));
    const [vinner, setVinner] = React.useState<Players | null>();
    const [openWinnerModal, setOpenWinnerModal] = React.useState<boolean>(false);
    const [openCreateUserModal, setOpenCreateUserModal] = React.useState<boolean>(false);
    const [gameLogs, setGameLogs] = React.useState<GameLogs>([]);
    const [directions, setDirections] = React.useState<DirectionMap>(directionsMap(maze));
    const [username, setUsername] = React.useState<string | null>(null);
    const [currentMessage, setCurrentMessage] = React.useState<string>('');

    React.useEffect(() => {
        const storedName = localStorage.getItem(localStorageUserName);
        if (storedName) {
            setUsername(storedName);
        } else {
            setOpenCreateUserModal(true);
        }
    }, []);

    const togglePlayer = () => {
        setCurrentPlayer(prev => (prev === Players.PLAYER1 ? Players.PLAYER2 : Players.PLAYER1));
    };

    const saveLogs = (
        currentPlayer: Players,
        direction?: Direction,
        newX?: number,
        newY?: number,
        message?: string,
    ) => {
        const playerId = currentPlayer === Players.PLAYER1 ? Players.PLAYER1 : Players.PLAYER2;
        const created = new Date().toLocaleTimeString();
        const newLog = {
            playerId,
            direction: direction ? direction : null,
            position: newX && newY ? { x: newX, y: newY } : null,
            message: message
                ? `${playerId} message: ${message} at ${created}`
                : `${playerId} going ${direction} at ${created}`,
            created,
            playerAvatar: currentPlayer === Players.PLAYER1 ? player1.avatar : player2.avatar,
        };
        setGameLogs(prevLogs => [newLog, ...prevLogs]);
    };

    const handleDirectionInput = (direction: Direction) => {
        const currentPlayerPosition = currentPlayer === Players.PLAYER1 ? player1.position : player2.position;
        let newX = currentPlayerPosition.x;
        let newY = currentPlayerPosition.y;

        if (direction === Direction.UP) {
            newY -= 1;
        }
        if (direction === Direction.DOWN) {
            newY += 1;
        }
        if (direction === Direction.LEFT) {
            newX -= 1;
        }
        if (direction === Direction.RIGHT) {
            newX += 1;
        }

        saveLogs(currentPlayer, direction, newX, newY);

        if (maze[newY][newX] !== Cell.WALL) {
            if (currentPlayer === Players.PLAYER1) {
                setPlayer1({ ...player1, position: { x: newX, y: newY } });
                if (maze[newY][newX] === Cell.EXIT) {
                    setVinner(Players.PLAYER1);
                    setOpenWinnerModal(true);
                }
            } else {
                setPlayer2({ ...player2, position: { x: newX, y: newY } });
                if (maze[newY][newX] === Cell.EXIT) {
                    setVinner(Players.PLAYER2);
                    setOpenWinnerModal(true);
                }
            }
            setDirections(prevDirections => updateDirectionMap(prevDirections, currentPlayerPosition, direction));
        }
        setRevealed(updateRevealed(revealed, newX, newY));
        togglePlayer();
    };

    const handleGlobalKeyPress = (event: KeyboardEvent) => {
        const targetElement = event.target as HTMLElement;

        if (targetElement.tagName === 'INPUT') {
            return;
        }
        event.preventDefault();

        let direction: Direction | undefined;

        switch (event.key) {
            case 'ArrowUp':
                direction = Direction.UP;
                break;
            case 'ArrowDown':
                direction = Direction.DOWN;
                break;
            case 'ArrowLeft':
                direction = Direction.LEFT;
                break;
            case 'ArrowRight':
                direction = Direction.RIGHT;
                break;
            default:
                return;
        }

        if (direction) {
            handleDirectionInput(direction);
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', handleGlobalKeyPress);

        return () => {
            window.removeEventListener('keydown', handleGlobalKeyPress);
        };
    }, [player1, player2, currentPlayer]);

    const handleWinnerModalOk = () => {
        console.log('Winner is: ', vinner);
        setOpenWinnerModal(false);
    };

    const handleWinnerModalCancel = () => {
        console.log('Winner is: ', vinner);
        setOpenWinnerModal(false);
    };

    const handleCreateUser = (formValues: CreateUserFormValues) => {
        localStorage.setItem(localStorageUserName, formValues.userName);
        setUsername(formValues.userName);
        setOpenCreateUserModal(false);
    };

    const handleCancelCreateUser = () => {
        setOpenCreateUserModal(false);
    };

    const handleTextInput = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(event.target.value);
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // const value = event.currentTarget.value.trim();

            if (Object.values(Direction).includes(currentMessage as Direction)) {
                handleDirectionInput(currentMessage as Direction);
            } else {
                saveLogs(currentPlayer, undefined, undefined, undefined, currentMessage);
            }
        }
    };

    return (
        <PrivatePageLayout
            userInfo={`Hello ${username}!`}
            currentPlayer={currentPlayer}
            gameLogs={gameLogs}
            currentMessage={currentMessage}
            onMessageChange={handleTextInput}
            onKeyPress={handleInputKeyPress}
        >
            <Maze maze={maze} player1={player1} player2={player2} revealed={revealed} directions={directions} />
            <CustomModal
                modalOpen={openWinnerModal}
                onOk={handleWinnerModalOk}
                title="Vinner"
                content={`Player ${vinner} vins!`}
                onCancel={handleWinnerModalCancel}
                image={vinner === Players.PLAYER1 ? player1Image : player2Image}
                width={180}
            />
            <CreateUserModal
                modalOpen={openCreateUserModal}
                onCancel={handleCancelCreateUser}
                onCreate={handleCreateUser}
            />
        </PrivatePageLayout>
    );
};

export default Game;
