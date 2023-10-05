export const updateRevealed = (revealed: boolean[][], newX: number, newY: number) => {
    const newRevealed = revealed.map(row => [...row]);
    newRevealed[newY][newX] = true;
    return newRevealed;
};
