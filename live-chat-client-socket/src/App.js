import './App.css';
import React, { useState } from 'react';
import { io } from 'socket.io-client';
import Join from './comps/Join';
import Chat from './comps/Chat';

// function App() 안에서 선언하면 socket이 렌더링 할때마다
// 새롭게 연결 > socketID 계속 변경
const socket = io.connect('http://localhost:5500');

function App() {
  const [nickname, setNickname] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const propsData = {
    nickname,
    room,
    socket,
    setShowChat,
    setRoom,
    setNickname,
  };

  return (
    <div className="App">
      {!showChat ? (
        <Join
          //   room={room}
          //   setRoom={setRoom}
          //   nickname={nickname}
          //   setNickname={setNickname}
          //   socket={socket}
          //   setShowChat={setShowChat}
          propsData={propsData}
        />
      ) : (
        <Chat
          socket={socket}
          nickname={nickname}
          room={room}
          setShowChat={setShowChat}
        />
      )}
    </div>
  );
}

export default App;
