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
            window.location.href = 'inicio.html';
            localStorage.setItem('nombre', result.nombre);
            localStorage.setItem('usuariosId', result.usuarioId);
            localStorage.setItem('email', result.email)
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

(function() {
    function verificarSesion() {
        // Cambiado a localStorage
        const usuarioId = localStorage.getItem('usuarioId');
        const nombreUsuario = localStorage.getItem('nombre');
        
        console.log('Verificando sesión...');
        console.log('Usuario ID:', usuarioId);
        console.log('Nombre Usuario:', nombreUsuario);
        
        if (usuarioId || nombreUsuario) {
            console.log('Sesión activa detectada. Iniciando redirección...');
            try {
                const redirectURL = 'http://localhost/2899747/Juego%20Conjuntos%20Git/inicio.html';
                console.log('Redirigiendo a:', redirectURL);
                window.location.href = redirectURL;
                return true;
            } catch (error) {
                console.error('Error durante la redirección:', error);
            }
        } else {
            console.log('No hay sesión activa, mostrando formulario de login');
            return false;
        }
    }

    // Verificar sesión inmediatamente
    verificarSesion();

    // Verificar nuevamente cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', verificarSesion);

    // Y una última vez cuando todos los recursos estén cargados
    window.addEventListener('load', function() {
        if (!verificarSesion()) {
            console.log('Carga completa - No hay sesión activa');
        }
    });
})();