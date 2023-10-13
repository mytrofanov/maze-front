import { Col, Image, Row, Tooltip } from 'antd';
import { PlayerType } from '../game';
import { player1Image, player2Image } from '../variables';
import './header.css';
import { BulbFilled } from '@ant-design/icons';
import { CurrentUser } from '../types';
import { GameStatus } from '../web-socket';

interface HeaderProps {
    currentUser?: CurrentUser;
    gameStatus?: GameStatus;
    connected: boolean;
}

const Header = (props: HeaderProps) => {
    const { currentUser, gameStatus, connected } = props;
    const userAvatar = currentUser?.type === PlayerType.PLAYER1 ? player1Image : player2Image;
    return (
        <Row className="header">
            <Col>
                Hello {currentUser && currentUser.userName ? currentUser.userName : 'handsome!'}!
                {gameStatus === GameStatus.IN_PROGRESS ? (
                    <>
                        Your avatar is:
                        <Image width={64} src={userAvatar} />
                    </>
                ) : null}
            </Col>
            <Col>
                <Tooltip title={connected ? 'connected' : 'disconnected'}>
                    <BulbFilled style={connected ? undefined : { color: 'red' }} />
                </Tooltip>
            </Col>
            {gameStatus === GameStatus.IN_PROGRESS ? (
                <Col className="player-info-block">
                    <Image width={64} src={userAvatar} />
                    {'  '}
                    Now its my turn!
                </Col>
            ) : null}
        </Row>
    );
};

export default Header;
