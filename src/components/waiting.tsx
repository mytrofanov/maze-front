import { Button } from 'antd';
import { GameStage } from '../game';
import './waiting.css';

interface WaitingProps {
    gameStage: GameStage;
}

const Waiting = (props: WaitingProps) => {
    const { gameStage } = props;
    if (gameStage !== GameStage.WAITING) return;
    return (
        <div className="waiting-screen">
            <Button type="default">New Game</Button>
        </div>
    );
};

export default Waiting;
