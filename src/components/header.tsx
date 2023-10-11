import { Col, Image, Row, Tooltip } from 'antd';
import { GameLogs, PlayerType } from '../game';
import { player1Image, player2Image } from '../variables';
import './header.css';
import { BulbFilled } from '@ant-design/icons';

interface HeaderProps {
    userName?: string;
    gameLogs?: GameLogs;
    currentPlayer: PlayerType;
    connected: boolean;
}

const Header = (props: HeaderProps) => {
    const { userName, gameLogs, currentPlayer, connected } = props;
    return (
        <Row className="header">
            <Col>
                Hello {userName ? userName : 'handsome!'}! Your avatar is:
                <Image width={64} src={player1Image} />
            </Col>
            <Col>
                <Tooltip title={connected ? 'connected' : 'disconnected'}>
                    <BulbFilled style={connected ? undefined : { color: 'red' }} />
                </Tooltip>
            </Col>
            {gameLogs && gameLogs.length > 0 ? (
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
