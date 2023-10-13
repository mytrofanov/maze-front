import { PlayerType } from '../game';
import Maze from './maze.tsx';
import CustomModal from './modal.tsx';
import { player1Image, player2Image } from '../variables';
import { GameStatus, Row } from '../web-socket';
import { CurrentUser } from '../types';

interface PlayGameProps {
    gameStatus: GameStatus;
    maze?: Row[];
    openWinnerModal: boolean;
    handleWinnerModalOk: () => void;
    handleWinnerModalCancel: () => void;
    winner?: PlayerType | null;
    currentUser?: CurrentUser;
}

const PlayGame = (props: PlayGameProps) => {
    const { gameStatus, maze, handleWinnerModalCancel, openWinnerModal, handleWinnerModalOk, winner, currentUser } =
        props;
    if (!maze) return null;
    if (gameStatus === GameStatus.IN_PROGRESS && maze) {
        return (
            <>
                <Maze maze={maze} />
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