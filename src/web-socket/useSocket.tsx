import React from 'react';
import { socket } from '../socket';
import {
    ConnectToServerPayload,
    CreateGamePayload,
    CreateUserPayload,
    DirectionPayload,
    SocketError,
    SocketErrorCodes,
    SocketSuccess,
    SocketSuccessCodes,
} from './socket-types.ts';

const useSocket = () => {
    const [isConnected, setIsConnected] = React.useState<boolean>(socket.connected);
    const [error, setError] = React.useState<SocketError | undefined>(undefined);
    const [success, setSuccess] = React.useState<SocketSuccess | undefined>(undefined);
    const [game, setGame] = React.useState(undefined);

    const createGame = (payload: CreateGamePayload) => {
        socket.emit('createGame', payload);
    };

    const createUser = (payload: CreateUserPayload) => {
        socket.emit('createUser', payload);
    };

    const onDirectionInput = (payload: DirectionPayload) => {
        socket.emit('direction', payload);
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

    React.useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        socket.on('gameCreated', newGame => {
            console.log('New game created:', newGame);
            setGame(newGame);
        });

        socket.on('error', error => {
            if (!Object.values(SocketErrorCodes).includes(error.code)) {
                console.log('An unknown error occurred.');
            }
            setError(error);
        });

        socket.on('success', success => {
            if (!Object.values(SocketSuccessCodes).includes(success.code)) {
                console.log('An unknown success code.');
            }
            setSuccess(success);
        });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('gameCreated');
            socket.off('error');
            socket.off('success');
        };
    }, []);

    return { isConnected, game, createGame, connectToServer, error, success, createUser, onDirectionInput };
};

export default useSocket;
