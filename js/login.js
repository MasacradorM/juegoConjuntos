const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission   

  // Add any necessary validation or processing here
  window.location.href = 'inicio.html'; // Replace with the actual URL of your login page
});