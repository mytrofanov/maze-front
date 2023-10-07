import './App.css';
import { Game } from './game';
import ThemeProvider from './styles/theme-provider.tsx';
import useSocket from './web-socket/useSocket.tsx';

function App() {
    const { isConnected, fooEvents } = useSocket();

    return (
        <ThemeProvider>
            <Game isConnected={isConnected} fooEvents={fooEvents} />
        </ThemeProvider>
    );
}

export default App;
