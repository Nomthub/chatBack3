const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server} = require('socket.io');

const mysql = require('mysql');
const db = require('./configure/database');
const exp = require('constants');

const app = express();
app.use(cors());
app.use(express.json());

//Route to get all posts
const getAll = app.get("/",function(req,res){
    db.query("SELECT * FROM `BuildStatus`", (err,result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

//Route to get one post
const getSome = app.get("/api/getFromID/:id", (req,res) => {
    const id = req.params.id;
    db.query("SELECT * FROM `BuildStatus` WHERE id = ?" , id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result)
    });
});

//Route for creating post
const add_stDB = app.post('/api/create', (req,res) =>{
    const text = req.body.text;

    db.query("INSERT INTO `BuildStatus` (`s_text`) VALUES ('"+ text +"')", [text], (err,result) =>{
        if(err){
            console.log(err);
        }
        console.log(result);
    });
});

//Route to delete a post
const remove_status = app.delete('api/delete/:id', (req,res) => {
    const id = req.params.id;

    db.query("DELETE FROM `BuildStatus` WHERE id = ?", id, (err,result) =>{
        if(err){
            console.log(err);
        }
    });
});

/*const pool = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user : 'root',
    password : 'RuethS54%sO$',
    database : 'Build3Bot',
    debug : false
});
*/

app.get("/",function(req,res){
    res.sendFile(__dirname + './client/src/App.js');
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('add_status', (data) =>{
            socket.join(data);
            //add_stDB(data);
            console.log(`User with ID: ${socket.id} added status: ${data}`);
        /*add_status(status, function(res) {
            if(res){
                io.emit('refresh feed', status);
                console.log(`User with ID: ${socket.id} added status: ${status}`);
            }
            else{
                io.emit('error');
            }
        });
        */
    });

    socket.on("send_comment", (data) => {
        //console.log(data);
        socket.emit("recieve_comment", data);
    });

    socket.on("send_status", (data) => {
        socket.emit("recieve_status", data);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});

/*const add_stDB = (status, callback) => {
    pool.getConnection((err, connection) => {
        if(err){
            callback(false);
            return;
        }
        connection.query("INSERT INTO `BuildStatus` (`s_text`) VALUES ('"+status+"')",function(err,rows){
            connection.release();
            if(!err) {
              callback(true);
            }
        });
        connection.on('error', (err) =>{
            callback(false);
            return;
        });
    });
};*/

server.listen(3001, () => {
    console.log("Server Running");
});

app.listen(3001, () => {
    console.log(`Server is running on 3001`);
});