import React, { ChangeEvent } from 'react';
import { Cell, Direction, GameLogs, GameStage, MazeCell, PlayerType } from './types.ts';
import { localStorageUser, player1Image, player2Image } from '../variables';
import CreateUserModal, { CreateUserFormValues } from '../components/create-user-modal.tsx';
import PageLayout from '../page-layout/page-layout.tsx';
import { findPlayerPosition } from '../utils/find-player-position.ts';
import { newMaze } from '../variables';
import { updateMazeCell } from '../utils/update-maze.ts';
import Waiting from '../components/waiting.tsx';
import PlayGame from '../components/play-game.tsx';
import {
    ConnectToServerPayload,
    CreateGamePayload,
    CreateUserPayload,
    SocketError,
    SocketSuccess,
    SocketSuccessCodes,
} from '../web-socket/useSocket.tsx';
import { CurrentUser } from '../types';

interface socket {
    isConnected: boolean;
    createGame: (payload: CreateGamePayload) => void;
    connectToServer: (payload: ConnectToServerPayload | null) => void;
    error: SocketError | undefined;
    success: SocketSuccess | undefined;
    createUser: (payload: CreateUserPayload) => void;
    game: unknown;
}

interface GameProps {
    socket: socket;
}

const Game = (props: GameProps) => {
    const { socket } = props;
    const [currentPlayer, setCurrentPlayer] = React.useState<PlayerType>(PlayerType.PLAYER1);
    const [winner, setWinner] = React.useState<PlayerType | null>();
    const [openWinnerModal, setOpenWinnerModal] = React.useState<boolean>(false);
    const [openCreateUserModal, setOpenCreateUserModal] = React.useState<boolean>(false);
    const [gameLogs, setGameLogs] = React.useState<GameLogs>([]);
    const [username, setUsername] = React.useState<string | null>(null);
    const [currentUser, setCurrentUser] = React.useState<CurrentUser | undefined>(undefined);
    const [currentMessage, setCurrentMessage] = React.useState<string>('');
    const [newMazeArr, setNewMazeArr] = React.useState<MazeCell[][]>(newMaze);
    const [gameStage, setGameStage] = React.useState<GameStage>(GameStage.WAITING);

    React.useEffect(() => {
        const storedUserString = localStorage.getItem(localStorageUser);
        if (storedUserString) {
            const storedUser = JSON.parse(storedUserString);
            socket.connectToServer(storedUser);
            setCurrentUser(storedUser);
        } else {
            setOpenCreateUserModal(true);
        }
    }, []);

    React.useEffect(() => {
        if (socket.success?.code === SocketSuccessCodes.USER_CREATED) {
            localStorage.setItem(localStorageUser, JSON.stringify(socket.success.payload));
            setCurrentUser(socket.success.payload);
            setOpenCreateUserModal(false);
        }
    }, [socket.success]);

    const togglePlayer = () => {
        setCurrentPlayer(prev => (prev === PlayerType.PLAYER1 ? PlayerType.PLAYER2 : PlayerType.PLAYER1));
    };

    const saveLogs = (
        currentPlayer: PlayerType,
        playerId: number,
        direction?: Direction,
        newX?: number,
        newY?: number,
        message?: string,
    ) => {
        const playerType = currentPlayer === PlayerType.PLAYER1 ? PlayerType.PLAYER1 : PlayerType.PLAYER2;
        const created = new Date().toLocaleTimeString();
        const newLog = {
            playerType: playerType,
            playerId: playerId,
            direction: direction ? direction : null,
            position: newX && newY ? { x: newX, y: newY } : null,
            message: message
                ? `${playerType} message: ${message} at ${created}`
                : `${playerType} going ${direction} at ${created}`,
            created,
            playerAvatar: currentPlayer === PlayerType.PLAYER1 ? player1Image : player2Image,
        };
        setGameLogs(prevLogs => [newLog, ...prevLogs]);
    };

    const handleDirectionInput = (direction: Direction) => {
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

        saveLogs(currentPlayer, playerId, direction, newX, newY);

        if (newMazeArr[newY][newX].type !== Cell.WALL) {
            if (currentPlayer === PlayerType.PLAYER1) {
                if (newMazeArr[newY][newX].type === Cell.EXIT) {
                    setWinner(PlayerType.PLAYER1);
                    setOpenWinnerModal(true);
                }
            } else {
                if (newMazeArr[newY][newX].type === Cell.EXIT) {
                    setWinner(PlayerType.PLAYER2);
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
        console.log('Winner is: ', winner);
        setOpenWinnerModal(false);
    };

    const handleWinnerModalCancel = () => {
        console.log('Winner is: ', winner);
        setOpenWinnerModal(false);
    };

    const handleCreateUser = (formValues: CreateUserFormValues) => {
        if (socket.isConnected) {
            console.log('Already connected');
            socket.createUser(formValues);
            return;
        }
        socket.connectToServer(formValues);
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
    const waitingList = [
        {
            gameTimeInitiation: new Date().toISOString(),
            initiatorUserName: 'Max',
        },
        {
            gameTimeInitiation: new Date().toISOString(),
            initiatorUserName: 'Mike',
        },
        {
            gameTimeInitiation: new Date().toISOString(),
            initiatorUserName: 'Nino',
        },
    ];

    const handleCreateNewGame = () => {
        console.log('handleCreateNewGame');
        if (!socket.isConnected) {
            console.log('No connection');
            return;
        }
        if (!currentUser) {
            console.log('User is not registered');
            return;
        }
        socket.createGame({ player1Id: currentUser.userId });
    };

    return (
        <PageLayout
            userName={username}
            currentPlayer={currentPlayer}
            gameLogs={gameLogs}
            currentMessage={currentMessage}
            onMessageChange={handleTextInput}
            onKeyPress={handleInputKeyPress}
            gameStage={gameStage}
            waitingList={waitingList}
        >
            <Waiting gameStage={gameStage} onCreateNewGame={handleCreateNewGame} />
            <PlayGame
                gameStage={gameStage}
                handleWinnerModalCancel={handleWinnerModalCancel}
                handleWinnerModalOk={handleWinnerModalOk}
                openWinnerModal={openWinnerModal}
                maze={newMazeArr}
                winner={winner}
            />
            <CreateUserModal
                modalOpen={openCreateUserModal}
                onCancel={handleCancelCreateUser}
                onCreate={handleCreateUser}
            />
        </PageLayout>
    );
};

export default Game;
