import React, { useEffect, useState } from 'react';
import './Chat.css';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Msgs/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

const socket = io.connect('http://localhost:5500');

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket.io.on('connect', ({ text }) => {
      console.log(text);
    });
    setName(name);
    setRoom(room);
    console.log(socket);
    socket.emit('join', { name, room }, () => {});
    return () => {
      // socket.emit('disconnect');
      // socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessageList((messageList) => [...messageList, message]);
    });
    console.log(message, messageList);
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messageList={messageList} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
