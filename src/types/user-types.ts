import { PlayerType } from '../game';

export interface CreateUserFormValues {
    userName: string;
}

export type CurrentUser = {
    userName: string;
    userId: string;
    type: PlayerType;
};
