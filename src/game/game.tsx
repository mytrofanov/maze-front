import React, { ChangeEvent } from 'react';
import { Direction, GameLogs, MazeCell, PlayerType } from './types.ts';
import { localStorageUser } from '../variables';
import { CreateUserFormValues } from '../types';
import PageLayout from '../page-layout/page-layout.tsx';
import { WaitingScreen, PlayGame, CreateUserModal } from '../components';

import {
    AvailableGamesPayload,
    ConnectToGamePayload,
    ConnectToServerPayload,
    CreateGamePayload,
    CreateUserPayload,
    DirectionPayload,
    GamePayload,
    GameStatus,
    MessagePayload,
    SocketError,
    SocketErrorCodes,
    SocketSuccess,
    SocketSuccessCodes,
} from '../web-socket';
import { CurrentUser } from '../types';
import { useNotification } from '../hooks';
import NewGameScreen from '../components/new-game-screen.tsx';

interface socket {
    isConnected: boolean;
    createGame: (payload: CreateGamePayload) => void;
    connectToServer: (payload: ConnectToServerPayload | null) => void;
    connectGame: (payload: ConnectToGamePayload) => void;
    error?: SocketError;
    success?: SocketSuccess;
    createUser: (payload: CreateUserPayload) => void;
    game?: GamePayload;
    availableGames?: AvailableGamesPayload;
    onDirectionInput: (payload: DirectionPayload) => void;
    gameStatus: GameStatus;
    gameLogs: GameLogs;
    onSendMessage: (payload: MessagePayload) => void;
}

interface GameProps {
    socket: socket;
}

