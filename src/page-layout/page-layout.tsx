import React, { ChangeEvent } from 'react';
import { Layout } from 'antd';
import './page-layout.styles.css';
import { GameLogs, PlayerType } from '../game';
import { Header, Sider } from '../components';
import { AvailableGamesPayload, GameStatus } from '../web-socket';

interface PageLayoutProps {
    currentPlayer: PlayerType;
    userName?: string;
    children: React.ReactNode;
    gameLogs?: GameLogs;
    currentMessage: string;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    gameStage: GameStatus;
    waitingList?: AvailableGamesPayload;
    onConnectGame: (gameId: string) => void;
    connected: boolean;
}

const PageLayout = (props: PageLayoutProps) => {
    const {
        currentPlayer,
        children,
        userName,
        gameLogs,
        currentMessage,
        onKeyPress,
        onMessageChange,
        gameStage,
        waitingList,
        onConnectGame,
        connected,
    } = props;
    return (
        <Layout className="page-layout">
            <Layout.Header>
                <Header currentPlayer={currentPlayer} gameLogs={gameLogs} userName={userName} connected={connected} />
            </Layout.Header>
            <Layout hasSider>
                <Layout.Sider className="sider" width={360}>
                    <Sider
                        gameLogs={gameLogs}
                        currentMessage={currentMessage}
                        onMessageChange={onMessageChange}
                        gameStage={gameStage}
                        waitingList={waitingList}
                        onKeyPress={onKeyPress}
                        onConnectGame={onConnectGame}
                    />
                </Layout.Sider>
                <Layout.Content className="content">{children}</Layout.Content>
            </Layout>
            <Layout.Footer className="page-layout__footer">MaxLab</Layout.Footer>
        </Layout>
    );
};

export default PageLayout;
