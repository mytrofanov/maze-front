import React, { ChangeEvent } from 'react';
import { Button, Col, Image, Input, Layout, Row, Space } from 'antd';
import './private-page-layout.styles.css';
import { GameLogs, Players } from '../game';
import { player1Image, player2Image } from '../variables/variables.ts';
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
            <Layout.Header>
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
                <Layout.Sider className="sider" width={360}>
                    <div className="chat-block">
                        <Input
                            autoFocus={false}
                            value={currentMessage}
                            onChange={onMessageChange}
                            onKeyDown={onKeyPress}
                            placeholder="Type action or message..."
                        />
                        {gameLogs.length > 0 ? <ChatList chat={gameLogs} /> : null}
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
