const express=require('express');
const app=express();
const server=require('http').createServer(app);
const io=require('socket.io')(server);

io.on('connection',(socket)=>{          // Listen for new connections from clients
    console.log('a user connected');    // Log to the server console when a new user connects
    socket.on('disconnect',()=>{        // Listen for disconnections from clients
        console.log('user disconnected');
    });
    socket.on('chat message',(msg)=>{   // Listen for chat messages from clients
        console.log('message: '+msg);   // Log the message to the server console
        io.emit('chat message',msg);    // Broadcast to all clients
    });
});

/* DON'T USE THIS 
app.listen(3000,()=>{
    console.log('listening on *:3000');  // Log to the server console when the server is running
}
*/
server.listen(3000,()=>{
    console.log('listening on *:3000');  // Log to the server console when the server is running
});