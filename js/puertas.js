function activateGif(element, gifUrl, redirectUrl) {
    element.style.backgroundImage = `url('${gifUrl}')`; // Activa el GIF
  
    // Redirige después de 3 segundos
    setTimeout(() => {
      window.location.href = redirectUrl; // Redirige
    }, 3000);
  }
  
  // Selecciona los elementos de cada clase
  const puerta1 = document.querySelector('.puerta1');
  const puerta2 = document.querySelector('.puerta2');
  const puerta3 = document.querySelector('.puerta'); // Asume que este es el tercer enlace
  
  // Agrega eventos de clic
  puerta1.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace navegue inmediatamente
    activateGif(puerta1, 'gif/abrete.gif', 'Aventura.html'); // Activa el GIF y redirige
  });
  
  puerta2.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace navegue inmediatamente
    activateGif(puerta2, 'gif/abrete.gif', 'letrero.html'); // Activa el GIF y redirige
  });
  
  puerta3.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace navegue inmediatamente
    activateGif(puerta3, 'gif/abrete.gif', 'sopaLetras.html'); // Cambia a la página que necesites
  });