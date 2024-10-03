
const form = document.querySelector('form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');   


form.addEventListener('submit', (event) => {
  event.preventDefault();   
 // Prevent default form submission

  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validate passwords
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Replace this with your actual password change logic
  // For example, you might send a request to your server to update the password
  if (changePassword(password)) {
    alert('Cuenta cambiada con éxito');
    window.location.href = 'login.html'; // Replace with the actual login page URL
  } else {
    alert('Error al cambiar la contraseña');
  }
});

function changePassword(password) {
  // Implement your password change logic here
  // For example, send a request to your server to update the password
  // Return true if successful, false otherwise
  return true; // Replace with your actual logic
}