import React, { ChangeEvent } from 'react';
import { Cell, Direction, GameLogs, MazeCell, PlayerType, Position } from './types.ts';
import { Maze } from '../components';
import { localStorageUserName, player1Image, player2Image } from '../variables';
import CustomModal from '../components/modal.tsx';
import CreateUserModal, { CreateUserFormValues } from '../components/create-user-modal.tsx';
import PrivatePageLayout from '../page-layout/private-page-layout.tsx';
import { findPlayerPosition } from '../utils/find-player-position.ts';
import { newMaze } from '../variables';
import { updateMazeCell } from '../utils/update-maze.ts';

// const maze: MazeType = [
//     [Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
//     [Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL],
//     [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
//     [Cell.WALL, Cell.WALL, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
//     [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
//     [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL],
//     [Cell.WALL, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
//     [Cell.WALL, Cell.WALL, Cell.WALL, Cell.PATH, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
//     [Cell.EXIT, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.PATH, Cell.WALL],
//     [Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
// ];

const Game = () => {
    //const [player1, setPlayer1] = React.useState<Player>({ position: { x: 1, y: 1 }, avatar: player1Image });
    //const [player2, setPlayer2] = React.useState<Player>({ position: { x: 1, y: 8 }, avatar: player2Image });
    //const [currentPlayer, setCurrentPlayer] = React.useState<Players>(Players.PLAYER1);
    const [currentPlayer, setCurrentPlayer] = React.useState<PlayerType>(PlayerType.PLAYER1);
    //const [revealed, setRevealed] = React.useState<boolean[][]>(createRevealedMaze(maze, player1, player2));
    const [vinner, setVinner] = React.useState<PlayerType | null>();
    const [openWinnerModal, setOpenWinnerModal] = React.useState<boolean>(false);
    const [openCreateUserModal, setOpenCreateUserModal] = React.useState<boolean>(false);
    const [gameLogs, setGameLogs] = React.useState<GameLogs>([]);
    //const [directions, setDirections] = React.useState<DirectionMap>(directionsMap(maze));
    const [username, setUsername] = React.useState<string | null>(null);
    const [currentMessage, setCurrentMessage] = React.useState<string>('');
    const [newMazeArr, setNewMazeArr] = React.useState<MazeCell[][]>(newMaze);

    React.useEffect(() => {
        const storedName = localStorage.getItem(localStorageUserName);
        if (storedName) {
            setUsername(storedName);
        } else {
            setOpenCreateUserModal(true);
        }
    }, []);

    const togglePlayer = () => {
        setCurrentPlayer(prev => (prev === PlayerType.PLAYER1 ? PlayerType.PLAYER2 : PlayerType.PLAYER1));
    };

    const saveLogs = (
        currentPlayer: PlayerType,
        direction?: Direction,
        newX?: number,
        newY?: number,
        message?: string,
    ) => {
        const playerId = currentPlayer === PlayerType.PLAYER1 ? PlayerType.PLAYER1 : PlayerType.PLAYER2;
        const created = new Date().toLocaleTimeString();
        const newLog = {
            playerId,
            direction: direction ? direction : null,
            position: newX && newY ? { x: newX, y: newY } : null,
            message: message
                ? `${playerId} message: ${message} at ${created}`
                : `${playerId} going ${direction} at ${created}`,
            created,
            playerAvatar: currentPlayer === PlayerType.PLAYER1 ? player1Image : player2Image,
        };
        setGameLogs(prevLogs => [newLog, ...prevLogs]);
    };

    const handleDirectionInput = (direction: Direction) => {
        console.log('handleDirectionInput');
        const startPosition = findPlayerPosition(newMazeArr, currentPlayer);
        if (!startPosition) {
            console.log('Players are not found on maze');
            return;
        }

        let newX = startPosition.x;
        let newY = startPosition.y;

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

        if (newMazeArr[newY][newX].type !== Cell.WALL) {
            if (currentPlayer === PlayerType.PLAYER1) {
                if (newMazeArr[newY][newX].type === Cell.EXIT) {
                    setVinner(PlayerType.PLAYER1);
                    setOpenWinnerModal(true);
                }
            } else {
                if (newMazeArr[newY][newX].type === Cell.EXIT) {
                    setVinner(PlayerType.PLAYER2);
                    setOpenWinnerModal(true);
                }
            }
            setNewMazeArr(prev =>
                updateMazeCell(prev, { x: newX, y: newY }, true, startPosition, direction, currentPlayer),
            );
        }
        setNewMazeArr(prev => updateMazeCell(prev, { x: newX, y: newY }, true, undefined, undefined, undefined));
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
    }, [currentPlayer]);

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
            if (Object.values(Direction).includes(currentMessage as Direction)) {
                handleDirectionInput(currentMessage as Direction);
            } else {
                saveLogs(currentPlayer, undefined, undefined, undefined, currentMessage);
            }
        }
    };

    return (
        <PrivatePageLayout
            userName={username}
            currentPlayer={currentPlayer}
            gameLogs={gameLogs}
            currentMessage={currentMessage}
            onMessageChange={handleTextInput}
            onKeyPress={handleInputKeyPress}
        >
            <Maze maze={newMazeArr} />
            <CustomModal
                modalOpen={openWinnerModal}
                onOk={handleWinnerModalOk}
                title="Vinner"
                content={`Player ${vinner} vins!`}
                onCancel={handleWinnerModalCancel}
                image={vinner === PlayerType.PLAYER1 ? player1Image : player2Image}
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
