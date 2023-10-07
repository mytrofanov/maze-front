import React, { ChangeEvent } from 'react';
import { Button, Col, Image, Input, Layout, Row, Space } from 'antd';
import './private-page-layout.styles.css';
import { GameLogs, GameStage, PlayerType, WaitingListItem } from '../game';
import { player1Image, player2Image } from '../variables';
import { ChatList } from '../components';
import WaitingList from '../components/waiting-list.tsx';

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

const PrivatePageLayout = (props: PublicPageLayoutProps) => {
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
        <Layout className="private-layout">
            <Layout.Header>
                <Row className="header">
                    <Col>
                        Hello {userName ? userName : PlayerType.PLAYER1}! Your avatar is:
                        <Image width={64} src={player1Image} />
                    </Col>
                    {gameLogs.length > 0 ? (
                        <Col className="player-info-block">
                            <Image
                                width={64}
                                src={currentPlayer === PlayerType.PLAYER1 ? player1Image : player2Image}
                            />
                            {'  '}
                            Now its my turn!
                        </Col>
                    ) : null}
                </Row>
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

                        <Space wrap>
                            <Button type="primary">Give UP</Button>
                            <Button type="primary" disabled>
                                Exit
                            </Button>
                        </Space>
                    </div>
                </Layout.Sider>
                <Layout.Content className="content">{children}</Layout.Content>
            </Layout>
            <Layout.Footer className="page-layout__footer">MaxLab</Layout.Footer>
        </Layout>
    );
};

export default PrivatePageLayout;
