let bossHealth = 100; // Salud inicial del jefe
let playerHealth = 300; // Salud inicial de cada pirata (100 por pirata)
let currentHabilidad = null;

let pirates = [
    { name: 'pirata1', health: 100 },
    { name: 'pirata2', health: 100 },
    { name: 'pirata3', health: 100 }
];
let currentPirateIndex = 0;

const questions = {
    1: {
        title: 'Pregunta 1',
        question: 'Si A = {1, 2, 3, 4} y B = {3, 4, 5, 6}, ¿cuál es el conjunto A ∪ B (unión de A y B)?',
        answers: {
            a: '{1, 2, 3, 4, 5, 6}',
            b: '{3, 4}',
            c: '{1, 2, 3, 4, 3, 4, 5, 6}',
            d: '{1, 2, 5, 6}'
        },
        correctAnswer: 'a',
        correctDamage: 40, // Daño correcto al jefe
        incorrectDamage: 40 // Daño incorrecto al jugador
    },
    2: {
        title: 'Pregunta 2',
        question: '¿Cuál es el valor de la integral de 2x dx desde 0 hasta 2?',
        answers: {
            a: '4',
            b: '8',
            c: '2',
            d: '16'
        },
        correctAnswer: 'b',
        correctDamage: 70, // Daño correcto al jefe
        incorrectDamage: 70 // Daño incorrecto al jugador
    }
};

function updateHealthBars() {
    document.getElementById('pirata-health-text').textContent = playerHealth + '%';
    document.getElementById('jefe-health-text').textContent = bossHealth + '%';
    document.getElementById('pirata-health').style.width = playerHealth + '%';
    document.getElementById('jefe-health').style.width = bossHealth + '%';
}

function openModal(habilidad) {
    currentHabilidad = questions[habilidad];
    document.getElementById('modal-title').textContent = currentHabilidad.title;
    document.getElementById('modal-question').textContent = currentHabilidad.question;
    document.getElementById('label-a').textContent = currentHabilidad.answers.a;
    document.getElementById('label-b').textContent = currentHabilidad.answers.b;
    document.getElementById('label-c').textContent = currentHabilidad.answers.c;
    document.getElementById('label-d').textContent = currentHabilidad.answers.d;
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const resultElement = document.getElementById('result');

    if (!selectedAnswer) {
        resultElement.textContent = "Por favor, selecciona una respuesta.";
        return;
    }

    let isCorrect = selectedAnswer.value === currentHabilidad.correctAnswer;
    let damage = isCorrect ? currentHabilidad.correctDamage : currentHabilidad.incorrectDamage;

    if (isCorrect) {
        // El jefe recibe daño
      playerHealth= Math.max(0, playerHealth- damage);
        resultElement.textContent = "¡Correcto!";
    } else {
        // El jugador recibe daño
     bossHealth= Math.max(0,bossHealth- damage);
        resultElement.textContent = "¡Incorrecto!";
    }

    updateHealthBars();
    closeModal();
    showAttackScreen(isCorrect, damage);

    // Verificar si alguien ha ganado o si el pirata actual ha muerto
    if (playerHealth <= 0) {
        setTimeout(() => {
            alert("¡Has sido derrotado! Fin del juego.");
            handleGameOver();
        }, 1000);
    } else if (bossHealth <= 0) {
        switchToNextPirate();
    }
}

function switchToNextPirate() {
    currentPirateIndex++;
    if (currentPirateIndex < pirates.length) {
        // Cambiar al siguiente pirata
        const nextPirate = pirates[currentPirateIndex];

        // Restablecer la salud del jugador a 100
        bossHealth = 100; 
        updateHealthBars(); // Actualizar las barras de salud
        bossHealth= nextPirate.health; 
        // Cambiar la apariencia del pirata
        const pirataDiv = document.getElementById("pirata");
        pirataDiv.classList.remove('pirata1', 'pirata2', 'pirata3');
        pirataDiv.classList.add(nextPirate.name);
        
        alert(`¡${pirates[currentPirateIndex - 1].name} ha caído! ${nextPirate.name} entra en batalla con toda su energía.`);
    } else {
        // Todos los piratas han muerto
        setTimeout(() => {
            alert("Fin del juego. Todos los piratas han sido derrotados.");
            handleGameOver();
        }, 1000);
    }
}

function showAttackScreen(isCorrect, damage) {
    const attackScreen = document.getElementById('attackScreen');
    const attackTitle = document.getElementById('attack-title');
    const attackMessage = document.getElementById('attack-message');

    if (isCorrect) {
        attackTitle.textContent = '¡Ataque Exitoso!';
        attackMessage.textContent = `Atacaste al Jefe y le quitaste ${damage} puntos de vida.`;
    } else {
        attackTitle.textContent = '¡Ataque Fallido!';
        attackMessage.textContent = `El Jefe te ha quitado ${damage} puntos de vida.`;
    }

    attackScreen.style.display = 'block';
}

function closeAttackScreen() {
    document.getElementById('attackScreen').style.display = 'none';
}

function openCharacterModal() {
    document.getElementById("characterModal").style.display = "block";
}

function closeCharacterModal() {
    document.getElementById("characterModal").style.display = "none";
}

function selectCharacter(character) {
    const pirataDiv = document.getElementById("pirata");
    pirataDiv.classList.remove('pirata1', 'pirata2', 'pirata3');
    pirataDiv.classList.add(character);
    closeCharacterModal();
}

let timeInMinutes = 5; // Duración del contador en minutos
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

// Inicializar las barras de salud al cargar la página
updateHealthBars();

// Event Listeners
window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        closeModal();
    }
    if (event.target == document.getElementById('attackScreen')) {
        closeAttackScreen();
    }
};
