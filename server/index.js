const express = require('express');
const app = express();
const port = 3000;
const socketIo = require('socket.io');
const mysql = require('mysql');

socketServer = socketIo(server);
socketServer.on('connection', socket => {
    console.log('Socket: client connected');
    socket.on('new-message', (message) => { 
      socketServer.emit('resp-message', message);
      console.log(message);
    });
});

const con = mysql.createConnection({
  host: "213.140.22.237\SQLEXPRESS",
  user: "HUSSAIN.HUMAS", 
  password: "222000C9+"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const server = app.listen(port, () => {
  console.log(`Server connection on ${port}`);
});
/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});
*/