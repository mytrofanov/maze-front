import { Col, Image, Row, Tooltip } from 'antd';
import { PlayerType } from '../game';
import { player1Image, player2Image } from '../variables';
import './header.css';
import { BulbFilled } from '@ant-design/icons';
import { CurrentUser } from '../types';
import { GameStatus } from '../web-socket';

interface HeaderProps {
    player1Id?: string;
    currentUser?: CurrentUser;
    gameStatus?: GameStatus;
    currentPlayer?: PlayerType;
    connected: boolean;
}

const Header = (props: HeaderProps) => {
    const { currentUser, gameStatus, currentPlayer, connected, player1Id } = props;
    return (
        <Row className="header">
            <Col>
                Hello {currentUser && currentUser.userName ? currentUser.userName : 'handsome!'}! Your avatar is:
                <Image width={64} src={currentUser?.userId === player1Id ? player1Image : player2Image} />
            </Col>
            <Col>
                <Tooltip title={connected ? 'connected' : 'disconnected'}>
                    <BulbFilled style={connected ? undefined : { color: 'red' }} />
                </Tooltip>
            </Col>
            {gameStatus === GameStatus.IN_PROGRESS ? (
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
