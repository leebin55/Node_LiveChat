const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const PORT = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);

//react 서버와 연결
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors());

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log(socket.id, 'CONNECTED');
  // socket.emit('connect', { text: 'connected' });
});
