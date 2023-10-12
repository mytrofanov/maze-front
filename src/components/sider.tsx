import React, { ChangeEvent } from 'react';
import { Button, Input } from 'antd';
import { GameLogs } from '../game';
import { ChatList } from './index.ts';
import WaitingList from './waiting-list.tsx';
import './sider.css';
import { AvailableGamesPayload, GameStatus } from '../web-socket';

interface SiderProps {
    currentMessage: string;
    exitDisabled: boolean;
    gameLogs?: GameLogs;
    gameStatus?: GameStatus;
    onConnectGame: (gameId: string) => void;
    onGiveUP: () => void;
    onExit: () => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
    waitingList?: AvailableGamesPayload;
}

const Sider = (props: SiderProps) => {
    const {
        currentMessage,
        exitDisabled,
        gameLogs,
        gameStatus,
        onConnectGame,
        onExit,
        onGiveUP,
        onKeyPress,
        onMessageChange,
        onSendMessage,
        waitingList,
    } = props;

    return (
        <div className="chat-block">
            <div className="chat-block__input-block">
                <Input
                    autoFocus={false}
                    value={currentMessage}
                    onChange={onMessageChange}
                    onKeyDown={onKeyPress}
                    placeholder="Type action or message..."
                    className="chat-block__input"
                />
                <Button onClick={onSendMessage}>Send</Button>
            </div>
            {gameStatus === GameStatus.IN_PROGRESS || gameStatus === GameStatus.WAITING_FOR_PLAYER ? (
                <ChatList chat={gameLogs} exitDisabled={exitDisabled} onGiveUP={onGiveUP} onExit={onExit} />
            ) : null}
            {gameStatus === GameStatus.WELCOME_SCREEN || gameStatus === GameStatus.COMPLETED ? (
                <WaitingList waitingList={waitingList} onConnectGame={onConnectGame} />
            ) : null}
        </div>
    );
};

export default Sider;
