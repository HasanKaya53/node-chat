const express = require('express');
const session = require('express-session');
const redis = require('redis');
const app = express();
var uid = require('uid-safe')

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './view');





const sessionMiddleware = session({

    secret: "fsad124asdfasdfs45343_5322asdfaSFAA",
    resave: false,
    saveUninitialized: true,
  });
  
app.use(sessionMiddleware);


const client = redis.createClient();


const userRouter = require('./routes/userRouter');
const socketController = require('./controller/socket');


const socket = new socketController(io);
socket.socketEvents();


app.use('/', userRouter.router);






// io.on('connection', (socket) => {
//     console.log('a user connected');
// });

server.listen(port,'0.0.0.0' ,() => {
    console.log('listening on *:'+port);
});