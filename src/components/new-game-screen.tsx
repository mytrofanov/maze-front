import { Button, Space } from 'antd';
import './new-game-screen.css';
import { GameStatus } from '../web-socket';

interface NewGameProps {
    gameStatus: GameStatus;
    onCreateNewGame: () => void;
    onCreateSinglePlayerGame: (singlePlayer: boolean) => void;
    onReplayMode: () => void;
    hasHistory?: boolean;
}

const NewGameScreen = (props: NewGameProps) => {
    const { gameStatus, onCreateNewGame, onCreateSinglePlayerGame, hasHistory, onReplayMode } = props;

    const handleCreateSinglePlayerGame = () => {
        onCreateSinglePlayerGame(true);
    };

    if (gameStatus === GameStatus.WELCOME_SCREEN || gameStatus === GameStatus.COMPLETED) {
        return (
            <div className="new-game-screen">
                <Space wrap>
                    <Button type="primary" onClick={onCreateNewGame}>
                        New Game
                    </Button>
                    <Button type="primary" onClick={handleCreateSinglePlayerGame}>
                        New Single Player Game
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
