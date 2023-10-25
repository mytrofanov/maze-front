import { Button, Space } from 'antd';
import './new-game-screen.css';
import { GameStatus } from '../web-socket';

interface NewGameProps {
    gameStatus: GameStatus;
    onCreateNewGame: (singlePlayer: boolean) => void;
    onReplayMode: () => void;
    hasHistory?: boolean;
}

const NewGameScreen = (props: NewGameProps) => {
    const { gameStatus, onCreateNewGame, hasHistory, onReplayMode } = props;

    const handleCreateSinglePlayerGame = () => {
        onCreateNewGame(true);
    };

    const handleCreateMultiPlayerGame = () => {
        onCreateNewGame(false);
    };

    if (gameStatus === GameStatus.WELCOME_SCREEN || gameStatus === GameStatus.COMPLETED) {
        return (
            <div className="new-game-screen">
                <Space wrap>
                    <Button type="primary" onClick={handleCreateMultiPlayerGame}>
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
