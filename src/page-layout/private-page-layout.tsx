import React from 'react';
import { Layout, Menu } from 'antd';
import './private-page-layout.styles.css';
import { AppstoreOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Players } from '../game';
import { player1Image, player2Image } from '../variables/variables.ts';

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
            <Layout.Header className="header">
                <div className="userInfo">{userInfo}</div>
                <div className="player-info-block">
                    <div
                        className="player-icon"
                        style={
                            currentPlayer === Players.PLAYER1
                                ? { backgroundImage: `url(${player1Image})` }
                                : { backgroundImage: `url(${player2Image})` }
                        }
                    />
                    {'  '}
                    Now its my turn!
                </div>
            </Layout.Header>
            <Layout hasSider>
                <Layout.Sider>
                    <Menu
                        theme="dark"
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
                <Layout.Content>{children}</Layout.Content>
            </Layout>
            <Layout.Footer className="activation-page__footer">{footerContent}</Layout.Footer>
        </Layout>
    );
};

export default PrivatePageLayout;
