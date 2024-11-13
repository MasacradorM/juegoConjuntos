document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioVerificacion');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        const codigoIngresado = document.getElementById('codigo').value;
        const email = document.getElementById('email').value;

        if (!codigoIngresado) {
            alert('Por favor, ingresa el código de verificación');
            return;
        }

        fetch('libreria/verificarCodigo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codigo: codigoIngresado, email: email }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'cambiarContra.html';
            } else {
                alert('Código incorrecto. Inténtalo de nuevo.');
            }
        })
        .catch(error => {
            alert('Error al verificar el código.');
        });
    });
});