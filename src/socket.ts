import { io } from 'socket.io-client';

const URL = 'http://localhost:4000';

const socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
});

socket.on('connect', () => {
    console.log('Connected to server, on URL: ', URL);
});

export { socket };
