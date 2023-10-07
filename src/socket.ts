import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
    autoConnect: false,
    withCredentials: true,
});

socket.on('connect', () => {
    console.log('Connected to server');

    //socket.emit('createGame');

    socket.on('gameCreated', newGame => {
        console.log('New game created:', newGame);
    });
});

export { socket };
