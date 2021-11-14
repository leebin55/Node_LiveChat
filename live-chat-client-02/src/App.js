import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './components/Chat';

const socket = io.connect('http://localhost:5500');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username.trim !== '' && room.trim !== '') {
      socket.emit('join_room', { room, username });
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        // showChat이 false이면 joinChatContainer보이기
        <div className="joinChatContainer">
          <h1> Join A Chat</h1>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === 'Enter' && joinRoom();
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
