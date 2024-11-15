let spinning = false;
let preguntaTimeout = null;
let preguntaTiempoRestante = 20;

function girarRuleta() {
  if (spinning) return;
  spinning = true;

  const ruleta = document.getElementById("ruleta");
  const rotacion = Math.floor(Math.random() * 7200) + 3600; // Rotación aleatoria entre 3600 y 10800 grados
  ruleta.style.transform = `rotate(${rotacion}deg)`;

  // Deshabilitar el botón mientras gira la ruleta
  document.getElementById("btnGirar").disabled = true;

  // Cuando la ruleta deje de girar (3 segundos), se habilita nuevamente el botón
  setTimeout(() => {
    spinning = false;
    document.getElementById("btnGirar").disabled = false;

    // Esperar 2 segundos después de que termine el giro y luego mostrar el modal
    setTimeout(() => {
      mostrarModal();
    }, 2000); // 2 segundos de espera
  }, 3000); // Tiempo para girar la ruleta (3 segundos)
}

function mostrarModal() {
  // Mostrar el modal
  const modal = document.getElementById("modal");
  modal.style.display = "flex";

  // Iniciar el temporizador de la pregunta
  iniciarTemporizadorPregunta();
}
function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Función para responder
document.getElementById("btnResponder").addEventListener("click", () => {
  alert("¡Has respondido la pregunta!");
  cerrarModal();
});
let timeInMinutes = 1; // Duración del contador en minutos
let timeInSeconds = timeInMinutes * 60; // Convierte minutos a segundos

const timerElement = document.getElementById('timer');

function startTimer() {
    const interval = setInterval(() => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;

        // Formatear el tiempo con dos dígitos
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerElement.textContent = formattedTime;

        if (timeInSeconds <= 0) {
            clearInterval(interval);
            handleGameOver(); // Llama a la función para manejar el final del juego
        }

        timeInSeconds--;
    }, 1000); // Actualiza cada segundo
}

function handleGameOver() {
    // Reiniciar el juego o redirigir al jugador
    alert("¡Se acabó el tiempo! Fin del juego.");
    // Aquí puedes agregar lógica adicional para reiniciar el juego o volver al menú principal
}

// Iniciar el contador cuando la página se carga
window.onload = startTimer;
