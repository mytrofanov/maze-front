import React, { ChangeEvent } from 'react';
import { Layout } from 'antd';
import './page-layout.styles.css';
import { GameLogs, PlayerType } from '../game';
import { Header, Sider } from '../components';
import { AvailableGamesPayload, GameStatus } from '../web-socket';
import { CurrentUser } from '../types';

interface PageLayoutProps {
    children: React.ReactNode;
    connected: boolean;
    currentMessage: string;
    currentPlayer?: PlayerType;
    currentUser?: CurrentUser;
    exitDisabled: boolean;
    gameLogs?: GameLogs;
    gameStatus?: GameStatus;
    onConnectGame: (gameId: string) => void;
    onGiveUP: () => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
    player1Id?: string;
    waitingList?: AvailableGamesPayload;
}

const PageLayout = (props: PageLayoutProps) => {
    const {
        children,
        connected,
        currentMessage,
        currentPlayer,
        currentUser,
        exitDisabled,
        gameLogs,
        gameStatus,
        onConnectGame,
        onGiveUP,
        onKeyPress,
        onMessageChange,
        onSendMessage,
        player1Id,
        waitingList,
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
                        onGiveUP={onGiveUP}
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
