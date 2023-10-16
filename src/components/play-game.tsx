import { PlayerType } from '../game';
import Maze from './maze.tsx';
import CustomModal from './modal.tsx';
import { player1Image, player2Image } from '../variables';
import { GameStatus, Row, SocketUser } from '../web-socket';

interface PlayGameProps {
    gameStatus: GameStatus;
    maze?: Row[];
    openWinnerModal: boolean;
    handleWinnerModalOk: () => void;
    handleWinnerModalCancel: () => void;
    winner?: PlayerType | null;
    currentUser?: SocketUser;
    currentPlayer?: PlayerType;
}

const PlayGame = (props: PlayGameProps) => {
    const {
        gameStatus,
        maze,
        handleWinnerModalCancel,
        openWinnerModal,
        handleWinnerModalOk,
        winner,
        currentUser,
        currentPlayer,
    } = props;
    if (!maze) return null;
    if (gameStatus === GameStatus.IN_PROGRESS || gameStatus === GameStatus.REPLAY_MODE) {
        return (
            <>
                <Maze maze={maze} currentPlayer={currentPlayer} currentUser={currentUser} />
                <CustomModal
                    modalOpen={openWinnerModal}
                    onOk={handleWinnerModalOk}
                    title={currentUser?.type === winner ? 'You win!' : 'You lose!'}
                    content={currentUser?.type === winner ? 'Congratulations!' : 'See you next game!'}
                    onCancel={handleWinnerModalCancel}
                    image={currentUser?.type === PlayerType.PLAYER1 ? player1Image : player2Image}
                    width={180}
                />
            </>
        );
    }

    return null;
};

export default PlayGame;
