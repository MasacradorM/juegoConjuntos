// Obtener elementos del DOM
var modal = document.getElementById("myModal");
var btn = document.getElementById("abrirModal");
var cerrarSesionBtn = document.querySelector(".cerrar-sesion");

// Abrir el modal al hacer clic en el botón
btn.onclick = function() {
    modal.style.display = "block";
}

// Cerrar el modal al hacer clic en la 'x'
span.onclick = function() {
    modal.style.display = "none";
}

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Función para cerrar la sesión
cerrarSesionBtn.onclick = function() {
    // Aquí eliminas la información de la sesión o lo que sea necesario para cerrar sesión
    // Por ejemplo, si usas localStorage:
    localStorage.removeItem('user'); // Si guardaste el usuario en localStorage
    sessionStorage.removeItem('user'); // Si guardaste el usuario en sessionStorage
    // O si usas cookies, puedes eliminarlas así (dependiendo de cómo estén configuradas):
    // document.cookie = "nombre_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Luego, redirige al login
    window.location.href = "login.html";
}
