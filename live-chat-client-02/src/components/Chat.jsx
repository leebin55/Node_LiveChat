import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, username, room, setShowChat }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  // 채팅방 입장 할때 ** 님이 채팅방에 입장하였습니다.
  const joined_chat = async () => {
    await socket.on('notice_join', (username) => {
      console.log(`${username} joined this chat room`);
      setMessageList(...messageList, {
        message: `${username}님이 입장하셨습니다.`,
      });
    });
  };

  const sendMessage = async () => {
    // 입력창이 빈칸이 아닐때
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      // messageData를 server에 sende_message로 보냄
      await socket.emit('send_message', messageData);
      // messageList에 massageDate추가
      setMessageList((list) => [...list, messageData]);
      // 입력창 빈칸으로 만들기
      setCurrentMessage('');
    }
  };
  const exitChat = () => {
    // socket 연결 끊기
    socket.emit('disconnection');
    // exit_chat을 server로 uername과 room을 함께 보냄
    socket.emit('exit_chat', { username, room });
    // Join화면으로
    setShowChat(false);
    socket.on('left_user', (username) => {});
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span className="chat-span chat-exit" onClick={exitChat}>
          {' '}
          ⇦{' '}
        </span>
        <span className="chat-span">Welcome to ' {room} ' </span>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((msg, index) => {
            return (
              <div
                key={index}
                className="message"
                id={username === msg.author ? 'you' : 'other'}
              >
                <div>
                  <div className="message-content">
                    <p>{msg.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{msg.time}</p>
                    <p id="author">{msg.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type any word here..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
