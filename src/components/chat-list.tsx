import { Avatar, Button, List, Space, Typography } from 'antd';
import { GameLogs } from '../game';
import './chat-list.css';
import React from 'react';

interface ChatListProps {
    chat: GameLogs;
}

const ChatList = (props: ChatListProps) => {
    const { chat } = props;
    return (
        <>
            <List
                className="chat-list"
                itemLayout="horizontal"
                dataSource={chat}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            key={item.created}
                            avatar={<Avatar src={item.playerAvatar} />}
                            title={
                                <Typography.Text code className="chat-item-title">
                                    {item.direction}
                                </Typography.Text>
                            }
                            description={item.message}
                        />
                    </List.Item>
                )}
            />
            <Space wrap>
                <Button type="primary">Give UP</Button>
                <Button type="primary" disabled>
                    Exit
                </Button>
            </Space>
        </>
    );
};

export default ChatList;
