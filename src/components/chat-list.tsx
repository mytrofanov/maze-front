import { Avatar, List } from 'antd';
import { GameLogs } from '../game';

interface ChatListProps {
    chat: GameLogs;
}

const ChatList = (props: ChatListProps) => {
    const { chat } = props;
    return (
        <List
            itemLayout="horizontal"
            dataSource={chat}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        key={item.created}
                        avatar={<Avatar src={item.playerAvatar} />}
                        title={<a href="https://ant.design">{item.direction}</a>}
                        description={item.message}
                    />
                </List.Item>
            )}
        />
    );
};

export default ChatList;
