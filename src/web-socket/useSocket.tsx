import { useState, useEffect } from 'react';
import { socket } from '../socket';

export type CreateGamePayload = {
    player1Id: string;
};

export type ConnectToServerPayload = {
    userName: string;
    userId?: string;
};

export enum ErrorCodes {
    USERNAME_REQUIRED = 'USERNAME_REQUIRED',
    USERNAME_TAKEN = 'USERNAME_TAKEN',
}

export type Error = {
    code: ErrorCodes;
    message: string;
};

const useSocket = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [fooEvents, setFooEvents] = useState<unknown[]>([]);
    const [error, setError] = useState<Error | undefined>(undefined);

    const createGame = (payload: CreateGamePayload) => {
        socket.emit('createGame', payload);
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
            switch (error.code) {
                case 'USERNAME_REQUIRED':
                    console.log(error.message);
                    // Handle this error accordingly, perhaps show a modal to the user
                    break;
                case 'USERNAME_TAKEN':
                    console.log(error.message);
                    // Handle this error differently, maybe prompt for a different username
                    break;
                default:
                    console.log('An unknown error occurred.');
            }
        });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    return { isConnected, fooEvents, createGame, connectToServer };
};

export default useSocket;
