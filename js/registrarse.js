document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-container');
    console.log('Formulario encontrado:', form); // Verificar si encuentra el formulario
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Formulario enviado');
        
        const formData = new FormData();
        const emailInput = form.querySelector('input[type="email"]');
        const passwordInput = form.querySelector('input[type="password"]');
        const playerNameInput = form.querySelector('input[type="text"]');
        
        // Verificar si se encuentran los campos
        console.log('Campos encontrados:', {
            email: emailInput?.value,
            password: passwordInput?.value,
            playerName: playerNameInput?.value
        });
        
        formData.append('email', emailInput?.value || '');
        formData.append('password', passwordInput?.value || '');
        formData.append('playerName', playerNameInput?.value || '');
        
        try {
            console.log('Iniciando fetch a registrarse.php');
            const response = await fetch('libreria/registrarse.php', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            
            if (data.success) {
                localStorage.setItem('registerEmail', formData.get('email'));
                alert(data.message);
                window.location.href = 'codigo.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error completo:', error);
            alert('Error al procesar la solicitud: ' + error.message);
        }
    });
});