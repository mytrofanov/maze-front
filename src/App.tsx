import './App.css';
import { Game } from './game';
import ThemeProvider from './styles/theme-provider.tsx';

function App() {
    return (
        <ThemeProvider>
            <Game />
        </ThemeProvider>
    );
}

export default App;
