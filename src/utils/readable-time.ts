export const readableTime = (seconds: number, minutes: number): string => {
    let result = '';

    if (minutes > 0) {
        result += minutes === 1 ? '1 minute' : `${minutes} minutes`;
    }

    if (seconds > 0) {
        if (minutes > 0) result += ' and ';
        result += seconds === 1 ? '1 second' : `${seconds} seconds`;
    }

    return result;
};
