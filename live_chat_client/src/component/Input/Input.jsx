import React from 'react';
import './Input.css';

function Input({ setMessage, sendMessage, message }) {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChang={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      <button
        type="button"
        className="sendButton"
        onClick={(e) => sendMessage(e)}
      >
        Send
      </button>
    </form>
  );
}

export default Input;
