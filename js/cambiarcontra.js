const form = document.querySelector('form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita el envío del formulario por defecto

  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validación de contraseñas
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Simulación de cambio de contraseña (reemplazar con tu lógica real)
  if (changePassword(password)) {
    alert('Contraseña cambiada con éxito.');
    window.location.href = 'login.html'; // Reemplaza con la URL de la página de inicio de sesión
  } else {
    alert('Error al cambiar la contraseña');
  }
});

function changePassword(password) {
  // Aquí debes implementar tu lógica para cambiar la contraseña
  // Por ejemplo, enviar una solicitud al servidor
  // y actualizar la contraseña en la base de datos
  console.log('Nueva contraseña:', password);
  return true; // Puedes devolver true si el cambio de contraseña fue exitoso
}