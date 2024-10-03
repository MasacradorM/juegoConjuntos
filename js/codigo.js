const form = document.querySelector('form');
const codeInput = document.getElementById('code');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita el comportamiento predeterminado del envío del formulario

  const   
 code = codeInput.value;

  // Verifica si el código es correcto (reemplaza con tu lógica de verificación)
  if (code === '12345') { // Ejemplo de código correcto
    alert('Código correcto');
    // Redirige a la página de éxito
    window.location.href = 'cambiarcontra.html';
  } else {
    alert('Código incorrecto');
  }
});