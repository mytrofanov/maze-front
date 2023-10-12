import React, { ChangeEvent } from 'react';
import { Layout } from 'antd';
import './page-layout.styles.css';
import { GameLogs, PlayerType } from '../game';
import { Header, Sider } from '../components';
import { AvailableGamesPayload, GameStatus } from '../web-socket';
import { CurrentUser } from '../types';

interface PageLayoutProps {
    currentPlayer?: PlayerType;
    currentUser?: CurrentUser;
    children: React.ReactNode;
    gameLogs?: GameLogs;
    currentMessage: string;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    gameStatus?: GameStatus;
    waitingList?: AvailableGamesPayload;
    onConnectGame: (gameId: string) => void;
    connected: boolean;
    player1Id?: string;
    onSendMessage: () => void;
}

const PageLayout = (props: PageLayoutProps) => {
    const {
        currentPlayer,
        children,
        currentUser,
        gameStatus,
        currentMessage,
        onKeyPress,
        onMessageChange,
        waitingList,
        onConnectGame,
        connected,
        player1Id,
        gameLogs,
        onSendMessage,
    } = props;
    return (
        <Layout className="page-layout">
            <Layout.Header>
                <Header
                    player1Id={player1Id}
                    currentPlayer={currentPlayer}
                    gameStatus={gameStatus}
                    currentUser={currentUser}
                    connected={connected}
                />
            </Layout.Header>
            <Layout hasSider>
                <Layout.Sider className="sider" width={360}>
                    <Sider
                        gameLogs={gameLogs}
                        currentMessage={currentMessage}
                        onMessageChange={onMessageChange}
                        gameStatus={gameStatus}
                        waitingList={waitingList}
                        onKeyPress={onKeyPress}
                        onConnectGame={onConnectGame}
                        onSendMessage={onSendMessage}
                    />
                </Layout.Sider>
                <Layout.Content className="content">{children}</Layout.Content>
            </Layout>
            <Layout.Footer className="page-layout__footer">MaxLab</Layout.Footer>
        </Layout>
    );
};

export default PageLayout;
