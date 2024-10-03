const form = document.querySelector('form');
const emailInput = document.getElementById('email');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Validación del correo electrónico (opcional)
    if (!isValidEmail(emailInput.value)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Simulación de envío del código (reemplazar con tu lógica real)
    console.log('Código enviado a:', emailInput.value);

    // Muestra mensaje de éxito
    alert('Código enviado con éxito.');

    setTimeout(() => {
        window.location.href = 'codigo.html';
    }, 100);
    });


function isValidEmail(email) {
    // Puedes usar una expresión regular más compleja para una validación más estricta
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
