import React, { ChangeEvent } from 'react';
import { Col, Image, Input, Layout, Row } from 'antd';
import './private-page-layout.styles.css';
import { GameLogs, Players } from '../game';
import { backgroundColor, player1Image, player2Image } from '../variables/variables.ts';
import { ChatList } from '../components';

interface PublicPageLayoutProps {
    currentPlayer: Players;
    userName: string | null;
    children: React.ReactNode;
    gameLogs: GameLogs;
    currentMessage: string;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const PrivatePageLayout = (props: PublicPageLayoutProps) => {
    const { currentPlayer, children, userName, gameLogs, currentMessage, onKeyPress, onMessageChange } = props;
    return (
        <Layout className="private-layout">
            <Layout.Header style={{ backgroundColor: backgroundColor }}>
                <Row className="header">
                    <Col>
                        Hello {userName ? userName : Players.PLAYER1}! Your avatar is:
                        <Image width={64} src={player1Image} />
                    </Col>
                    {gameLogs.length > 0 ? (
                        <Col className="player-info-block">
                            <Image width={64} src={currentPlayer === Players.PLAYER1 ? player1Image : player2Image} />
                            {'  '}
                            Now its my turn!
                        </Col>
                    ) : null}
                </Row>
            </Layout.Header>
            <Layout hasSider>
                <Layout.Sider style={{ backgroundColor: backgroundColor }} className="sider" width={360}>
                    <div className="chat-block">
                        <Input
                            autoFocus={false}
                            value={currentMessage}
                            onChange={onMessageChange}
                            onKeyDown={onKeyPress}
                            placeholder="Type action or message..."
                        />
                        {gameLogs.length > 0 ? <ChatList chat={gameLogs} /> : null}
                    </div>
                </Layout.Sider>
                <Layout.Content className="content" style={{ backgroundColor: backgroundColor }}>
                    {children}
                </Layout.Content>
            </Layout>
            <Layout.Footer className="page-layout__footer" style={{ backgroundColor: backgroundColor }}>
                MaxLab
            </Layout.Footer>
        </Layout>
    );
};

export default PrivatePageLayout;
