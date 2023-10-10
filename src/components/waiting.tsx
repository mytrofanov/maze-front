import { Space, Spin, Typography } from 'antd';
import './waiting.css';
import { GameStatus } from '../web-socket';

interface WaitingProps {
    gameStage: GameStatus;
}

const Waiting = (props: WaitingProps) => {
    const { gameStage } = props;
    if (gameStage !== GameStatus.WAITING_FOR_PLAYER) return;
    return (
        <div className="waiting-screen">
            <Space size="middle">
                <Typography.Title>Waiting for player ...</Typography.Title>
                <Spin size="large" />
            </Space>
        </div>
    );
};

export default Waiting;
