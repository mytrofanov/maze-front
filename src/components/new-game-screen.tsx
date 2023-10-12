import { Button } from 'antd';
import './new-game-screen.css';
import { GameStatus } from '../web-socket';

interface NewGameProps {
    gameStatus: GameStatus;
    onCreateNewGame: () => void;
}

const NewGameScreen = (props: NewGameProps) => {
    const { gameStatus, onCreateNewGame } = props;
    if (gameStatus === GameStatus.WELCOME_SCREEN || gameStatus === GameStatus.COMPLETED) {
        return (
            <div className="new-game-screen">
                <Button type="default" onClick={onCreateNewGame}>
                    New Game
                </Button>
            </div>
        );
    }
};

export default NewGameScreen;
