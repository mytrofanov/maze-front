import React from 'react';
import { socket } from '../socket';
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
    SocketEvents,
    SocketSuccess,
    SocketSuccessCodes,
} from './socket-types.ts';
import { GameLogs } from '../game';

const useSocket = () => {
    const [connected, setIsConnected] = React.useState<boolean>(socket.connected);
    const [error, setError] = React.useState<SocketError | undefined>(undefined);
    const [success, setSuccess] = React.useState<SocketSuccess | undefined>(undefined);
    const [game, setGame] = React.useState<GamePayload | undefined>(undefined);
    const [availableGames, setAvailableGames] = React.useState<AvailableGamesPayload | undefined>(undefined);
    const [gameStatus, setGameStatus] = React.useState<GameStatus>(GameStatus.WELCOME_SCREEN);
    const [gameLogs, setGameLogs] = React.useState<GameLogs>([]);

    const successMemo = React.useMemo(() => {
        return success;
    }, [success]);
    const errorMemo = React.useMemo(() => {
        return error;
    }, [error]);

    const isConnected = React.useMemo(() => {
        return connected;
    }, [connected]);

    React.useEffect(() => {
        console.log('successMemo: ', successMemo);
        console.log('errorMemo: ', errorMemo);
    }, [errorMemo, successMemo]);

    const createGame = (payload: CreateGamePayload) => {
        console.log('socket isConnected', isConnected);
        console.log('createGame payload', payload);
        socket.emit(SocketEvents.CREATE_GAME, payload);
    };

    const connectGame = (payload: ConnectToGamePayload) => {
        setGameStatus(GameStatus.CONNECTING);
        socket.emit(SocketEvents.CONNECT_GAME, payload);
    };
    const createUser = (payload: CreateUserPayload) => {
        socket.emit(SocketEvents.CREATE_USER, payload);
    };
    const onDirectionInput = (payload: DirectionPayload) => {
        console.log('onDirectionInput DirectionPayload: ', payload);
        socket.emit(SocketEvents.DIRECTION, payload);
    };
    const onSendMessage = (payload: MessagePayload) => {
        socket.emit(SocketEvents.SEND_MESSAGE, payload);
    };
    const connectToServer = (payload: ConnectToServerPayload | null) => {
        if (payload) {
            socket.io.opts.query = {
                userName: payload.userName,
                userId: payload.userId,
            };
        }
        socket.connect();
    };

    const onGameCreated = (payload: GamePayload) => {
        console.log('onGameCreated: ', payload.maze);
        setGame(payload);
        setGameStatus(GameStatus.WAITING_FOR_PLAYER);
    };

    const onGameConnected = (payload: GamePayload) => {
        setGameStatus(GameStatus.IN_PROGRESS);
        setGame(payload);
    };

    const onGameUpdated = (payload: GamePayload) => {
        console.log('onGameUpdated: ', payload.game);
        setGame(payload);
        setGameStatus(payload.game.status);
    };

    const onLogUpdated = (payload: GameLogs) => {
        setGameLogs(payload);
    };

    const onAvailableGames = (payload: AvailableGamesPayload) => {
        console.log('AvailableGamesPayload: ', payload);
        setAvailableGames(payload);
    };

    React.useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            console.log('onDisconnect');
            setGameStatus(GameStatus.CONNECTION_ERROR);
            setIsConnected(false);
        }

        socket.on(SocketEvents.CONNECT, onConnect);
        socket.on(SocketEvents.DISCONNECT, onDisconnect);
        socket.on(SocketEvents.GAME_CREATED, onGameCreated);
        socket.on(SocketEvents.GAME_UPDATED, onGameUpdated);
        socket.on(SocketEvents.LOG_UPDATED, onLogUpdated);
        socket.on(SocketEvents.GAME_CONNECTED, onGameConnected);
        socket.on(SocketEvents.AVAILABLE_GAMES, onAvailableGames);
        socket.on(SocketEvents.ERROR, error => {
            if (!Object.values(SocketErrorCodes).includes(error.code)) {
                console.log('An unknown error occurred.');
            }
            setError(error);
        });
        socket.on(SocketEvents.SUCCESS, success => {
            if (!Object.values(SocketSuccessCodes).includes(success.code)) {
                console.log('An unknown success code.');
            }
            setSuccess(success);
        });

        return () => {
            socket.off(SocketEvents.CONNECT, onConnect);
            socket.off(SocketEvents.DISCONNECT, onDisconnect);
            socket.off(SocketEvents.GAME_CREATED);
            socket.off(SocketEvents.ERROR);
            socket.off(SocketEvents.SUCCESS);
        };
    }, []);

    return {
        isConnected,
        game,
        gameStatus,
        gameLogs,
        availableGames,
        createGame,
        connectGame,
        connectToServer,
        error,
        success,
        createUser,
        onSendMessage,
        onDirectionInput,
    };
};

export default useSocket;
