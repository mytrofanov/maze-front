import { MazeType, PlayerPosition } from '../game';
import './maze.css';
import { chooseImage } from '../utils';
import { chooseClassName } from '../utils/choose-class-name.ts';

interface MazeProps {
    maze: MazeType;
    revealed: boolean[][];
    player1: PlayerPosition;
    player2: PlayerPosition;
}

const Maze = (props: MazeProps) => {
    const { maze, revealed, player1, player2 } = props;
    return (
        <div className="maze">
            {maze.map((row, rowIndex) => (
                <div key={rowIndex} className="maze-row">
                    {row.map((cell, cellIndex) => (
                        <div
                            key={cellIndex}
                            style={chooseImage(player1, cellIndex, player2, rowIndex)}
                            className={chooseClassName(cell, revealed, player1, player2, rowIndex, cellIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Maze;
