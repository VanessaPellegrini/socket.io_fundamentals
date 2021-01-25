const express = require('express');

const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//inicializar socket IO

let io = socketIO(server);

io.on('connection', (client) => {
    //cuando un usuario se conecta a la app manda la notificacion
    console.log('usuario conectado');

    //escucha
    client.on('disconnect', () =>{
        console.log('usuario desconectado');
    })

    client.on('enviarMensaje', (message) => {
        console.log(message);
    })
})


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});