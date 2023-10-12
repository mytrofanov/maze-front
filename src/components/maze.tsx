import { MazeCell } from '../game';
import './maze.css';
import { chooseClassName, chooseImage } from '../utils';
import { gameBackground } from '../variables';

interface MazeProps {
    maze: MazeCell[][];
}

const Maze = (props: MazeProps) => {
    const { maze } = props;

    return (
        <div className="maze" style={{ backgroundImage: `url(${gameBackground})` }}>
            {maze.map((row, rowIndex) => (
                <div key={rowIndex + 'row'} className="maze-row">
                    {row.map((cell, cellIndex) => (
                        <div
                            key={`x:${cell.colX}, y:${cell.rowY}` + cellIndex}
                            style={chooseImage(cell)}
                            className={chooseClassName(cell)}
                        >
                            {/*x:{cell.colX} y:{cell.rowY}*/}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Maze;
