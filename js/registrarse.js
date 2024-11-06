document.getElementById('formRegistro').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Formulario enviado"); // Esto debería aparecer en la consola

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    // Usar URLSearchParams para enviar los datos en formato form-urlencoded
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);

    try {
        const response = await fetch('libreria/registrarse.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.toString()
        });

        console.log('Respuesta del servidor:', response); // Agrega esta línea

        if (!response.ok) {
            throw new Error('Respuesta de red no satisfactoria');
        }

        const result = await response.json();
        console.log(result); // Esto debería mostrar la respuesta del servidor

        if (result.success) {
            alert('Registro exitoso. Revisa tu correo para el código de verificación.');
            window.location.href = 'login.html';  // Cambia esta ruta a la página de tu elección
        } else {
            alert('Error en el registro: ' + result.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema con la solicitud: ' + error.message);
    }
});
