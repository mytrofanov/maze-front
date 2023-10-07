import { Avatar, List, Typography } from 'antd';
import { WaitingListItem } from '../game';
import './waiting-list.css';
import { player1Image } from '../variables';

interface ChatListProps {
    waitingList: WaitingListItem[];
}

const WaitingList = (props: ChatListProps) => {
    const { waitingList } = props;
    return (
        <List
            className="waiting-list"
            itemLayout="horizontal"
            dataSource={waitingList}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        key={item.gameTimeInitiation}
                        avatar={<Avatar src={player1Image} />}
                        title={
                            <Typography.Text code className="waiting-item-title">
                                {item.initiatorUserName}
                            </Typography.Text>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default WaitingList;
