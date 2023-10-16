import { Button, Space } from 'antd';
import './new-game-screen.css';
import { GameStatus } from '../web-socket';

interface NewGameProps {
    gameStatus: GameStatus;
    onCreateNewGame: () => void;
    onReplayMode: () => void;
    hasHistory?: boolean;
}

const NewGameScreen = (props: NewGameProps) => {
    const { gameStatus, onCreateNewGame, hasHistory, onReplayMode } = props;
    if (gameStatus === GameStatus.WELCOME_SCREEN || gameStatus === GameStatus.COMPLETED) {
        return (
            <div className="new-game-screen">
                <Space wrap>
                    <Button type="primary" onClick={onCreateNewGame}>
                        New Game
                    </Button>
                    {hasHistory ? (
                        <Button type="default" onClick={onReplayMode}>
                            Replay Mode
                        </Button>
                    ) : null}
                </Space>
            </div>
        );
    }
};

export default NewGameScreen;
