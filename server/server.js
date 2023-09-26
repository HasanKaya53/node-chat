const express = require('express');
const session = require('express-session');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './view');




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