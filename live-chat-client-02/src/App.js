import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import Join from "./components/Join";

const socket = io.connect("http://localhost:5500");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username === "" || room === "") {
      alert("You must input Name and Room id");
      return;
    }
    socket.emit("join_room", { room, username });
    setShowChat(true);
  };

  return (
    <div className="App">
      {!showChat ? (
        <Join setUsername={setUsername} setRoom={setRoom} joinRoom={joinRoom} />
      ) : (
        <Chat
          socket={socket}
          username={username}
          room={room}
          setShowChat={setShowChat}
        />
      )}
    </div>
  );
}

export default App;
