const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
    console.log('Conectado al servidor WebSocket');
    const mensaje = { tipo: 'login', usuarioId: 1 }; // Cambiar según el usuario.
    socket.send(JSON.stringify(mensaje));
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.tipo === 'usuarios_en_linea') {
        console.log('Usuarios en línea:', data.usuarios);
    }
};

socket.onclose = () => {
    console.log('Desconectado del servidor WebSocket');
};
