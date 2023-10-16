import React, { ChangeEvent } from 'react';
import { Button, Input, Space } from 'antd';
import { GameLog, GameLogs } from '../game';
import { LogAndChatList } from './index.ts';
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
    onSelectLogItem: (log: GameLog) => void;
    hasWinner: boolean;
    waitingList?: AvailableGamesPayload;
    historyList?: AvailableGamesPayload;
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
        onSelectLogItem,
        onSendMessage,
        hasWinner,
        historyList,
        waitingList,
    } = props;

    return (
        <div className="chat-block">
            <div className="chat-block__input-block">
                {gameStatus === GameStatus.IN_PROGRESS ? (
                    <>
                        <Input
                            autoFocus={false}
                            value={currentMessage}
                            onChange={onMessageChange}
                            onKeyDown={onKeyPress}
                            placeholder="Type action or message..."
                            className="chat-block__input"
                        />
                        <Button onClick={onSendMessage}>Send</Button>
                    </>
                ) : null}
            </div>
            {gameStatus === GameStatus.IN_PROGRESS || (gameStatus === GameStatus.REPLAY_MODE && !historyList) ? (
                <LogAndChatList chat={gameLogs} onSelectLogItem={onSelectLogItem} />
            ) : null}
            {
                <Space wrap>
                    {gameStatus === GameStatus.IN_PROGRESS ? (
                        <Button type="primary" onClick={onGiveUP} disabled={hasWinner}>
                            Give UP
                        </Button>
                    ) : null}
                    {gameStatus === GameStatus.IN_PROGRESS || gameStatus === GameStatus.WAITING_FOR_PLAYER ? (
                        <Button type="primary" onClick={onExit} disabled={exitDisabled}>
                            Exit
                        </Button>
                    ) : null}
                </Space>
            }
            {gameStatus === GameStatus.WELCOME_SCREEN || gameStatus === GameStatus.COMPLETED ? (
                <WaitingList waitingList={waitingList} onConnectGame={onConnectGame} gameStatus={gameStatus} />
            ) : null}
            {gameStatus === GameStatus.REPLAY_MODE ? (
                <WaitingList onConnectGame={onConnectGame} waitingList={historyList} gameStatus={gameStatus} />
            ) : null}
        </div>
    );
};

export default Sider;
