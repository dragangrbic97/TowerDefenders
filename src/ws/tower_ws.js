const io = require('socket.io')(4444,{});

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('attack', () => {
        console.log("attack");
    });

    socket.on('defend', () => {
        console.log("defend");
    });


});


