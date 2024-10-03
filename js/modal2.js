// Obtener elementos del DOM
var modal = document.getElementById("myModal");
var btn = document.getElementById("abrirModal");
var span = document.getElementsByClassName("close");

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