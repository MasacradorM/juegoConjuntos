document.getElementById('abrirModal').addEventListener('click', function () {
    // Llamar al PHP con fetch
    fetch('libreria/subirImagen.php', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // Actualizar la imagen en el modal
            const imagenPerfil = document.getElementById('imagenPerfil');
            imagenPerfil.src = `http://localhost/2899747/Juego%20Conjuntos%20Git/perfiles/${data.imagen}`; // Asegúrate de configurar correctamente la ruta.
        } else {
            console.error('Error al obtener la imagen:', data.error);
        }
    })
    .catch((error) => {
        console.error('Error en la petición:', error);
    });
});
