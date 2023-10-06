import { DirectionMap, MazeType, PlayerPosition } from '../game';
import './maze.css';
import { chooseImage, chooseClassName } from '../utils';
import { gameBackground } from '../variables/variables.ts';

interface MazeProps {
    maze: MazeType;
    revealed: boolean[][];
    player1: PlayerPosition;
    player2: PlayerPosition;
    directions: DirectionMap;
}

const Maze = (props: MazeProps) => {
    const { maze, revealed, player1, player2, directions } = props;
    return (
        <div className="maze" style={{ backgroundImage: `url(${gameBackground})` }}>
            {maze.map((row, rowIndex) => (
                <div key={rowIndex} className="maze-row">
                    {row.map((cell, cellIndex) => (
                        <div
                            key={cellIndex}
                            style={chooseImage(cell, player1, cellIndex, player2, rowIndex, revealed, directions)}
                            className={chooseClassName(cell, revealed, player1, player2, rowIndex, cellIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Maze;
