const express = require('express');
const app = express();
const port = 3000;
const socketIo = require('socket.io');
const sql = require("mssql");
const bodyParser = require('body-parser')
const cors = require('cors'); 
const infobip = require('infobip');
//const ps = new sql.PreparedStatement();

var client = new infobip.Infobip('humasso', 'wuK%QSHAU^f1');


var utente

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server connection on  http://127.0.0.1:${port}`);  // Server Connnected
});

socketServer = socketIo(server);
socketServer.on('connection', socket => {
    console.log('Socket: client connected');

    socket.on('new-message', function(data){ 
      socketServer.in(data.room).emit('resp-message',  {utente:data.utente, message:data.message});
      console.log(data.utente +" : " + data.message + " " + data.room);
        /*
      var message = {from: "RE-Chat", to : ["393423461387", "393911423654"], text : data.message};
      client.SMS.send(message,function(err, response){
        console.log(response);
        console.log("Messaggio mandato con successo!")
      });
      */
      let q = `INSERT INTO Messagge VALUES('${data.utente}','${data.message}','${data.room}')`;
        
        sql.connect(config, function (err) {
        
            if (err) console.log(err);
            else console.log("DB Connected!");
            
            const request = new sql.Request();
            request.query(q, function (err, recordset) {     
                if (err) console.log(err)
                console.log(recordset);  
            });
        });
    
    });

    socket.on('join', function(data){

      socket.join(data.room);
      console.log(data.utente + ' ' + ' joined the room : ' + data.room);
      socket.broadcast.to(data.room).emit('new user joined ', {user:data.utente, message:'has joined this room.'});
    });
    /*
    socket.on('leave', function(data){
    
      console.log(data.user + 'left the room : ' + data.room);
      socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
      socket.leave(data.room);
    });
    */
});

const config = {
    user: 'LABATI.NICHOLAS',
    password: 'XXSSSS5O+',
    server: '213.140.22.237\\SQLEXPRESS', 
    database: 'LABATI.NICHOLAS' 
};

/*
app.post("/message",  bodyParser.json(), (req,res) => {
    console.log("Ricevuto una richiesta POST");
    console.log(req.body);
    utente=req.body;
    res.json("Ok bro");
    let q = `INSERT INTO Messagge VALUES('${utente.utente}','${utente.messagge}','${utente.stanza}')`;

    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        else console.log("DB Connected!");
        
        const request = new sql.Request();
        request.query(q, function (err, recordset) {     
            if (err) console.log(err)
            console.log();  
        });
    });
});
*/
app.get('/list1', function (req, res) {

    let q = `SELECT * FROM Messagge WHERE Stanza='1'`
    //let t = [{utente: String, message: String}]

    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(q, function (err, recordset) {
            if (err) console.log(err)
            //console.log(recordset);
            res.send(recordset);
        });
    });
});

app.get('/list2', function (req, res) {

    let q = `SELECT * FROM Messagge WHERE Stanza='2'`
    //let t = [{utente: String, message: String}]

    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(q, function (err, recordset) {
            if (err) console.log(err)
            //console.log(recordset);
            res.send(recordset);
        });
    });
});

app.get('/list3', function (req, res) {

    let q = `SELECT * FROM Messagge WHERE Stanza='3'`
    //let t = [{utente: String, message: String}]

    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(q, function (err, recordset) {
            if (err) console.log(err)
            //console.log(recordset);
            res.send(recordset);
        });
    });
});
/*
app.post("/user",  bodyParser.json(), (req,res) => {
    console.log("Ricevuto una richiesta POST");
    console.log(req.body);
    res.json("Utente Ricevuto")
    utente = req.body;
    console.log("This is utente: " + utente)
});
*/
/*
sql.connect(config, function (err) {
    
    if (err) console.log(err);
    else console.log("DB Connected!");

    const request = new sql.Request();
    request.query('select * from Paziente', function (err, recordset) {
            
        if (err) console.log(err)
        console.log(recordset);  
    });
});
*/
