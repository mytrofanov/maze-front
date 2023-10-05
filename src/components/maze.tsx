import { Cell, Maze, PlayerPosition } from '../game';
import './maze.css';

interface MazeProps {
    maze: Maze;
    revealed: Maze;
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
                            className={`maze-cell ${
                                cell === Cell.WALL
                                    ? revealed[rowIndex][cellIndex]
                                        ? 'wall'
                                        : 'hidden'
                                    : cell === Cell.PATH
                                    ? 'path'
                                    : 'exit'
                            } ${player1.x === cellIndex && player1.y === rowIndex ? 'player1' : ''} ${
                                player2.x === cellIndex && player2.y === rowIndex ? 'player2' : ''
                            }`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Maze;
