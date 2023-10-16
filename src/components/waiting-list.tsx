import { Avatar, List, Typography } from 'antd';
import './waiting-list.css';
import { player1Image } from '../variables';
import { AvailableGamesPayload, GameStatus } from '../web-socket';

interface ChatListProps {
    waitingList?: AvailableGamesPayload;
    onConnectGame: (gameId: string) => void;
    gameStatus: GameStatus;
}

const WaitingList = (props: ChatListProps) => {
    const { waitingList, onConnectGame, gameStatus } = props;
    if (!waitingList) return null;
    return (
        <>
            <Typography.Title level={5} color="undefined">
                {gameStatus === GameStatus.REPLAY_MODE ? 'GAMES TO REPLAY ' : 'AVAILABLE GAMES'}
            </Typography.Title>
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
                                    {item.player1.userName}
                                </Typography.Text>
                            }
                            description={item.createdAt}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default WaitingList;
