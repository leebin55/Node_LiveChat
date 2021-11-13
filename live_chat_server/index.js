const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();

const server = http.createServer(app);

//react 서버와 연결
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log(socket.id, 'CONNECTED');

  socket.on('disconnect', () => {
    // user just had left
    console.log('disconnected');
  });
});
