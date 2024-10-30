document.getElementById('formularioVerificacion').addEventListener('submit', function(event) {
    event.preventDefault();
    const codigoIngresado = document.getElementById('codigo').value;
    const email = document.getElementById('email').value;

    // Verificar que los valores no estén vacíos
    if (!codigoIngresado || !email) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    console.log({ codigo: codigoIngresado, email: email });

    fetch('libreria/verificarCodigo.php', { // Asegúrate de que esta ruta sea correcta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo: codigoIngresado, email: email }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Código verificado exitosamente.');
            // Aquí podrías redirigir al usuario para cambiar la contraseña
        } else {
            alert('Código incorrecto. Inténtalo de nuevo.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al verificar el código.');
    });
});