const Game = (props: GameProps) => {
    const { socket } = props;
    const notification = useNotification();
    const [currentPlayer, setCurrentPlayer] = React.useState<PlayerType>(PlayerType.PLAYER1);
    const [winner, setWinner] = React.useState<PlayerType | null>();
    const [openWinnerModal, setOpenWinnerModal] = React.useState<boolean>(false);
    const [openCreateUserModal, setOpenCreateUserModal] = React.useState<boolean>(false);
    //const [gameLogs, setGameLogs] = React.useState<GameLogs>([]);
    // const [username, setUsername] = React.useState<string | null>(null);
    const [currentUser, setCurrentUser] = React.useState<CurrentUser | undefined>(undefined);
    const [currentMessage, setCurrentMessage] = React.useState<string>('');
    const [newMazeArr, setNewMazeArr] = React.useState<MazeCell[][] | undefined>(undefined);

    React.useEffect(() => {
        if (!socket.game) return;
        setNewMazeArr(socket.game.maze);
        if (socket.game.game.currentPlayer === currentPlayer) {
            setCurrentPlayer(socket.game.game.currentPlayer);
        }
        if (socket.game.game.winner) {
            setWinner(socket.game.game.winner);
            setOpenWinnerModal(true);
        }
    }, [socket.game]);

    React.useEffect(() => {
        const storedUserString = localStorage.getItem(localStorageUser);
        if (storedUserString) {
            const storedUser = JSON.parse(storedUserString);
            socket.connectToServer({ userName: storedUser.userName, userId: storedUser.id });
            setCurrentUser(storedUser);
        } else {
            setOpenCreateUserModal(true);
        }
    }, []);

    React.useEffect(() => {
        if (socket.success?.code === SocketSuccessCodes.USER_CREATED) {
            localStorage.setItem(localStorageUser, JSON.stringify(socket.success.payload.user));
            const socketUser = socket.success.payload.user;
            setCurrentUser({ userName: socketUser.userName, userId: socketUser.id, type: socketUser.type });
            setOpenCreateUserModal(false);
        }
    }, [socket.success]);

    React.useEffect(() => {
        if (socket.error?.code === SocketErrorCodes.USERNAME_TAKEN) {
            localStorage.removeItem(localStorageUser);
            setCurrentUser(undefined);
            setOpenCreateUserModal(true);
        }
    }, [socket.error]);

    // const togglePlayer = () => {
    //     setCurrentPlayer(prev => (prev === PlayerType.PLAYER1 ? PlayerType.PLAYER2 : PlayerType.PLAYER1));
    // };

    const saveLogs = (currentPlayer: PlayerType, message: string) => {
        if (!socket.game || !currentUser) return;
        const playerType = currentPlayer === PlayerType.PLAYER1 ? PlayerType.PLAYER1 : PlayerType.PLAYER2;
        const newLog = {
            gameId: socket.game.game.id,
            playerType: playerType,
            playerId: currentUser.userId,
            message: `${playerType} message: ${message} at`,
        };
        socket.onSendMessage(newLog);
    };

    const handleDirectionInput = (direction: Direction) => {
        if (!socket.game || !currentUser) return;
        const gameId = socket.game.game.id;
        const playerId = currentUser?.userId;
        //const player1 = socket.game.game.player1Id;
        //const playerType = player1 === playerId ? PlayerType.PLAYER1 : PlayerType.PLAYER2;
        const playerType = currentUser.type;
        if (!playerId) return;
        console.log('before onDirection: ', direction);

        socket.onDirectionInput({ direction, gameId, playerId, playerType, message: undefined });

        // const startPosition = findPlayerPosition(newMazeArr, currentPlayer);
        // if (!startPosition) {
        //     console.log('Players are not found on maze');
        //     return;
        // }

        // let newX = startPosition.x;
        // let newY = startPosition.y;
        //
        // if (direction === Direction.UP) {
        //     newY -= 1;
        // }
        // if (direction === Direction.DOWN) {
        //     newY += 1;
        // }
        // if (direction === Direction.LEFT) {
        //     newX -= 1;
        // }
        // if (direction === Direction.RIGHT) {
        //     newX += 1;
        // }

        // saveLogs(currentPlayer, playerId, direction, newX, newY);

        // if (newMazeArr[newY][newX].type !== Cell.WALL) {
        //     if (currentPlayer === PlayerType.PLAYER1) {
        //         if (newMazeArr[newY][newX].type === Cell.EXIT) {
        //             setWinner(PlayerType.PLAYER1);
        //             setOpenWinnerModal(true);
        //         }
        //     } else {
        //         if (newMazeArr[newY][newX].type === Cell.EXIT) {
        //             setWinner(PlayerType.PLAYER2);
        //             setOpenWinnerModal(true);
        //         }
        //     }
        //     setNewMazeArr(prev =>
        //         updateMazeCell(prev, { x: newX, y: newY }, true, startPosition, direction, currentPlayer),
        //     );
        // }
        // setNewMazeArr(prev => updateMazeCell(prev, { x: newX, y: newY }, true, undefined, undefined, undefined));
        // togglePlayer();
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
                saveLogs(currentPlayer, currentMessage);
            }
        }
    };

    React.useEffect(() => {
        if (socket.isConnected) {
            notification.success('Game connected to server');
        }
        if (!socket.isConnected) {
            notification.error('Connection lost');
        }
    }, [socket.isConnected]);

    const handleCreateNewGame = () => {
        if (!currentUser) {
            console.log('User is not registered');
            return;
        }
        socket.createGame({ player1Id: currentUser.userId });
    };

    const handleConnectGame = (gameId: string) => {
        if (!currentUser) return;
        socket.connectGame({ gameId, userId: currentUser.userId });
    };

    return (
        <PageLayout
            userName={currentUser?.userName}
            currentPlayer={currentPlayer}
            gameLogs={socket.gameLogs}
            currentMessage={currentMessage}
            onMessageChange={handleTextInput}
            onKeyPress={handleInputKeyPress}
            gameStage={socket.gameStatus}
            waitingList={socket.availableGames}
            onConnectGame={handleConnectGame}
            connected={socket.isConnected}
        >
            <WaitingScreen gameStatus={socket.gameStatus} />
            <NewGameScreen gameStage={socket.gameStatus} onCreateNewGame={handleCreateNewGame} />
            <PlayGame
                gameStage={socket.gameStatus}
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
