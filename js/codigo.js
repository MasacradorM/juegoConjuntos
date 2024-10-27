document.getElementById('formCodigo').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const formData = new FormData(this);

    fetch('libreria/verificar.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message);
            // Aquí puedes redirigir a otra página si lo deseas
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
