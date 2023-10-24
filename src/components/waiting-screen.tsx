import React from 'react';
import { Space, Spin, Typography } from 'antd';
import './waiting-screen.css';
import { GameStatus } from '../web-socket';
import { Timer } from 'easytimer.js';
import { getHumanReadableTime } from '../utils';

interface WaitingProps {
    gameStatus: GameStatus;
}

const WaitingScreen = (props: WaitingProps) => {
    const { gameStatus } = props;
    const timer = React.useRef(new Timer()); // зміна на useRef
    const [timeInSeconds, setTimeInSeconds] = React.useState<number>(0);
    const [timeInMinutes, setTimeInMinutes] = React.useState<number>(0);

    const stopTimer = () => {
        timer.current.stop();
        timer.current.reset();
        setTimeInSeconds(0);
        setTimeInMinutes(0);
    };

    React.useEffect(() => {
        const handleSecondsUpdated = () => {
            const currentSeconds = timer.current.getTimeValues().seconds;
            const currentMinutes = timer.current.getTotalTimeValues().minutes;
            setTimeInSeconds(currentSeconds);
            setTimeInMinutes(currentMinutes);
        };

        if (gameStatus === GameStatus.WAITING_FOR_PLAYER) {
            timer.current.start();
            timer.current.addEventListener('secondsUpdated', handleSecondsUpdated);
        } else {
            stopTimer();
        }

        return () => {
            stopTimer();
            timer.current.removeEventListener('secondsUpdated', handleSecondsUpdated);
        };
    }, [gameStatus]);

    const time = getHumanReadableTime(timeInSeconds, timeInMinutes);

    if (gameStatus !== GameStatus.WAITING_FOR_PLAYER) return;
    return (
        <div className="waiting-screen">
            <Space direction="vertical" size="middle">
                <Typography.Title level={2}> You started a new game</Typography.Title>
                <Space align="center">
                    <Typography.Title level={3}> {time} ago</Typography.Title>
                    <Spin size="large" />
                </Space>
                <Typography.Title level={3}>Waiting for a second player…</Typography.Title>
            </Space>
        </div>
    );
};

export default WaitingScreen;
