import { Avatar, List, Typography } from 'antd';
import { GameLog, GameLogs, PlayerType } from '../game';
import './chat-list.css';
import { player1Image, player2Image } from '../variables';

interface ChatListProps {
    chat?: GameLogs;
    onSelectLogItem: (log: GameLog) => void;
}

const LogAndChatList = (props: ChatListProps) => {
    const { chat, onSelectLogItem } = props;
    return (
        <List
            className="chat-list"
            itemLayout="horizontal"
            dataSource={chat}
            renderItem={item => {
                return (
                    <List.Item onClick={() => onSelectLogItem(item)}>
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
    );
};

export default LogAndChatList;
