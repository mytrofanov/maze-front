import React, { ChangeEvent } from 'react';
import { Input } from 'antd';
import { GameLogs, GameStage } from '../game';
import { ChatList } from './index.ts';
import WaitingList from './waiting-list.tsx';
import './sider.css';
import { AvailableGamesPayload } from '../web-socket';

interface SiderProps {
    gameLogs?: GameLogs;
    currentMessage: string;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    gameStage: GameStage;
    waitingList?: AvailableGamesPayload;
    onConnectGame: (gameId: string) => void;
}

const Sider = (props: SiderProps) => {
    const { currentMessage, onMessageChange, onKeyPress, gameStage, gameLogs, waitingList, onConnectGame } = props;
    return (
        <div className="chat-block">
            <Input
                autoFocus={false}
                value={currentMessage}
                onChange={onMessageChange}
                onKeyDown={onKeyPress}
                placeholder="Type action or message..."
            />
            {gameStage === GameStage.NEW_GAME ? <ChatList chat={gameLogs} /> : null}
            {gameStage === GameStage.WAITING ? (
                <WaitingList waitingList={waitingList} onConnectGame={onConnectGame} />
            ) : null}
        </div>
    );
};

export default Sider;
