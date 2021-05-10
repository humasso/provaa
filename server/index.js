const express = require('express');
const app = express();
const port = 3000;
const socketIo = require('socket.io');
const sql = require("mssql");

const server = app.listen(port, () => {
  console.log(`Server connection on  http://127.0.0.1:${port}`);  // Server Connnected
});

socketServer = socketIo(server);
socketServer.on('connection', socket => {
    console.log('Socket: client connected');

    socket.on('new-message', function(data){ 
      socketServer.in(data.room).emit('resp-message',  {user:data.user, message:data.message});
      console.log(data.user +" : " + data.message);
    });

    socket.on('join', function(data){

      socket.join(data.room);
      console.log(data.user + ' ' + ' joined the room : ' + data.room);
      socket.broadcast.to(data.room).emit('new user joined ', {user:data.user, message:'has joined this room.'});
    });

    socket.on('leave', function(data){
    
      console.log(data.user + 'left the room : ' + data.room);
      socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
      socket.leave(data.room);
    });
});

const config = {
    user: 'HUSSAIN.HUMAS',
    password: '222000C9+',
    server: '213.140.22.237\\SQLEXPRESS', 
    database: 'HUSSAIN.HUMAS' 
};
/*
sql.connect(config, function (err) {
    
    if (err) console.log(err);
    else console.log("DB Connected!");

    const request = new sql.Request();
    request.query('select * from Prestazione', function (err, recordset) {
            
        if (err) console.log(err)
        console.log(recordset);  
    });

});
*/