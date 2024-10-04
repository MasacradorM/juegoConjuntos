const texts = [
    "Tendremos que recorrer toda la isla en busca de nuestro tesoro",
    "La isla está llena de peligros, así que ten cuidado",
    "¿Qué pistas nos llevarán al tesoro?",
    "Quizá necesitaremos hablar con los lugareños",
    "El mapa podría tener pistas ocultas"
  ];

  let currentTextIndex = 0;

  function changeText() {
    const textElement = document.getElementById("text");
    textElement.textContent = texts[currentTextIndex];
    currentTextIndex = (currentTextIndex + 1) % texts.length;
  }

  setInterval(changeText, 2000); 