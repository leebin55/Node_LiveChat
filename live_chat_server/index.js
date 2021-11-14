const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const PORT = process.env.PORT || 5500;

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected : ${socket.id}`);

  socket.on('join_room', ({ room, username }) => {
    socket.join(room);
    socket.emit('notice_join', username);
    console.log(`User with ID: ${username} joined room: ${room}`);
  });

  socket.on('send_message', (data) => {
    console.log('data = ', data);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnection', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log('SERVER RUNNING');
});
