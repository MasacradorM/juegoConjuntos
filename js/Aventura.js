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

  // Detener la animación y redirigir al terminar
  if (currentTextIndex >= texts.length) {
    clearInterval(intervalId);
    // Redirigir a la página "mapa.html" después de un retraso de 10 segundos
    setTimeout(() => {
      window.location.href = 'mapa.html';
    }, 5000); // Esperar 10 segundos antes de redirigir
  }
}

// Iniciar la animación automáticamente al cargar la página
window.onload = function() {
  intervalId = setInterval(changeText, 4000);
};