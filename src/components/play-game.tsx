import { GameStage, MazeCell, PlayerType } from '../game';
import Maze from './maze.tsx';
import CustomModal from './modal.tsx';
import { player1Image, player2Image } from '../variables';

interface PlayGameProps {
    gameStage: GameStage;
    maze?: MazeCell[][];
    openWinnerModal: boolean;
    handleWinnerModalOk: () => void;
    handleWinnerModalCancel: () => void;
    winner?: PlayerType | null;
}

const PlayGame = (props: PlayGameProps) => {
    const { gameStage, maze, handleWinnerModalCancel, openWinnerModal, handleWinnerModalOk, winner } = props;
    if (!maze) return null;
    if (gameStage === GameStage.NEW_GAME || gameStage === GameStage.CONNECTED) {
        return (
            <>
                <Maze maze={maze} />
                <CustomModal
                    modalOpen={openWinnerModal}
                    onOk={handleWinnerModalOk}
                    title="Vinner"
                    content={`Player ${winner} vins!`}
                    onCancel={handleWinnerModalCancel}
                    image={winner === PlayerType.PLAYER1 ? player1Image : player2Image}
                    width={180}
                />
            </>
        );
    }

    return null;
};

export default PlayGame;
