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

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${data.username} joined room: ${data.room}`);
  });

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnection', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log('SERVER RUNNING');
});
