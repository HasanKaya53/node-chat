

// const { Server } = require("socket.io");
// const io = new Server(server);


class createSocket
{
    constructor(io)
    {
        this.io = io;
    }

    socketEvents()
    {
        this.io.on('connection', (socket) => {
            console.log('Kullanıcı bağlandı .. '+socket.id);
            socket.on('disconnect', () => {
                console.log('Bağlantı Kesildi.. '+socket.id);
            });

            socket.on('message', (msg) => {
                console.log( msg);

                this.io.emit('chat message', { name: msg.name, message: msg.message }); // This will emit the event to all connected sockets
            });
        });
    }

    socketConfig()
    {
        this.io.use((socket, next) => {
            let token = socket.handshake.query.token;
            if (token) {
                jwt.verify(token, config.secret, (err, decoded) => {
                    if (err) return next(new Error('Authentication error'));
                    socket.decoded = decoded;
                    next();
                });
            } else {
                next(new Error('Authentication error'));
            }
        });
        this.socketEvents();
    }
}

module.exports = createSocket;