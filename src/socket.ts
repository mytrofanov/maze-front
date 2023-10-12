import { io } from 'socket.io-client';

const URL = 'http://localhost:5000';
export const myNetwork = import.meta.env.VITE_MY_NETWORK || URL;

const socket = io(myNetwork, {
    autoConnect: false,
    withCredentials: true,
});

export { socket };
