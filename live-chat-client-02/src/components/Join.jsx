import React from "react";

function Join({ setUsername, setRoom, joinRoom }) {
  return (
    <div className="joinChatContainer">
      <h1> 채팅방 입장하기 </h1>
      <input
        type="text"
        placeholder="이름"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="채팅방 이름"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
        onKeyDown={(e) => {
          e.key === "Enter" && joinRoom();
        }}
      />
      <button onClick={joinRoom}>Join A Room</button>
    </div>
  );
}

export default Join;
