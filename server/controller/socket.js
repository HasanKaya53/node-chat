

// const { Server } = require("socket.io");
// const io = new Server(server);


class createSocket
{
    constructor(io)
    {
        this.io = io;
    }

    getActiveUsers(activeUsers,nowUser){
        let activeUsersList = [];


        activeUsers.forEach((user)=>{
            if(user.name == undefined) return;
            if(user.name == null) return;
            if(user.name == nowUser) return;
            activeUsersList.push(user.name);
        });

        return activeUsersList;
    }

    socketEvents()
    {
        let activeUsers = [];
        this.io.on('connection', (socket) => {

            
            let sessionToken = socket.handshake.query['session'];
            socket.id = sessionToken ? sessionToken : socket.id;


            console.log('Kullanıcı bağlandı .. '+socket.id);
            socket.on('userLogin', (msg) => {
                console.log('userLogin : '+msg.name);
                activeUsers.push({id:socket.id,name:msg.name});
                //create session...
                socket.handshake.query["user"] = {name:msg.name};
                console.log(socket.handshake.query["user"]);
            });



            socket.on('message', (msg) => {
                this.io.emit('chat message', { name: msg.name, message: msg.message }); // This will emit the event to all connected sockets
            });




            socket.on('disconnect', () => {
                console.log('Bağlantı Kesildi.. '+socket.id);
                let activeUsersList = this.getActiveUsers(activeUsers,socket.handshake.query["user"]);
                this.io.emit('active users', { activeUsers: activeUsersList,'test':'test' }); // This will emit the event to all connected sockets
            });
            let activeUsersList = this.getActiveUsers(activeUsers,socket.handshake.query["user"]);
            this.io.emit('active users', { activeUsers: activeUsersList }); // This will emit the event to all connected sockets

            //if id is not in activeUsers array then add it
            //if id is in activeUsers array then remove it

            

       

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