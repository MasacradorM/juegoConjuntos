const texts = [
    "Tendremos que recorrer toda la isla en busca de nuestro tesoro",
    "La isla está llena de peligros, así que ten cuidado",
    "¿Qué pistas nos llevarán al tesoro?",
    "Quizá necesitaremos hablar con los lugareños",
    "El mapa podría tener pistas ocultas"
  ];
  
  let currentTextIndex = 0;
  let intervalId;
  
  function changeText() {
    const textElement = document.getElementById("text");
    textElement.textContent = texts[currentTextIndex];
    currentTextIndex++;
  
    // Detener la animación al llegar a la última frase
    if (currentTextIndex >= texts.length) {
      clearInterval(intervalId);
    }
  }
  
  // Iniciar la animación automáticamente al cargar la página
  window.onload = function() {
    intervalId = setInterval(changeText, 2000);
  };