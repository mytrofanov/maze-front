import { Col, Image, Row } from 'antd';
import { GameLogs, PlayerType } from '../game';
import { player1Image, player2Image } from '../variables';
import './header.css';

interface HeaderProps {
    userName: string | null;
    gameLogs: GameLogs;
    currentPlayer: PlayerType;
}

const Header = (props: HeaderProps) => {
    const { userName, gameLogs, currentPlayer } = props;
    return (
        <Row className="header">
            <Col>
                Hello {userName ? userName : PlayerType.PLAYER1}! Your avatar is:
                <Image width={64} src={player1Image} />
            </Col>
            {gameLogs.length > 0 ? (
                <Col className="player-info-block">
                    <Image width={64} src={currentPlayer === PlayerType.PLAYER1 ? player1Image : player2Image} />
                    {'  '}
                    Now its my turn!
                </Col>
            ) : null}
        </Row>
    );
};

export default Header;
