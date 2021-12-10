import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../css/Join.css';

function Join({ room, setRoom, nickname, setNickname, socket, setShowChat }) {
  const joinRoom = () => {
    if (nickname.trim() === '' || room.trim() === '') {
      alert('닉네임과 채팅방을 입력해주세요');
      return;
    }
    const result = window.confirm(
      `${nickname} 님 ${room} 에 입장하시겠습니까?`
    );
    if (result) {
      socket.emit('join_room', { room });
      setShowChat(true);
    }
  };
  return (
    <div className="join-chat-container">
      <h1> 채팅방 입장하기 </h1>
      <div>
        <TextField
          id="filled-basic"
          label="Nickname"
          variant="filled"
          sx={{ m: 1, width: '500px' }}
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          id="filled-basic"
          label="Room"
          variant="filled"
          sx={{ m: 1, width: '500px' }}
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
      </div>
      <Button variant="outlined" onClick={joinRoom}>
        Join a Room
      </Button>
    </div>
  );
}
export default Join;
