import { Cell, Direction, GameLogs, PlayerType } from '../game';

export enum SocketEvents {
    AVAILABLE_GAMES = 'AVAILABLE_GAMES',
    COMPLETED_GAMES = 'COMPLETED_GAMES',
    CONNECT = 'CONNECT',
    RECONNECT = 'RECONNECT',
    CONNECT_GAME = 'CONNECT_GAME',
    CREATE_GAME = 'CREATE_GAME',
    CREATE_USER = 'CREATE_USER',
    DIRECTION = 'DIRECTION',
    DISCONNECT = 'DISCONNECT',
    ERROR = 'ERROR',
    EXIT = 'EXIT',
    GAME_CONNECTED = 'GAME_CONNECTED',
    GAME_CREATED = 'GAME_CREATED',
    GAME_UPDATED = 'GAME_UPDATED',
    GIVE_UP = 'GIVE_UP',
    LOG_UPDATED = 'LOG_UPDATED',
    OPPONENT_DISCONNECTED = 'OPPONENT_DISCONNECTED',
    SEND_MESSAGE = 'SEND_MESSAGE',
    SUCCESS = 'SUCCESS',
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
    GAME_NOT_FOUND = 'GAME_NOT_FOUND',
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
    REPLAY_MODE = 'REPLAY_MODE',
    WELCOME_SCREEN = 'WELCOME_SCREEN',
}

export type Game = {
    id: string;
    player1Id: string;
    player1: SocketUser;
    player2Id?: string;
    player2: SocketUser;
    currentPlayer: PlayerType;
    winner: PlayerType;
    status: GameStatus;
    createdAt: string;
    logs: GameLogs;
    initialMaze: string;
};

// export type AvailableGame = Omit<Game, 'status'> & {
//     status: GameStatus.WAITING_FOR_PLAYER;
// };
//
// export type HistoryGame = Omit<Game, 'status'> & {
//     status: GameStatus.COMPLETED;
// };

export type AvailableGamesPayload = Game[];
// export type HistoryGamesPayload = Game[];

export type PayloadCell = {
    colX: number;
    createdAt: string;
    direction: Direction | null;
    id: number;
    player: PlayerType | null;
    revealed: boolean;
    rowId: number;
    type: Cell;
    updatedAt: string;
};

export type Row = {
    cells: PayloadCell[];
    createdAt: string;
    id: number;
    mazeId: number;
    player1onRow: boolean;
    player2onRow: boolean;
    rowY: number;
    updatedAt: string;
};

export type SocketMaze = {
    createdAt: string;
    gameId: number;
    id: number;
    rows: Row[];
};

export type GamePayload = {
    game: Game;
    maze?: SocketMaze;
};

export type GiveUpPayload = {
    gameId: string;
    playerId: string;
};

export type GameExitPayload = {
    gameId: string;
    playerId: string;
};
