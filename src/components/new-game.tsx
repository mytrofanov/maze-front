import { Button } from 'antd';
import './new-game.css';
import { GameStatus } from '../web-socket';

interface NewGameProps {
    gameStage: GameStatus;
    onCreateNewGame: () => void;
}

const NewGame = (props: NewGameProps) => {
    const { gameStage, onCreateNewGame } = props;
    if (gameStage !== GameStatus.WELCOME_SCREEN) return;
    return (
        <div className="new-game-screen">
            <Button type="default" onClick={onCreateNewGame}>
                New Game
            </Button>
        </div>
    );
};

export default NewGame;
