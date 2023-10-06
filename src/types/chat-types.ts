import { Direction, Players } from '../game';

export type ChatItem = {
    playerId: Players;
    direction: Direction;
    message: string;
};
