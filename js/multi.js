// Obtener los elementos del DOM
const unirseModal = document.getElementById("unirseModal");
const crearModal = document.getElementById("crearModal");
const unirseBtn = document.getElementById("unirseBtn");
const crearBtn = document.getElementById("crearBtn");
const closeUnirse = document.getElementById("closeUnirse");
const closeCrear = document.getElementById("closeCrear");

// Mostrar el modal de "Unirse a Sala"
unirseBtn.onclick = function() {
    unirseModal.style.display = "flex";
}

// Mostrar el modal de "Crear Sala"
crearBtn.onclick = function() {
    crearModal.style.display = "flex";
}

// Cerrar el modal de "Unirse a Sala"
closeUnirse.onclick = function() {
    unirseModal.style.display = "none";
}

// Cerrar el modal de "Crear Sala"
closeCrear.onclick = function() {
    crearModal.style.display = "none";
}

// Cerrar el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target == unirseModal) {
        unirseModal.style.display = "none";
    }
    if (event.target == crearModal) {
        crearModal.style.display = "none";
    }
}
