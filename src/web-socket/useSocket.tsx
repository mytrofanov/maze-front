import { useState, useEffect } from 'react';
import { socket } from '../socket';

export type CreateGamePayload = {
    player1Id: string;
};

const useSocket = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [fooEvents, setFooEvents] = useState<unknown[]>([]);

    const createGame = (payload: CreateGamePayload) => {
        socket.emit('createGame', payload);
    };

    //create connect after user exist or entered his name

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

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    return { isConnected, fooEvents, createGame };
};

export default useSocket;
