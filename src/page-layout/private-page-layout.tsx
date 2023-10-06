import React from 'react';
import { Col, Image, Layout, Menu, Row } from 'antd';
import './private-page-layout.styles.css';
import { AppstoreOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Players } from '../game';
import { backgroundColor, player1Image, player2Image } from '../variables/variables.ts';

interface PublicPageLayoutProps {
    currentPlayer: Players;
    userInfo: string;
    children: React.ReactNode;
    footerContent: React.ReactNode;
}

const PrivatePageLayout = (props: PublicPageLayoutProps) => {
    const { currentPlayer, children, footerContent, userInfo } = props;
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
                <Layout.Sider style={{ backgroundColor: backgroundColor }}>
                    <Menu
                        style={{ backgroundColor: backgroundColor }}
                        className="sider-block"
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
                </Layout.Sider>
                <Layout.Content className="content" style={{ backgroundColor: backgroundColor }}>
                    {children}
                </Layout.Content>
            </Layout>
            <Layout.Footer className="page-layout__footer" style={{ backgroundColor: backgroundColor }}>
                {footerContent}
            </Layout.Footer>
        </Layout>
    );
};

export default PrivatePageLayout;
