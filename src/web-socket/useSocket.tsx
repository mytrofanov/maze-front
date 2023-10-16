import React from 'react';
import { myNetwork, socket } from '../socket';
import {
    AvailableGamesPayload,
    ConnectToGamePayload,
    ConnectToServerPayload,
    CreateGamePayload,
    CreateUserPayload,
    DirectionPayload,
    GameExitPayload,
    GamePayload,
    GameStatus,
    GiveUpPayload,
    MessagePayload,
    ReplayGamePayload,
    SocketError,
    SocketErrorCodes,
    SocketEvents,
    SocketSuccess,
    SocketSuccessCodes,
} from './socket-types.ts';
import { GameLogs } from '../game';

const useSocket = () => {
    const [isConnected, setIsConnected] = React.useState<boolean>(false);
    const [error, setError] = React.useState<SocketError | undefined>(undefined);
    const [success, setSuccess] = React.useState<SocketSuccess | undefined>(undefined);
    const [gameState, setGameState] = React.useState<GamePayload | undefined>(undefined);
    const [availableGames, setAvailableGames] = React.useState<AvailableGamesPayload | undefined>(undefined);
    const [historyGameList, setHistoryGameList] = React.useState<AvailableGamesPayload | undefined>(undefined);
    const [gameStatus, setGameStatus] = React.useState<GameStatus>(GameStatus.WELCOME_SCREEN);
    const [gameLogs, setGameLogs] = React.useState<GameLogs>([]);
    const [opponentDisconnected, setOpponentDisconnected] = React.useState<boolean>(false);
    console.log('gameState: ', gameState);
    const clearGameState = () => {
        setGameState(undefined);
        setGameLogs([]);
        setHistoryGameList(undefined);
        setGameStatus(GameStatus.WELCOME_SCREEN);
        setOpponentDisconnected(false);
        setAvailableGames(undefined);
    };

    const createGame = (payload: CreateGamePayload) => {
        console.log('createGame payload: ', payload);
        clearGameState();
        socket.emit(SocketEvents.CREATE_GAME, payload);
    };

    const getAvailableGames = (payload: { userId: string }) => {
        console.log('getAvailableGames payload: ', payload);
        socket.emit(SocketEvents.GET_AVAILABLE_GAMES, payload);
    };

    const giveUP = (payload: GiveUpPayload) => {
        console.log('giveUP payload: ', payload);
        socket.emit(SocketEvents.GIVE_UP, payload);
    };

    const gameExit = (payload: GameExitPayload) => {
        clearGameState();
        socket.emit(SocketEvents.EXIT, payload);
    };

    React.useEffect(() => {
        if (socket.disconnected) setIsConnected(false);
        if (socket.connected) setIsConnected(true);
    }, [socket.connected, socket.disconnected]);

    const connectGame = (payload: ConnectToGamePayload) => {
        console.log('connectGame payload: ', payload);
        clearGameState();
        if (gameStatus !== GameStatus.REPLAY_MODE) {
            setGameStatus(GameStatus.CONNECTING);
            socket.emit(SocketEvents.CONNECT_GAME, payload);
        }
        if (gameStatus === GameStatus.REPLAY_MODE) {
            socket.emit(SocketEvents.REPLAY_GAME, payload);
        }
    };
    const createUser = (payload: CreateUserPayload) => {
        socket.emit(SocketEvents.CREATE_USER, payload);
    };

    const onReplayMode = () => {
        setGameStatus(GameStatus.REPLAY_MODE);
    };

    const onExitReplayMode = (payload: { userId: string }) => {
        console.log('onExitReplayMode', payload);
        clearGameState();
        setGameStatus(GameStatus.WELCOME_SCREEN);
        getAvailableGames(payload);
    };

    // const onReconnect = () => {
    //     console.log('Reconnected!');
    //     socket.emit('reconnected', gameState?.game ? { gameId: gameState.game.id } : null);
    // };
    const onDirectionInput = (payload: DirectionPayload) => {
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
        console.log('onGameCreated payload: ', payload);
        clearGameState();
        setGameState(payload);
        setGameStatus(GameStatus.WAITING_FOR_PLAYER);
    };

    const onReplayGame = (payload: ReplayGamePayload) => {
        console.log('onReplayGame payload: ', payload);
        clearGameState();
        setGameState(payload);
        setGameLogs(payload.game.logs);
        setGameStatus(payload.game.status);
        setHistoryGameList(undefined); //HIDE LIST TO SHOW LOGS
    };

    const onGameConnected = (payload: GamePayload) => {
        console.log('onGameConnected payload: ', payload);
        clearGameState();
        setGameState(payload);
        setGameStatus(payload.game.status);
        setOpponentDisconnected(false);
    };

    const onGameUpdated = async (payload?: GamePayload) => {
        console.log('onGameUpdated payload: ', payload);
        if (gameStatus === GameStatus.REPLAY_MODE) return;
        setGameState(payload);
        if (!payload) return;
        setGameStatus(payload.game.status);
    };

    const onLogUpdated = (payload: GameLogs) => {
        setGameLogs(payload);
    };

    const onAvailableGames = (payload: AvailableGamesPayload) => {
        setAvailableGames(payload);
    };

    const onCompletedGames = (payload: AvailableGamesPayload) => {
        console.log('onCompletedGames: ', payload);
        if (gameStatus === GameStatus.REPLAY_MODE) return;
        setHistoryGameList(payload);
    };

    const onOpponentDisconnected = () => {
        setOpponentDisconnected(true);
    };

    React.useEffect(() => {
        function onConnect() {
            console.log('Connected to server, on URL: ', myNetwork);
            setIsConnected(true);
        }

        function onDisconnect() {
            console.log('Disconnected from server, on URL: ', myNetwork);
            setGameStatus(GameStatus.CONNECTION_ERROR);
            setIsConnected(false);
        }

        socket.on(SocketEvents.CONNECT, onConnect);
        socket.on(SocketEvents.DISCONNECT, onDisconnect);
        // socket.on(SocketEvents.RECONNECT, onReconnect);
        socket.on(SocketEvents.GAME_CREATED, onGameCreated);
        socket.on(SocketEvents.GAME_UPDATED, onGameUpdated);
        socket.on(SocketEvents.GAME_TO_REPLAY, onReplayGame);
        socket.on(SocketEvents.LOG_UPDATED, onLogUpdated);
        socket.on(SocketEvents.GAME_CONNECTED, onGameConnected);
        socket.on(SocketEvents.AVAILABLE_GAMES, onAvailableGames);
        socket.on(SocketEvents.COMPLETED_GAMES, onCompletedGames);
        socket.on(SocketEvents.OPPONENT_DISCONNECTED, onOpponentDisconnected);
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
            socket.off(SocketEvents.RECONNECT);
            socket.off(SocketEvents.GAME_CREATED);
            socket.off(SocketEvents.ERROR);
            socket.off(SocketEvents.SUCCESS);
        };
    }, []);
    console.log('historyGameList: ', historyGameList);
    return {
        availableGames,
        connectGame,
        connectToServer,
        createGame,
        createUser,
        error,
        gameState,
        gameExit,
        onExitReplayMode,
        gameLogs,
        gameStatus,
        giveUP,
        hasHistory: historyGameList && historyGameList.length > 0,
        historyGameList,
        isConnected,
        onDirectionInput,
        onSendMessage,
        opponentDisconnected,
        onReplayMode,
        success,
    };
};

export default useSocket;
