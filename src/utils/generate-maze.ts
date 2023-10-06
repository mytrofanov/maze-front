const WIDTH = 10;
const HEIGHT = 10;

enum Cell {
    WALL = 0,
    PATH = 1,
}

type Point = { x: number; y: number };

export const generateMaze = (width: number, height: number): Cell[][] => {
    const maze = Array(height)
        .fill(null)
        .map(() => Array(width).fill(Cell.WALL));

    const stack: Point[] = [];
    const start: Point = { x: 1, y: 1 }; // Стартова точка
    maze[start.y][start.x] = Cell.PATH;
    stack.push(start);

    const isMovePossible = (x: number, y: number) => {
        // перевіряємо, чи належить клітина масиву і чи є вона стіною
        return x > 0 && y > 0 && x < width - 1 && y < height - 1 && maze[y][x] === Cell.WALL;
    };

    const directions: Point[] = [
        { x: 1, y: 0 }, // RIGHT
        { x: -1, y: 0 }, // LEFT
        { x: 0, y: 1 }, // DOWN
        { x: 0, y: -1 }, // UP
    ];

    while (stack.length) {
        const current = stack[stack.length - 1];
        const possibleDirections = directions.filter(dir =>
            isMovePossible(current.x + dir.x * 2, current.y + dir.y * 2),
        );

        if (possibleDirections.length) {
            const moveDir = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
            const newX = current.x + moveDir.x;
            const newY = current.y + moveDir.y;
            const tunnelX = current.x + moveDir.x * 2;
            const tunnelY = current.y + moveDir.y * 2;

            maze[newY][newX] = Cell.PATH;
            maze[tunnelY][tunnelX] = Cell.PATH;

            stack.push({ x: tunnelX, y: tunnelY });
        } else {
            stack.pop();
        }
    }

    // Вибираємо один вихід на нижньому краю
    maze[height - 1][Math.floor(width / 2)] = Cell.PATH;

    return maze;
};

// const maze = generateMaze(WIDTH, HEIGHT);
// console.log(maze);
