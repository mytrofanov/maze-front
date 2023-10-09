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
    SocketError,
    SocketErrorCodes,
    SocketEvents,
    SocketSuccess,
    SocketSuccessCodes,
} from './socket-types.ts';
import { GameStage } from '../game';

const useSocket = () => {
    const [isConnected, setIsConnected] = React.useState<boolean>(socket.connected);
    const [error, setError] = React.useState<SocketError | undefined>(undefined);
    const [success, setSuccess] = React.useState<SocketSuccess | undefined>(undefined);
    const [game, setGame] = React.useState<GamePayload | undefined>(undefined);
    const [availableGames, setAvailableGames] = React.useState<AvailableGamesPayload | undefined>(undefined);
    const [gameStage, setGameStage] = React.useState<GameStage>(GameStage.WAITING);

    const createGame = (payload: CreateGamePayload) => {
        socket.emit(SocketEvents.CREATE_GAME, payload);
    };

    const connectGame = (payload: ConnectToGamePayload) => {
        socket.emit(SocketEvents.CONNECT_GAME, payload);
    };
    const createUser = (payload: CreateUserPayload) => {
        socket.emit(SocketEvents.CREATE_USER, payload);
    };
    const onDirectionInput = (payload: DirectionPayload) => {
        socket.emit(SocketEvents.DIRECTION, payload);
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
        setGame(payload);
        setGameStage(GameStage.NEW_GAME);
    };

    const onGameUpdated = (payload: GamePayload) => {
        setGame(payload);
    };

    const onAvailableGames = (payload: AvailableGamesPayload) => {
        setAvailableGames(payload);
    };

    React.useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on(SocketEvents.CONNECT, onConnect);
        socket.on(SocketEvents.DISCONNECT, onDisconnect);
        socket.on(SocketEvents.GAME_CREATED, onGameCreated);
        socket.on(SocketEvents.GAME_UPDATED, onGameUpdated);
        socket.on(SocketEvents.GAME_CONNECTED, onGameUpdated);
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
        gameStage,
        availableGames,
        createGame,
        connectGame,
        connectToServer,
        error,
        success,
        createUser,
        onDirectionInput,
    };
};

export default useSocket;
