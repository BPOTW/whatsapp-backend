import express from "express";
import {Server} from "socket.io";
import http from "http";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"*",
        method:["GET", "POST"],
        credentials:true,
    }
});

io.on("connection",(socket)=>{
    console.log("Connected to websocket : ", socket.id);

    socket.on('join',(roomId)=>{
        socket.join(roomId);
    });
    socket.on('leave',(roomId)=>{
        socket.leave(roomId);
    });
    socket.on('send',(message)=>{
        console.log(message);
        socket.to(message.room).emit("message",message);
    });
});

server.listen(5050,()=>{
    console.log('Server started successfully on port 5050');

})

