const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
var bodyParser = require('body-parser')
const cors = require("cors");
const connectDB = require('./db');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
connectDB();
const server = http.createServer(app);
let users =  []


// let users = [];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","DELETE","PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('postUser', newUser => {
    console.log("ehkjw")
    newUser.id = Date.now();
    users.push(newUser);
    socket.broadcast.emit('users', users);
  });

  socket.on('getUsers', () => {
    console.log(users)
    socket.emit('users', users);
  });


  socket.on('deleteUser', email => {
    users = users.filter(user => user.email !== email);
    console.log(users)
    socket.broadcast.emit('users', users);
  });


  



});
const entityRoutes = require('./routers')
app.use('/api', entityRoutes);

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
  console.log(users)
});
