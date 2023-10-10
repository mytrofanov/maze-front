import { io } from 'socket.io-client';

const URL = 'http://localhost:5000';

const socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
});

socket.on('connect', () => {
    console.log('Connected to server, on URL: ', URL);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server, on URL: ', URL);
});

export { socket };
