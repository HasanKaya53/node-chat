

// const { Server } = require("socket.io");
// const io = new Server(server);
const Redis = require('ioredis');

class createSocket
{
    constructor(io)
    {
        this.io = io;
    }

    async getSessionData(socketID){
        const redis = new Redis();
        let sessionData = {};
        await redis.hgetall("socket:"+socketID, function (err, result) {
            sessionData = result;
        });

        return sessionData;

    }

    getActiveUsers(activeUsers){
        let activeUsersList = [];


        activeUsers.forEach((user)=>{
            console.log(user);
            if(user.name == undefined) return;
            if(user.name == null) return;

            activeUsersList.push(user.name);
        });

        return activeUsersList;
    }

    socketEvents()
    {
        let activeUsers = [];
        let activeUsersEmet = [];
        this.io.on('connection', (socket) => {


            const redis = new Redis();


            socket.id = socket.handshake.query["session"];
            let userName = socket.handshake.query["name"];
            let chatRoom = socket.handshake.query["chatRoom"];
            

         
    
            socket.on('userLogin', (msg) => {
                if(activeUsersEmet.includes(socket.id)) return false;
                activeUsers.push({id:socket.id,name:userName});
                redis.hmset("socket:"+socket.id, {socketId:socket.id,name:userName});
                socket.emit('userLogin', { name: userName, message: userName }); // This will emit the event to all connected sockets
            });

  


            socket.on('message', async (msg) => {
                let sessionData = await this.getSessionData(socket.id);
                console.log(sessionData);
                this.io.emit('chat message', { name: userName, message: msg.message });
            });

            socket.on('disconnect', () => {

                let activeUsersList = this.getActiveUsers(activeUsers);
                this.io.emit('active users', { activeUsers: activeUsersList}); // This will emit the event to all connected sockets
            });


            let activeUsersList = this.getActiveUsers(activeUsers);
            this.io.emit('active users', { activeUsers: activeUsersList }); // This will emit the event to all connected sockets


            

       

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