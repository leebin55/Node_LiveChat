import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Message({ messageList, username }) {
  const show_msgs = () => {
    messageList.map((msg) => {
      return (
        <div className="message" id={username === msg.author ? "you" : "other"}>
          <div className="message-content">
            <p id="time">{msg.time}</p>
            <p id="author">{msg.author}</p>
          </div>
          <div className="message-meta">
            <p id="time">{msg.time}</p>
            <p id="author">{msg.author}</p>
          </div>
        </div>
      );
    });
  };
  return (
    <ScrollToBottom className="message-container">{show_msgs()}</ScrollToBottom>
  );
}
export default Message;
