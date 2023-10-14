import './maze.css';
import { chooseClassName, chooseImage } from '../utils';
import { gameBackground } from '../variables';
import { Row } from '../web-socket';
import { PlayerType } from '../game';

interface MazeProps {
    maze: Row[];
    currentPlayer: PlayerType;
}

const Maze = (props: MazeProps) => {
    const { maze, currentPlayer } = props;
    console.log('maze in Maze: ', maze);
    return (
        <div className="maze" style={{ backgroundImage: `url(${gameBackground})` }}>
            {maze.map(row => (
                <div key={row.id + row.createdAt} className="maze-row">
                    {row.cells.map(cell => (
                        <div
                            key={cell.id + cell.createdAt}
                            style={chooseImage(cell, currentPlayer)}
                            className={chooseClassName(cell, currentPlayer)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Maze;
