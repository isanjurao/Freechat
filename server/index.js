    const io = require('socket.io')(8000)

const user ={};

io.on('connection',Socket =>{
    Socket.on('new-user-joined',name =>{
        
        user[Socket.id]= name;
        Socket.broadcast.emit('user-joined',name);
    })
    Socket.on('send',message =>{
        Socket.broadcast.emit('recived',{message: message ,name: user[Socket.id]})
    });

    Socket.on('disconnect',message =>{
        Socket.broadcast.emit('left',user[Socket.id])
        delete user[Socket.id]
    });
    
})

