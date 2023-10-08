import { Button } from 'antd';
import { GameStage } from '../game';
import './waiting.css';

interface WaitingProps {
    gameStage: GameStage;
    onCreateNewGame: () => void;
}

const Waiting = (props: WaitingProps) => {
    const { gameStage, onCreateNewGame } = props;
    if (gameStage !== GameStage.WAITING) return;
    return (
        <div className="waiting-screen">
            <Button type="default" onClick={onCreateNewGame}>
                New Game
            </Button>
        </div>
    );
};

export default Waiting;
