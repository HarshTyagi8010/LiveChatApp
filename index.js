const io = require('socket.io')(8000)
const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',name =>{
       //if any new user joines, let other users connected to the server know! 
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    //If anyone send message , broadcast to other people 
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    //if someone leaves the chat,let other know

socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
});
}) 