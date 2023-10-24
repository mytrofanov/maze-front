import React, { ChangeEvent } from 'react';
import { Layout } from 'antd';
import './page-layout.styles.css';
import { GameLog, GameLogs, PlayerType } from '../game';
import { Header, Sider } from '../components';
import { AvailableGamesPayload, GameStatus, SocketUser } from '../web-socket';

interface PageLayoutProps {
    children: React.ReactNode;
    connected: boolean;
    currentMessage: string;
    currentUser?: SocketUser;
    currentPlayer?: PlayerType;
    exitDisabled: boolean;
    gameLogs?: GameLogs;
    gameStatus?: GameStatus;
    hasWinner: boolean;
    onConnectGame: (gameId: string) => void;
    onGiveUP: () => void;
    onExit: () => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
    onSelectLogItem: (log: GameLog) => void;
    waitingList?: AvailableGamesPayload;
    historyList?: AvailableGamesPayload;
    singlePlayerGame: boolean;
}

const PageLayout = (props: PageLayoutProps) => {
    const {
        children,
        connected,
        currentMessage,
        currentUser,
        currentPlayer,
        exitDisabled,
        gameLogs,
        gameStatus,
        hasWinner,
        onConnectGame,
        onGiveUP,
        onExit,
        onKeyPress,
        onMessageChange,
        onSendMessage,
        onSelectLogItem,
        historyList,
        waitingList,
        singlePlayerGame,
    } = props;
    return (
        <Layout className="page-layout">
            <Layout.Header>
                <Header
                    gameStatus={gameStatus}
                    currentUser={currentUser}
                    connected={connected}
                    currentPlayer={currentPlayer}
                    singlePlayerGame={singlePlayerGame}
                />
            </Layout.Header>
            <Layout hasSider>
                <Layout.Sider className="sider" width={360}>
                    <Sider
                        gameLogs={gameLogs}
                        currentMessage={currentMessage}
                        onMessageChange={onMessageChange}
                        gameStatus={gameStatus}
                        historyList={historyList}
                        waitingList={waitingList}
                        onKeyPress={onKeyPress}
                        onConnectGame={onConnectGame}
                        onSelectLogItem={onSelectLogItem}
                        onSendMessage={onSendMessage}
                        onGiveUP={onGiveUP}
                        onExit={onExit}
                        hasWinner={hasWinner}
                        exitDisabled={exitDisabled}
                    />
                </Layout.Sider>
                <Layout.Content className="content">{children}</Layout.Content>
            </Layout>
            <Layout.Footer className="page-layout__footer">MaxLab</Layout.Footer>
        </Layout>
    );
};

export default PageLayout;
