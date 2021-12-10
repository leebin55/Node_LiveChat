import React from 'react';
import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';
import '../css/InfoBar.css';

function InfoBar({ room, setShowChat, socket }) {
  const exitChat = () => {
    // socket 연결 끊기
    socket.emit('disconnection');
    // Join화면으로
    setShowChat(false);
  };

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <img src={closeIcon} alt="close icon" onClick={exitChat} />
      </div>
    </div>
  );
}

export default InfoBar;
