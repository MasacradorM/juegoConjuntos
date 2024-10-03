const form = document.getElementById('registration-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Simulación de envío de datos al servidor (reemplazar con tu lógica real)

    // Simulación de éxito:
    alert('¡Cuenta creada con éxito!');

    // Redirige al login después de que el usuario cierre la alerta
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 100);
});