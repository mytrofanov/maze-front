import { MazeCell, PlayerType } from '../game';
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
                <div key={rowIndex} className="maze-row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex + cell.type} style={chooseImage(cell)} className={chooseClassName(cell)} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Maze;
