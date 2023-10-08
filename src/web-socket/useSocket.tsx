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

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    return { isConnected, fooEvents, createGame };
};

export default useSocket;
