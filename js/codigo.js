document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-container');
  console.log('Formulario de código encontrado:', form);
  
  form.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log('Formulario de código enviado');
      
      const formData = new FormData();
      const codeInput = form.querySelector('input');
      const email = localStorage.getItem('registerEmail');
      
      console.log('Datos a enviar:', {
          code: codeInput?.value,
          email: email
      });
      
      formData.append('code', codeInput?.value || '');
      formData.append('email', email || '');
      
      try {
          console.log('Iniciando fetch a verificar.php');
          const response = await fetch('verificar.php', {
              method: 'POST',
              body: formData
          });
          
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
          
          if (data.success) {
              localStorage.removeItem('registerEmail');
              alert(data.message);
              window.location.href = 'inicio.html';
          } else {
              alert(data.message);
          }
      } catch (error) {
          console.error('Error completo:', error);
          alert('Error al procesar la solicitud: ' + error.message);
      }
  });
});