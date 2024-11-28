document.addEventListener('DOMContentLoaded', () => {
    const nombre = localStorage.getItem('nombre');
    const email = localStorage.getItem('email');
    if(nombre){
        document.getElementById('nombre').textContent = nombre;
    }
    if(email){
        document.getElementById('correoo').textContent = email;
    }
}
)

function cerrarSesion() {
    // Primero limpiamos localStorage
    localStorage.clear();
    // Luego hacemos la petición al servidor para limpiar la sesión PHP
    fetch('http://localhost/2899747/Juego%20Conjuntos%20Git/libreria/cerrar.php')
    
    .then(response => response.json())
    .then(data => {
    if (data.status === 'success') {
    // Redirigir al login solo después de que todo se haya
    
    limpiado
    
    window.location.href =
    './login.html';
    
    }
    })
    .catch(error => {
    console.error('Error al cerrar sesión:', error);
    // Redirigir de todos modos en caso de error
    });
    
    }
    // Agregar el evento al botón
    document.getElementById('cerrar').addEventListener('click', cerrarSesion);