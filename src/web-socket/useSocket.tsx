import { useState, useEffect } from 'react';
import { socket } from '../socket';

export type CreateGamePayload = {
    player1Id: string;
};

export type ConnectToServerPayload = {
    userName: string;
    userId?: string;
};

export type CreateUserPayload = {
    userName: string;
};

export enum SocketSuccessCodes {
    USER_CREATED = 'USER_CREATED',
}

export type SocketSuccess = {
    code: SocketSuccessCodes;
    message: string;
    payload: never;
};

export enum SocketErrorCodes {
    USERNAME_REQUIRED = 'USERNAME_REQUIRED',
    USERNAME_TAKEN = 'USERNAME_TAKEN',
}

export type SocketError = {
    code: SocketErrorCodes;
    message: string;
};

const useSocket = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [fooEvents, setFooEvents] = useState<unknown[]>([]);
    const [error, setError] = useState<SocketError | undefined>(undefined);
    const [success, setSuccess] = useState<SocketSuccess | undefined>(undefined);

    const createGame = (payload: CreateGamePayload) => {
        socket.emit('createGame', payload);
    };

    const createUser = (payload: CreateUserPayload) => {
        socket.emit('createUser', payload);
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

    //create connect after user exist or entered his name
    //save user to localStorage if succesfully created

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value: unknown) {
            setFooEvents(previous => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        socket.on('gameCreated', newGame => {
            console.log('New game created:', newGame);
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
            socket.off('foo', onFooEvent);
        };
    }, []);

    return { isConnected, fooEvents, createGame, connectToServer, error, success, createUser };
};

export default useSocket;
