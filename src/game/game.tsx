import React, { ChangeEvent } from 'react';
import { Direction, GameLogs, MazeCell, PlayerType } from './types.ts';
import { localStorageUser } from '../variables';
import { CreateUserFormValues, CurrentUser } from '../types';
import PageLayout from '../page-layout/page-layout.tsx';
import { CreateUserModal, PlayGame, WaitingScreen } from '../components';

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
    const [winner, setWinner] = React.useState<PlayerType | null>();
    const [openWinnerModal, setOpenWinnerModal] = React.useState<boolean>(false);
    const [openCreateUserModal, setOpenCreateUserModal] = React.useState<boolean>(false);
    const [currentUser, setCurrentUser] = React.useState<CurrentUser | undefined>(undefined);
    const [currentMessage, setCurrentMessage] = React.useState<string>('');
    const [newMazeArr, setNewMazeArr] = React.useState<MazeCell[][] | undefined>(undefined);

    React.useEffect(() => {
        if (!socket.game) return;
        setNewMazeArr(socket.game.maze);
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

    const saveLogs = (message: string, currentPlayer?: PlayerType) => {
        if (!socket.game || !currentUser) return;
        const playerType = currentPlayer === PlayerType.PLAYER1 ? PlayerType.PLAYER1 : PlayerType.PLAYER2;
        const newLog = {
            gameId: socket.game.game.id,
            playerType: playerType,
            playerId: currentUser.userId,
            message: `${message} at`,
        };
        socket.onSendMessage(newLog);
    };

    const handleDirectionInput = (direction: Direction) => {
        if (!socket.game || !currentUser) return;
        const gameId = socket.game.game.id;
        const playerId = currentUser?.userId;

        if (!playerId) return;

        socket.onDirectionInput({ direction, gameId, playerId, message: undefined });
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
        if (!socket.game) return;
        window.addEventListener('keydown', handleGlobalKeyPress);

        return () => {
            window.removeEventListener('keydown', handleGlobalKeyPress);
        };
    }, [socket.game?.game.currentPlayer]);

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
                saveLogs(currentMessage, socket.game?.game.currentPlayer);
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
            currentUser={currentUser}
            player1Id={socket.game?.game.player1Id}
            currentPlayer={socket.game?.game.currentPlayer}
            gameLogs={socket.gameLogs}
            currentMessage={currentMessage}
            onMessageChange={handleTextInput}
            onKeyPress={handleInputKeyPress}
            gameStatus={socket.gameStatus}
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
