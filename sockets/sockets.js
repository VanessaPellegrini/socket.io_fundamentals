const { io } = require('../server')


io.on('connection', (client) => {
    //cuando un usuario se conecta a la app manda la notificacion
    console.log('usuario conectado');

    client.emit('enviarMensaje', { //1 argumento - nombreEvento
        usuario: 'Van', //2 arg objeto
        mensaje: 'Welcome to the app'
    }, function(){ //3 arg callback para saber si el msg llegó correctamente
        console.log('callback ok');
    })

    //escucha
    client.on('disconnect', () =>{
        console.log('usuario desconectado');
    })

    //escuchar el cliente
    client.on('enviarMensaje', (mensaje, callback) => {
        console.log('Mensaje recibido:', mensaje);
 
        // en este ejemplo validaremos si el objeto recibido ('mensaje') contiene la llave: 'usuario'
        //la validacion se hace devolviendo una respuesta dentro del callback que espera socketIO.emit() del lado cliente
 
        if (!callback) return; // evitar que ocurra error si mensaje del cliente no se hizo con callback
 
        // si el cliente remoto envio mensaje con peticion de confirmacion en 'callback' en parametro 3 entonces:
        if (mensaje.usuario) {
            callback({
                resp: 'El mensaje contiene la llave: usuario' // validacion positiva
            });
        } else {
            callback({
                resp: 'ATENCION!El mensaje NO contiene la llave: usuario' // validacion negativa
            });
        }
    });
})