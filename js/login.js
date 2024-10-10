document.getElementById('login').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  fetch('../librerias/baseDatos.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      //document.getElementById('resultado').innerText = data;
      window.location.href = 'inicio.html';
  })
  .catch(error => {
      console.error('Error:', error);
  });
});
/*
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission   

  // Add any necessary validation or processing here
  window.location.href = 'inicio.html'; // Replace with the actual URL of your login page
});
*/