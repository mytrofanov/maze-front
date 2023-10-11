import { Direction, GameLogs, MazeCell, PlayerType } from '../game';

export enum SocketEvents {
    AVAILABLE_GAMES = 'AVAILABLE_GAMES',
    CONNECT = 'CONNECT',
    CONNECT_GAME = 'CONNECT_GAME',
    CREATE_GAME = 'CREATE_GAME',
    CREATE_USER = 'CREATE_USER',
    DIRECTION = 'DIRECTION',
    DISCONNECT = 'DISCONNECT',
    ERROR = 'ERROR',
    GAME_CREATED = 'GAME_CREATED',
    GAME_UPDATED = 'GAME_UPDATED',
    LOG_UPDATED = 'LOG_UPDATED',
    GAME_CONNECTED = 'GAME_CONNECTED',
    SUCCESS = 'SUCCESS',
    SEND_MESSAGE = 'SEND_MESSAGE',
}

export type CreateGamePayload = {
    player1Id: string;
};

export type ConnectToServerPayload = {
    userName: string;
    userId?: string;
};

export type ConnectToGamePayload = {
    gameId: string;
    userId: string;
};

export type CreateUserPayload = {
    userName: string;
};

export interface DirectionPayload {
    direction: Direction;
    gameId: string;
    playerId: string;
    playerType: PlayerType;
    message?: string;
}

export interface MessagePayload {
    gameId: string;
    playerId: string;
    playerType: PlayerType;
    message: string;
}

export enum SocketSuccessCodes {
    USER_CREATED = 'USER_CREATED',
}

export type SocketUser = {
    createdAt: string;
    id: string;
    updatedAt: string;
    userName: string;
    type: PlayerType;
};

export interface SocketPayload {
    user: SocketUser;
}

export type SocketSuccess = {
    code: SocketSuccessCodes;
    message: string;
    payload: SocketPayload;
};

export enum SocketErrorCodes {
    USERNAME_REQUIRED = 'USERNAME_REQUIRED',
    USERNAME_TAKEN = 'USERNAME_TAKEN',
    PLAYER_IS_NOT_FOUND = 'PLAYER_IS_NOT_FOUND',
    GAME_NOT_CREATED = 'GAME_NOT_CREATED',
    NETWORK_ERROR = 'NETWORK_ERROR',
}

export type SocketError = {
    code: SocketErrorCodes;
    message: string;
};

export enum GameStatus {
    WAITING_FOR_PLAYER = 'WAITING_FOR_PLAYER',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CONNECTION_ERROR = 'CONNECTION_ERROR',
    CONNECTING = 'CONNECTING',
    CONNECTED = 'CONNECTED',
    WELCOME_SCREEN = 'WELCOME_SCREEN',
}

export type Game = {
    id: string;
    player1Id: string;
    player2Id?: string;
    currentPlayer: PlayerType;
    winner: PlayerType;
    status: GameStatus;
    createdAt: string;
    logs: GameLogs;
};

export type availableGame = Omit<Game, 'status'> & {
    status: GameStatus.WAITING_FOR_PLAYER;
    createdAt: string;
    player1: { userName: string };
};

export type AvailableGamesPayload = availableGame[];

export type GamePayload = {
    game: Game;
    maze: MazeCell[][];
};
