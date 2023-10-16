import React, { ChangeEvent } from 'react';
import { Direction, GameLog, PlayerType } from './types.ts';
import { localStorageUser } from '../variables';
import { CreateUserFormValues } from '../types';
import PageLayout from '../page-layout/page-layout.tsx';
import { CreateUserModal, PlayGame, WaitingScreen } from '../components';

import { GameStatus, Row, SocketErrorCodes, SocketSuccessCodes, SocketUser } from '../web-socket';
import { useNotification } from '../hooks';
import NewGameScreen from '../components/new-game-screen.tsx';
import useSocket from '../web-socket/useSocket.tsx';
import CustomModal from '../components/modal.tsx';

const Game = () => {
    const socket = useSocket();
    const notification = useNotification();
    const [winner, setWinner] = React.useState<PlayerType | null>();
    const [openWinnerModal, setOpenWinnerModal] = React.useState<boolean>(false);
    const [openGiveUPModal, setOpenGiveUPModal] = React.useState<boolean>(false);
    const [openCreateUserModal, setOpenCreateUserModal] = React.useState<boolean>(false);
    const [currentUser, setCurrentUser] = React.useState<SocketUser | undefined>(undefined);
    const [currentMessage, setCurrentMessage] = React.useState<string>('');
    const [maze, setMaze] = React.useState<Row[] | undefined>(undefined);
    const [selectedLog, setSelectedLog] = React.useState<GameLog | null>(null);

    //CAN LEAVE GAME IF NO OTHER PLAYERS OR GAME HAS WINNER
    const exitEnabled = socket.gameStatus === GameStatus.WAITING_FOR_PLAYER || winner;

    React.useEffect(() => {
        if (!socket.gameState) return;
        if (socket.gameState.maze?.rows) {
            setMaze(socket.gameState.maze.rows);
        }
        setWinner(socket.gameState.game.winner);
    }, [socket.gameState]);

    const updateUser = (fetchedUser: SocketUser) => {
        if (currentUser && currentUser.id !== fetchedUser.id) return;
        localStorage.setItem(localStorageUser, JSON.stringify(fetchedUser));
        setCurrentUser(fetchedUser);
    };

    //UPDATE USER TYPE FROM GAME
    React.useEffect(() => {
        if (!socket.gameState?.game.player1 || !socket.gameState?.game.player2) return;
        const isPlayer1 = socket.gameState?.game.player1Id === currentUser?.id;
        const isPlayer2 = socket.gameState?.game.player2Id === currentUser?.id;
        if (currentUser && socket.gameState?.game) {
            if (isPlayer1 && currentUser.type !== socket.gameState?.game.player1.type) {
                updateUser(socket.gameState?.game.player1);
            }
            if (isPlayer2 && currentUser.type !== socket.gameState?.game.player2.type) {
                updateUser(socket.gameState?.game.player2);
            }
        }
    }, [socket.gameState]);

    // React.useEffect(() => {
    //     console.log('check type currentUser:', currentUser);
    // }, [currentUser]);

    React.useEffect(() => {
        if (winner) {
            setOpenWinnerModal(true);
            const isPlayer1Winner = winner == PlayerType.PLAYER1;
            saveLogs(
                `Player ${
                    isPlayer1Winner ? socket.gameState?.game.player1.userName : socket.gameState?.game.player2.userName
                } won!`,
                winner,
            );
        }
    }, [winner]);

    //CHECK USER ON START
    React.useEffect(() => {
        const storedUserString = localStorage.getItem(localStorageUser);
        if (storedUserString) {
            const storedUser = JSON.parse(storedUserString);
            socket.connectToServer({ userName: storedUser.userName, userId: storedUser.id });
        } else {
            setOpenCreateUserModal(true);
        }
    }, []);

    //SAVE USER ON CREATE
    React.useEffect(() => {
        if (socket.success?.code === SocketSuccessCodes.USER_CREATED) {
            updateUser(socket.success.payload.user);
            setOpenCreateUserModal(false);
        }
    }, [socket.success]);

    //CLEAR USER DATA ON USER NAME TAKEN
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
            playerId: currentUser.id,
            message: `${message} at`,
        };
        socket.onSendMessage(newLog);
    };

    const handleDirectionInput = (direction: Direction) => {
        if (!socket.gameState || !currentUser || socket.gameState.game.winner) return;
        const gameId = socket.gameState.game.id;
        const playerId = currentUser?.id;

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

        if (direction && !socket.gameState?.game.winner) {
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
        socket.gameExit({ gameId: socket.gameState.game.id, playerId: currentUser.id });
    };

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

    const onSendMessage = () => {
        saveLogs(currentMessage, socket.gameState?.game.currentPlayer);
    };

    const checkMessageOrDirection = () => {
        if (Object.values(Direction).includes(currentMessage as Direction)) {
            if (socket.gameState?.game.winner) return;
            handleDirectionInput(currentMessage as Direction);
        } else {
            onSendMessage();
        }
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            checkMessageOrDirection();
        }
    };

    //NOTIFICATIONS
    React.useEffect(() => {
        if (socket.isConnected) {
            notification.success('Game connected to server');
        }
        if (!socket.isConnected) {
            notification.error('Connection lost');
        }
    }, [socket.isConnected]);

    React.useEffect(() => {
        if (socket.opponentDisconnected) {
            notification.error('Your opponent has lost connection!');
        }
    }, [socket.opponentDisconnected]);

    const handleCreateNewGame = () => {
        if (!currentUser) {
            console.log('User is not registered');
            return;
        }
        socket.createGame({ player1Id: currentUser.id });
    };

    const handleConnectGame = (gameId: string) => {
        if (!currentUser) return;
        socket.connectGame({ gameId, userId: currentUser.id });
    };

    const onGiveUP = () => {
        setOpenGiveUPModal(true);
    };

    const onConfirmGiveUp = () => {
        if (!socket.gameState || !currentUser) return;
        socket.giveUP({ gameId: socket.gameState.game.id, playerId: currentUser.id });
        setOpenGiveUPModal(false);
    };

    const onCancelGiveUp = () => {
        setOpenGiveUPModal(false);
    };

    return (
        <PageLayout
            connected={socket.isConnected}
            currentMessage={currentMessage}
            currentUser={currentUser}
            exitDisabled={!exitEnabled}
            gameLogs={socket.gameLogs}
            gameStatus={socket.gameStatus}
            hasWinner={winner !== null}
            onConnectGame={handleConnectGame}
            onGiveUP={onGiveUP}
            onExit={onExit}
            onKeyPress={handleInputKeyPress}
            onMessageChange={handleTextInput}
            onSendMessage={checkMessageOrDirection}
            waitingList={socket.availableGames}
            historyList={socket.historyGameList}
        >
            <WaitingScreen gameStatus={socket.gameStatus} />
            <NewGameScreen
                gameStatus={socket.gameStatus}
                onCreateNewGame={handleCreateNewGame}
                hasHistory={socket.hasHistory}
                onReplayMode={socket.onReplayMode}
            />
            <PlayGame
                gameStatus={socket.gameStatus}
                handleWinnerModalCancel={handleWinnerModalCancel}
                handleWinnerModalOk={handleWinnerModalOk}
                openWinnerModal={openWinnerModal}
                maze={maze}
                winner={winner}
                currentUser={currentUser}
                currentPlayer={socket.gameState?.game.currentPlayer}
            />
            <CreateUserModal
                modalOpen={openCreateUserModal}
                onCancel={handleCancelCreateUser}
                onCreate={handleCreateUser}
            />
            <CustomModal
                modalOpen={openGiveUPModal}
                onCancel={onCancelGiveUp}
                onOk={onConfirmGiveUp}
                title="Do you want to give up?"
                width={360}
                content="You will loose if confirm!"
            />
        </PageLayout>
    );
};

export default Game;
