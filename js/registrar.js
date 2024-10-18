document.getElementById('registration-form').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;

    if (!email || !password || !username) {
        alert('Por favor, complete todos los campos.');
        event.preventDefault(); // Detener el envío del formulario
    }
});
