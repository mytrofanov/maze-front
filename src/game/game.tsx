import React, { ChangeEvent } from 'react';
import { Direction, PlayerType } from './types.ts';
import { localStorageUser } from '../variables';
import { CreateUserFormValues, CurrentUser } from '../types';
import PageLayout from '../page-layout/page-layout.tsx';
import { CreateUserModal, PlayGame, WaitingScreen } from '../components';

import { GameStatus, Row, SocketErrorCodes, SocketSuccessCodes } from '../web-socket';
import { useNotification } from '../hooks';
import NewGameScreen from '../components/new-game-screen.tsx';
import useSocket from '../web-socket/useSocket.tsx';

const Game = () => {
    const socket = useSocket();
    const notification = useNotification();
    const [winner, setWinner] = React.useState<PlayerType | null>();
    const [openWinnerModal, setOpenWinnerModal] = React.useState<boolean>(false);
    const [openCreateUserModal, setOpenCreateUserModal] = React.useState<boolean>(false);
    const [currentUser, setCurrentUser] = React.useState<CurrentUser | undefined>(undefined);
    const [currentMessage, setCurrentMessage] = React.useState<string>('');
    const [maze, setMaze] = React.useState<Row[] | undefined>(undefined);
    const exitEnabled =
        socket.gameStatus === GameStatus.WAITING_FOR_PLAYER || socket.gameStatus === GameStatus.COMPLETED;

    React.useEffect(() => {
        if (!socket.gameState) return;
        if (socket.gameState.maze) {
            setMaze(socket.gameState.maze.rows);
        }
        setWinner(socket.gameState.game.winner);

        if (currentUser) {
            //get user from Game
            const playerType =
                socket.gameState?.game.player1Id === currentUser?.userId ? PlayerType.PLAYER1 : PlayerType.PLAYER2;
            setCurrentUser(
                playerType === PlayerType.PLAYER1 ? socket.gameState.game.player1 : socket.gameState.game.player2,
            );
        }
        console.log('maze:', maze);
        console.log('check type currentUser:', currentUser);
    }, [socket.gameState]);

    React.useEffect(() => {
        if (winner) setOpenWinnerModal(true);
    }, [winner]);

    React.useEffect(() => {
        const storedUserString = localStorage.getItem(localStorageUser);
        if (storedUserString) {
            const storedUser = JSON.parse(storedUserString);
            socket.connectToServer({ userName: storedUser.userName, userId: storedUser.id });
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
        if (!socket.gameState || !currentUser) return;
        const playerType = currentPlayer === PlayerType.PLAYER1 ? PlayerType.PLAYER1 : PlayerType.PLAYER2;
        const newLog = {
            gameId: socket.gameState.game.id,
            playerType: playerType,
            playerId: currentUser.userId,
            message: `${message} at`,
        };
        socket.onSendMessage(newLog);
    };

    const handleDirectionInput = (direction: Direction) => {
        if (!socket.gameState || !currentUser) return;
        const gameId = socket.gameState.game.id;
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
        if (!socket.gameState) return;
        window.addEventListener('keydown', handleGlobalKeyPress);

        return () => {
            window.removeEventListener('keydown', handleGlobalKeyPress);
        };
    }, [socket.gameState?.game.currentPlayer]);

    const onExit = () => {
        if (!socket.gameState || !currentUser) return;
        socket.gameExit({ gameId: socket.gameState.game.id, playerId: currentUser.userId });
    };

    const handleWinnerModalOk = () => {
        console.log('Winner is: ', winner);
        setOpenWinnerModal(false);
        onExit();
    };

    const handleWinnerModalCancel = () => {
        console.log('Winner is: ', winner);
        setOpenWinnerModal(false);
        onExit();
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

    const onSendMessage = () => {
        saveLogs(currentMessage, socket.gameState?.game.currentPlayer);
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (Object.values(Direction).includes(currentMessage as Direction)) {
                handleDirectionInput(currentMessage as Direction);
            } else {
                onSendMessage();
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

    const onGiveUP = () => {
        if (!socket.gameState || !currentUser) return;
        socket.giveUP({ gameId: socket.gameState.game.id, playerId: currentUser.userId });
    };

    return (
        <PageLayout
            connected={socket.isConnected}
            currentMessage={currentMessage}
            currentUser={currentUser}
            exitDisabled={!exitEnabled}
            gameLogs={socket.gameLogs}
            gameStatus={socket.gameStatus}
            onConnectGame={handleConnectGame}
            onGiveUP={onGiveUP}
            onExit={onExit}
            onKeyPress={handleInputKeyPress}
            onMessageChange={handleTextInput}
            onSendMessage={onSendMessage}
            waitingList={socket.availableGames}
        >
            <WaitingScreen gameStatus={socket.gameStatus} />
            <NewGameScreen gameStatus={socket.gameStatus} onCreateNewGame={handleCreateNewGame} />
            <PlayGame
                gameStatus={socket.gameStatus}
                handleWinnerModalCancel={handleWinnerModalCancel}
                handleWinnerModalOk={handleWinnerModalOk}
                openWinnerModal={openWinnerModal}
                maze={maze}
                winner={winner}
                currentUser={currentUser}
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
