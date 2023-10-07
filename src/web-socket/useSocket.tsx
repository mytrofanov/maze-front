import { useState, useEffect } from 'react';
import { socket } from '../socket';

const useSocket = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [fooEvents, setFooEvents] = useState<unknown[]>([]);

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

    return { isConnected, fooEvents };
};

export default useSocket;
