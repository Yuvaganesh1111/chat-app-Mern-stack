const express=require('express');
const app=express();

const {Server}=require('socket.io');
const http=require('http');
const cors=require('cors');
app.use(cors());
const server=http.createServer(app);

const io =new Server(server,{
    cors:{
        origin:["https://chat-app-yuva-frontend.vercel.app"],
        method:['get','post']
    }
})
io.on("connection",(socket)=>{
    console.log(`user connected id ${socket.id}`)
    socket.on("room",(data)=>{
        socket.join(data);
     })
    socket.on("send_message",(data)=>{
       socket.to(data.room).emit("recived_message",data)
    })
})
server.listen(3001,()=>{
    console.log("server is running on 3001")
})



