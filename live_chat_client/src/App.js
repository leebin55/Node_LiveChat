import './App.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080'); // connect server
socket.on('connect', () => {
  displayMessage('');
});
function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
