import { io } from 'socket.io-client';

const URL = 'http://localhost:5000';
const myNetwork = import.meta.env.VITE_MY_NETWORK || URL;

const socket = io(myNetwork, {
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
