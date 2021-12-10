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
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      <button
        className="sendButton"
        onClick={(e) => {
          console.log('send button clicked');
          sendMessage(e);
        }}
      >
        Send
      </button>
    </form>
  );
}

export default Input;
