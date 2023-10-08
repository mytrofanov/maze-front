import './App.css';
import { Game } from './game';
import ThemeProvider from './styles/theme-provider.tsx';
import useSocket from './web-socket/useSocket.tsx';

function App() {
    const socket = useSocket();

    return (
        <ThemeProvider>
            <Game socket={socket} />
        </ThemeProvider>
    );
}

export default App;
