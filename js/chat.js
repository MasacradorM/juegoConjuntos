document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesDiv = document.getElementById('messages');

    // Crear una conexión WebSocket
    const socket = new WebSocket('ws://localhost:8080/chat');

    // Escuchar mensajes entrantes
    socket.addEventListener('message', function(event) {
        const message = event.data;
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Mantener la vista en el último mensaje
    });

    // Enviar mensaje al hacer clic en el botón
    sendBtn.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message) {
            socket.send(message);
            messageInput.value = '';  // Limpiar el campo de entrada
        }
    });

    // Enviar mensaje al presionar Enter
    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendBtn.click();
        }
    });
});