import './maze.css';
import { chooseClassName, chooseImage } from '../utils';
import { gameBackground } from '../variables';
import { Row, SocketUser } from '../web-socket';
import { PlayerType } from '../game';

interface MazeProps {
    maze: Row[];
    currentPlayer?: PlayerType;
    currentUser?: SocketUser;
}

const Maze = (props: MazeProps) => {
    const { maze, currentPlayer, currentUser } = props;
    return (
        <div className="maze" style={{ backgroundImage: `url(${gameBackground})` }}>
            {maze.map(row => (
                <div key={row.id + row.createdAt} className="maze-row">
                    {row.cells.map(cell => (
                        <div
                            key={cell.id + cell.createdAt}
                            style={chooseImage(cell)}
                            className={chooseClassName(cell, currentPlayer, currentUser)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Maze;
