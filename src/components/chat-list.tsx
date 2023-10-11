import { Avatar, Button, List, Space, Typography } from 'antd';
import { GameLogs, PlayerType } from '../game';
import './chat-list.css';
import { player1Image, player2Image } from '../variables';

interface ChatListProps {
    chat?: GameLogs;
}

const ChatList = (props: ChatListProps) => {
    const { chat } = props;
    return (
        <>
            <List
                className="chat-list"
                itemLayout="horizontal"
                dataSource={chat}
                renderItem={item => {
                    return (
                        <List.Item>
                            <List.Item.Meta
                                key={item.createdAt}
                                avatar={
                                    <Avatar
                                        src={item.playerType === PlayerType.PLAYER1 ? player1Image : player2Image}
                                    />
                                }
                                title={
                                    <Typography.Text code className="chat-item-title">
                                        {item.id}
                                        {item.message} {item.createdAt.toString()}
                                    </Typography.Text>
                                }
                                // description={`${item.message} ${item.createdAt}`}
                            />
                        </List.Item>
                    );
                }}
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
