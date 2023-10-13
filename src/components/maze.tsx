import './maze.css';
import { chooseClassName, chooseImage } from '../utils';
import { gameBackground } from '../variables';
import { Row } from '../web-socket';

interface MazeProps {
    maze: Row[];
}

const Maze = (props: MazeProps) => {
    const { maze } = props;

    return (
        <div className="maze" style={{ backgroundImage: `url(${gameBackground})` }}>
            {maze.map(row => (
                <div key={row.id + row.createdAt} className="maze-row">
                    {row.cells.map(cell => (
                        <div
                            key={cell.id + cell.createdAt}
                            style={chooseImage(cell)}
                            className={chooseClassName(cell)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Maze;
