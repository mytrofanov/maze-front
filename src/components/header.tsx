import { Col, Image, Row, Tooltip } from 'antd';
import { PlayerType } from '../game';
import { player1Image, player2Image } from '../variables';
import './header.css';
import { BulbFilled } from '@ant-design/icons';
import { GameStatus, SocketUser } from '../web-socket';

interface HeaderProps {
    currentUser?: SocketUser;
    currentPlayer?: PlayerType;
    gameStatus?: GameStatus;
    connected: boolean;
}

const Header = (props: HeaderProps) => {
    const { currentUser, gameStatus, connected, currentPlayer } = props;
    const userAvatar = currentUser?.type === PlayerType.PLAYER1 ? player1Image : player2Image;

    const PlayerIndication = () => {
        if (gameStatus !== GameStatus.IN_PROGRESS) return null;
        return (
            <>
                {currentUser && currentUser.type == currentPlayer ? (
                    <div>Now it's your turn</div>
                ) : (
                    <div>It's opponent turn</div>
                )}
            </>
        );
    };

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
                <PlayerIndication />
            </Col>
            <Col>
                <Tooltip title={connected ? 'connected' : 'disconnected'}>
                    <BulbFilled style={connected ? undefined : { color: 'red' }} />
                </Tooltip>
            </Col>
        </Row>
    );
};

export default Header;
