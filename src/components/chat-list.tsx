import { Avatar, Button, List, Space, Typography } from 'antd';
import { GameLogs, PlayerType } from '../game';
import './chat-list.css';
import { player1Image, player2Image } from '../variables';

interface ChatListProps {
    chat?: GameLogs;
    onGiveUP: () => void;
    onExit: () => void;
    exitDisabled: boolean;
}

const ChatList = (props: ChatListProps) => {
    const { chat, onGiveUP, exitDisabled, onExit } = props;
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
                                    <Avatar src={item.playerType == PlayerType.PLAYER1 ? player1Image : player2Image} />
                                }
                                title={
                                    <Typography.Text code className="chat-item-title">
                                        {item.message} {item.createdAt.toString()}
                                    </Typography.Text>
                                }
                            />
                        </List.Item>
                    );
                }}
            />
            <Space wrap>
                <Button type="primary" onClick={onGiveUP}>
                    Give UP
                </Button>
                <Button type="primary" onClick={onExit} disabled={exitDisabled}>
                    Exit
                </Button>
            </Space>
        </>
    );
};

export default ChatList;
