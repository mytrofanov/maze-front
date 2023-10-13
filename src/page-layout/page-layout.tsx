import React, { ChangeEvent } from 'react';
import { Layout } from 'antd';
import './page-layout.styles.css';
import { GameLogs } from '../game';
import { Header, Sider } from '../components';
import { AvailableGamesPayload, GameStatus } from '../web-socket';
import { CurrentUser } from '../types';

interface PageLayoutProps {
    children: React.ReactNode;
    connected: boolean;
    currentMessage: string;
    // currentPlayer?: PlayerType;
    currentUser?: CurrentUser;
    exitDisabled: boolean;
    gameLogs?: GameLogs;
    gameStatus?: GameStatus;
    onConnectGame: (gameId: string) => void;
    onGiveUP: () => void;
    onExit: () => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
    // player1Id?: string;
    waitingList?: AvailableGamesPayload;
}

const PageLayout = (props: PageLayoutProps) => {
    const {
        children,
        connected,
        currentMessage,
        currentUser,
        exitDisabled,
        gameLogs,
        gameStatus,
        onConnectGame,
        onGiveUP,
        onExit,
        onKeyPress,
        onMessageChange,
        onSendMessage,
        waitingList,
    } = props;
    return (
        <Layout className="page-layout">
            <Layout.Header>
                <Header gameStatus={gameStatus} currentUser={currentUser} connected={connected} />
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
                        onExit={onExit}
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
