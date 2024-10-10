document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login');
  const messageDiv = document.getElementById('message');
  const userDataDiv = document.getElementById('userData');

  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(loginForm);

      fetch('login.php', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              messageDiv.textContent = data.message;
              fetchUserData(data.userId);
          } else {
              messageDiv.textContent = data.message;
          }
      })
      .catch(error => {
          console.error('Error:', error);
          messageDiv.textContent = 'An error occurred during login.';
      });
  });

  function fetchUserData(userId) {
      // Simulating an API endpoint for fetching user data
      // In a real-world scenario, you'd have a separate PHP script to handle this request
      const mockUserData = {
          loginUsuario: 'john_doe',
          emailId: 'john@example.com'
      };

      // Simulating an API call with a delay
      setTimeout(() => {
          displayUserData(mockUserData);
      }, 500);
  }

  function displayUserData(userData) {
      userDataDiv.innerHTML = `
          <h3>User Data:</h3>
          <p>Username: ${userData.loginUsuario}</p>
          <p>Email: ${userData.emailId}</p>
      `;
  }
});
/*
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
event.preventDefault(); // Prevent default form submission   

// Add any necessary validation or processing here
window.location.href = 'inicio.html'; // Replace with the actual URL of your login page
});
*/