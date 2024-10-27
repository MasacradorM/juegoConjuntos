document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const loginUsuario = document.getElementById('loginUsuario').value;
    const contrasena = document.getElementById('contrasena').value;

    try {
        const response = await fetch('libreria/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'loginUsuario': loginUsuario,
                'contrasena': contrasena
            })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = '../inicio.html';
        } else {
            showModal();
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});

function showModal() {
    const modal = document.getElementById('errorModal');
    modal.style.display = 'block';
    setTimeout(() => { 
        modal.style.display = 'none';
    }, 3000); // Cierra el modal después de 3 segundos
}
