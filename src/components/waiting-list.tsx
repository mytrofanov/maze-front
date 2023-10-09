import { Avatar, List, Typography } from 'antd';
import './waiting-list.css';
import { player1Image } from '../variables';
import { AvailableGamesPayload } from '../web-socket';

interface ChatListProps {
    waitingList?: AvailableGamesPayload;
    onConnectGame: (gameId: string) => void;
}

const WaitingList = (props: ChatListProps) => {
    const { waitingList, onConnectGame } = props;
    if (!waitingList) return null;
    return (
        <List
            className="waiting-list"
            itemLayout="horizontal"
            dataSource={waitingList}
            renderItem={item => (
                <List.Item onClick={() => onConnectGame(item.id)}>
                    <List.Item.Meta
                        key={item.createdAt}
                        avatar={<Avatar src={player1Image} />}
                        title={
                            <Typography.Text code className="waiting-item-title">
                                {item.player1Id}
                            </Typography.Text>
                        }
                        description={item.createdAt}
                    />
                </List.Item>
            )}
        />
    );
};

export default WaitingList;
