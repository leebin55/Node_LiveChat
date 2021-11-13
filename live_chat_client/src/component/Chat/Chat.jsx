import React, { useEffect, useState } from 'react';
import './Chat.css';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Msgs/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

let socket; //create empty variable
const EndPoint = 'localhost:5000'; //backend server

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState('');
  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(EndPoint);
    setName(name);
    setRoom(room);
    console.log(socket);
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [EndPoint, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessageList((messageList) => [...messageList, message]);
    });
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
