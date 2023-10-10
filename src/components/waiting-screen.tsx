import React from 'react';
import { Space, Spin, Typography } from 'antd';
import './waiting-screen.css';
import { GameStatus } from '../web-socket';
import { Timer } from 'easytimer.js';
import { readableTime } from '../utils';

interface WaitingProps {
    gameStatus: GameStatus;
}

const WaitingScreen = (props: WaitingProps) => {
    const { gameStatus } = props;
    const timer = new Timer();
    const [timeInSeconds, setTimeInSeconds] = React.useState<number>(0);
    const [timeInMinutes, setTimeInMinutes] = React.useState<number>(0);

    React.useEffect(() => {
        if (gameStatus === GameStatus.WAITING_FOR_PLAYER) {
            timer.start();
        }

        timer.addEventListener('secondsUpdated', () => {
            const currentSeconds = timer.getTimeValues().seconds;
            const currentMinutes = timer.getTotalTimeValues().minutes;
            setTimeInSeconds(currentSeconds);
            setTimeInMinutes(currentMinutes);
        });

        return () => {
            timer.stop();
            timer.reset();
            setTimeInSeconds(0);
        };
    }, [gameStatus]);

    const time = readableTime(timeInSeconds, timeInMinutes);

    if (gameStatus !== GameStatus.WAITING_FOR_PLAYER) return;
    return (
        <div className="waiting-screen">
            <Space direction="vertical" size="middle">
                <Typography.Title level={2}> You started a new game {time} ago</Typography.Title>
                <Typography.Title level={3}>Waiting for a second player…</Typography.Title>
                <Spin size="large" />
            </Space>
        </div>
    );
};

export default WaitingScreen;
