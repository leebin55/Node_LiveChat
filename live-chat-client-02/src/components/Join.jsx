import React from 'react';

function Join({ setUsername, setRoom, joinRoom }) {
  return (
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
  );
}

export default Join;
