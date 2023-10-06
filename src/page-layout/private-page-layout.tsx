import React, { ChangeEvent } from 'react';
import { Col, Image, Input, Layout, Menu, Row } from 'antd';
import './private-page-layout.styles.css';
import { AppstoreOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { GameLogs, Players } from '../game';
import { backgroundColor, player1Image, player2Image } from '../variables/variables.ts';
import { ChatList } from '../components';

interface PublicPageLayoutProps {
    currentPlayer: Players;
    userInfo: string;
    children: React.ReactNode;
    gameLogs: GameLogs;
    currentMessage: string;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const PrivatePageLayout = (props: PublicPageLayoutProps) => {
    const { currentPlayer, children, userInfo, gameLogs, currentMessage, onKeyPress, onMessageChange } = props;
    return (
        <Layout className="private-layout">
            <Layout.Header style={{ backgroundColor: backgroundColor }}>
                <Row className="header">
                    <Col>{userInfo}</Col>
                    <Col className="player-info-block">
                        <Image width={64} src={currentPlayer === Players.PLAYER1 ? player1Image : player2Image} />
                        {'  '}
                        Now its my turn!
                    </Col>
                </Row>
            </Layout.Header>
            <Layout hasSider>
                <Layout.Sider style={{ backgroundColor: backgroundColor }} className="sider" width={360}>
                    <Menu
                        style={{ backgroundColor: backgroundColor }}
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        items={[
                            {
                                key: 'categories',
                                icon: <AppstoreOutlined />,
                                label: <span>Categories</span>,
                            },
                            {
                                key: 'games',
                                icon: <VideoCameraOutlined />,
                                label: <span>Games</span>,
                            },
                            {
                                key: 'users',
                                icon: <UserOutlined />,
                                label: <span>Users</span>,
                            },
                        ]}
                    />
                    <div className="chat-block">
                        <Input
                            autoFocus={false}
                            value={currentMessage}
                            onChange={onMessageChange}
                            onKeyDown={onKeyPress}
                            placeholder="Type action or message..."
                        />
                        <ChatList chat={gameLogs} />
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
