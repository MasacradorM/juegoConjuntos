document.querySelector('#form-cambio').addEventListener('submit', function(e) {
  e.preventDefault(); // Evitar el envío por defecto

  const nuevaContrasena = document.getElementById('nueva-contrasena').value;
  const confirmarContrasena = document.getElementById('confirmar-contrasena').value;

  if (nuevaContrasena !== confirmarContrasena) {
    // Si las contraseñas no coinciden, mostrar un mensaje
    document.getElementById('mensaje-cambio').textContent = 'Las contraseñas no coinciden.';
    document.getElementById('mensaje-cambio').style.color = 'black';
  } else {
    // Si las contraseñas coinciden, enviar el formulario
    this.submit();
  }
});
