import React, { ChangeEvent } from 'react';
import { Input, Layout } from 'antd';
import './page-layout.styles.css';
import { GameLogs, GameStage, PlayerType, WaitingListItem } from '../game';
import { ChatList } from '../components';
import WaitingList from '../components/waiting-list.tsx';
import Header from '../components/header.tsx';

interface PublicPageLayoutProps {
    currentPlayer: PlayerType;
    userName: string | null;
    children: React.ReactNode;
    gameLogs: GameLogs;
    currentMessage: string;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    gameStage: GameStage;
    waitingList: WaitingListItem[];
}

const PageLayout = (props: PublicPageLayoutProps) => {
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
    } = props;
    return (
        <Layout className="page-layout">
            <Layout.Header>
                <Header currentPlayer={currentPlayer} gameLogs={gameLogs} userName={userName} />
            </Layout.Header>
            <Layout hasSider>
                <Layout.Sider className="sider" width={360}>
                    <div className="chat-block">
                        <Input
                            autoFocus={false}
                            value={currentMessage}
                            onChange={onMessageChange}
                            onKeyDown={onKeyPress}
                            placeholder="Type action or message..."
                        />
                        {gameStage === GameStage.NEW_GAME ? <ChatList chat={gameLogs} /> : null}
                        {gameStage === GameStage.WAITING ? <WaitingList waitingList={waitingList} /> : null}
                    </div>
                </Layout.Sider>
                <Layout.Content className="content">{children}</Layout.Content>
            </Layout>
            <Layout.Footer className="page-layout__footer">MaxLab</Layout.Footer>
        </Layout>
    );
};

export default PageLayout;
