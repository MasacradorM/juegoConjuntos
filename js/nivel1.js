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
    simpleAttack: [
        {
            title: 'Pregunta de Golpe Simple 1',
            question: '¿Qué es la unión de dos conjuntos?',
            answers: {
                a: 'La combinación de todos los elementos de ambos conjuntos, sin repetir',
                b: 'El conjunto que contiene solo los elementos comunes a ambos conjuntos',
                c: 'El conjunto que contiene solo los elementos que no están en ninguno de los dos conjuntos',
                d: 'El conjunto vacío'
            },
            correctAnswer: 'a',
            correctDamage: 40,
            incorrectDamage: 40
        },
        {
            title: 'Pregunta de Golpe Simple 2',
            question: '¿Qué es la intersección de dos conjuntos?',
            answers: {
                a: 'El conjunto que contiene todos los elementos comunes de ambos conjuntos',
                b: 'El conjunto que contiene todos los elementos de ambos conjuntos',
                c: 'El conjunto que contiene los elementos de uno de los conjuntos pero no del otro',
                d: 'El conjunto vacío'
            },
            correctAnswer: 'a',
            correctDamage: 40,
            incorrectDamage: 40
        },
        {
            title: 'Pregunta de Golpe Simple 3',
            question: 'Si A = {1, 2, 3} y B = {3, 4, 5}, ¿cuál es la intersección A ∩ B?',
            answers: {
                a: '{3}',
                b: '{1, 2, 3, 4, 5}',
                c: '{2, 4}',
                d: '{1, 5}'
            },
            correctAnswer: 'a',
            correctDamage: 40,
            incorrectDamage: 40
        },
        {
            title: 'Pregunta de Golpe Simple 4',
            question: 'Si A = {a, b, c} y B = {c, d, e}, ¿cuál es la diferencia A - B?',
            answers: {
                a: '{a, b}',
                b: '{c, d}',
                c: '{a, b, c, d, e}',
                d: '{c}'
            },
            correctAnswer: 'a',
            correctDamage: 40,
            incorrectDamage: 40
        },
        {
            title: 'Pregunta de Golpe Simple 5',
            question: 'Si A = {1, 2, 3} y B = {3, 4, 5}, ¿cuál es la unión A ∪ B?',
            answers: {
                a: '{1, 2, 3, 4, 5}',
                b: '{1, 2, 3}',
                c: '{3, 4, 5}',
                d: '{2, 3}'
            },
            correctAnswer: 'a',
            correctDamage: 40,
            incorrectDamage: 40
        },
        {
            title: 'Pregunta de Golpe Simple 6',
            question: '¿Qué es la diferencia de dos conjuntos A - B?',
            answers: {
                a: 'El conjunto que contiene los elementos de A que no están en B',
                b: 'El conjunto de todos los elementos de A y B',
                c: 'El conjunto de los elementos comunes entre A y B',
                d: 'El conjunto vacío'
            },
            correctAnswer: 'a',
            correctDamage: 40,
            incorrectDamage: 40
        },
        {
            title: 'Pregunta de Golpe Simple 7',
            question: 'Si A = {1, 2, 3} y B = {4, 5}, ¿cuál es la intersección A ∩ B?',
            answers: {
                a: '{}',
                b: '{1, 2, 3}',
                c: '{4, 5}',
                d: '{1, 2, 3, 4, 5}'
            },
            correctAnswer: 'a',
            correctDamage: 40,
            incorrectDamage: 40
        },
        {
            title: 'Pregunta de Golpe Simple 8',
            question: 'Si A = {x, y} y B = {y, z}, ¿cuál es la unión A ∪ B?',
            answers: {
                a: '{x, y, z}',
                b: '{x, y}',
                c: '{y, z}',
                d: '{x, z}'
            },
            correctAnswer: 'a',
            correctDamage: 40,
            incorrectDamage: 40
        },
        {
            title: 'Pregunta de Golpe Simple 9',
            question: '¿Cuál es el conjunto vacío?',
            answers: {
                a: '{}',
                b: '{0}',
                c: '{null}',
                d: 'No existe'
            },
            correctAnswer: 'a',
            correctDamage: 40,
            incorrectDamage: 40
        },
        {
            title: 'Pregunta de Golpe Simple 10',
            question: 'Si A = {1, 2} y B = {2, 3}, ¿cuál es la diferencia B - A?',
            answers: {
                a: '{3}',
                b: '{1}',
                c: '{2}',
                d: '{1, 2}'
            },
            correctAnswer: 'a',
            correctDamage: 40,
            incorrectDamage: 40
        }
    ],
    
    powerAttack: [
        {
            title: 'Pregunta de Golpe de Poder 1',
            question: 'Si A = {a, b, c} y B = {b, c, d}, ¿cuál es A ∩ B (intersección de A y B)?',
            answers: {
                a: '{a, b, c, d}',
                b: '{b, c}',
                c: '{a, d}',
                d: '{}'
            },
            correctAnswer: 'b',
            correctDamage: 70,
            incorrectDamage: 70
        },
        {
            title: 'Pregunta de Golpe de Poder 2',
            question: 'Si A = {1, 2, 3, 4} y B = {3, 4, 5, 6}, ¿cuál es A ∪ B (unión de A y B)?',
            answers: {
                a: '{1, 2, 3, 4, 5, 6}',
                b: '{3, 4}',
                c: '{1, 2, 3, 4, 5}',
                d: '{1, 2, 4, 5, 6}'
            },
            correctAnswer: 'a',
            correctDamage: 70,
            incorrectDamage: 70
        },
        {
            title: 'Pregunta de Golpe de Poder 3',
            question: 'Si A = {x, y, z} y B = {y, z, w}, ¿cuál es A - B (diferencia de A y B)?',
            answers: {
                a: '{x}',
                b: '{y, z}',
                c: '{x, w}',
                d: '{w}'
            },
            correctAnswer: 'a',
            correctDamage: 70,
            incorrectDamage: 70
        },
        {
            title: 'Pregunta de Golpe de Poder 4',
            question: 'Si A = {1, 2, 3} y B = {2, 3, 4}, ¿cuál es A ∆ B (diferencia simétrica de A y B)?',
            answers: {
                a: '{1, 4}',
                b: '{2, 3}',
                c: '{1, 2, 3, 4}',
                d: '{}'
            },
            correctAnswer: 'a',
            correctDamage: 70,
            incorrectDamage: 70
        },
        {
            title: 'Pregunta de Golpe de Poder 5',
            question: 'Si A = {a, b, c} y B = {c, d, e}, ¿cuál es la intersección A ∩ B?',
            answers: {
                a: '{c}',
                b: '{a, b}',
                c: '{a, b, c}',
                d: '{d, e}'
            },
            correctAnswer: 'a',
            correctDamage: 70,
            incorrectDamage: 70
        },
        {
            title: 'Pregunta de Golpe de Poder 6',
            question: 'Si A = {1, 2, 3} y B = {1, 2, 3}, ¿cuál es la diferencia A - B?',
            answers: {
                a: '{}',
                b: '{1, 2, 3}',
                c: '{1}',
                d: '{3}'
            },
            correctAnswer: 'a',
            correctDamage: 70,
            incorrectDamage: 70
        },
        {
            title: 'Pregunta de Golpe de Poder 7',
            question: 'Si A = {1, 2, 3} y B = {2, 3, 4}, ¿cuál es la unión A ∪ B?',
            answers: {
                a: '{1, 2, 3, 4}',
                b: '{2, 3}',
                c: '{1, 4}',
                d: '{1, 2}'
            },
            correctAnswer: 'a',
            correctDamage: 70,
            incorrectDamage: 70
        },
        {
            title: 'Pregunta de Golpe de Poder 8',
            question: 'Si A = {x, y, z} y B = {y, z, w}, ¿cuál es la diferencia simétrica A ∆ B?',
            answers: {
                a: '{x, w}',
                b: '{y, z}',
                c: '{x, y, z, w}',
                d: '{x, y, z}'
            },
            correctAnswer: 'a',
            correctDamage: 70,
            incorrectDamage: 70
        },
        {
            title: 'Pregunta de Golpe de Poder 9',
            question: 'Si A = {2, 4, 6} y B = {1, 2, 3}, ¿cuál es la intersección A ∩ B?',
            answers: {
                a: '{2}',
                b: '{1, 2, 3}',
                c: '{2, 4, 6}',
                d: '{}'
            },
            correctAnswer: 'a',
            correctDamage: 70,
            incorrectDamage: 70
        },
        {
            title: 'Pregunta de Golpe de Poder 10',
            question: 'Si A = {p, q, r} y B = {r, s, t}, ¿cuál es A ∪ B?',
            answers: {
                a: '{p, q, r, s, t}',
                b: '{r, s}',
                c: '{p, q, r}',
                d: '{q, r}'
            },
            correctAnswer: 'a',
            correctDamage: 70,
            incorrectDamage: 70
        }
    ]
};

function getRandomQuestion(attackType) {
    const questionsList = questions[attackType];
    const randomIndex = Math.floor(Math.random() * questionsList.length);
    return questionsList[randomIndex];
}

function openModal(attackType) {
    currentHabilidad = getRandomQuestion(attackType);
    document.getElementById('modal-title').textContent = currentHabilidad.title;
    document.getElementById('modal-question').textContent = currentHabilidad.question;
    document.getElementById('label-a').textContent = currentHabilidad.answers.a;
    document.getElementById('label-b').textContent = currentHabilidad.answers.b;
    document.getElementById('label-c').textContent = currentHabilidad.answers.c;
    document.getElementById('label-d').textContent = currentHabilidad.answers.d;
    document.getElementById('myModal').style.display = 'block';
}

function updateHealthBars() {
    document.getElementById('pirata-health-text').textContent = playerHealth + '%';
    document.getElementById('jefe-health-text').textContent = bossHealth + '%';
    document.getElementById('pirata-health').style.width = playerHealth + '%';
    document.getElementById('jefe-health').style.width = bossHealth + '%';
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
            // Mostrar el modal de victoria
            showVictoryModal();
        }, 1000);
    } else if (bossHealth <= 0) {
        switchToNextPirate();
    }
}

function showVictoryModal() {
    const victoryModal = document.getElementById('victoryModal');
    victoryModal.style.display = 'block';

    const nextLevelButton = document.getElementById('nextLevelButton');
    nextLevelButton.onclick = function() {
        // Redirigir al nivel 2 directamente sin mostrar la alerta de pirata
        window.location.href = 'Nivel2.html';
        victoryModal.style.display = 'none';
    };
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
    // Mostrar el modal de fin de juego
    const gameOverModal = document.getElementById('gameOverModal');
    gameOverModal.style.display = 'block';

    // Manejar el botón de reintentar
    const retryButton = document.getElementById('retryButton');
    retryButton.onclick = function() {
        gameOverModal.style.display = 'none';
        restartGame();  // Llamar a una función para reiniciar el nivel
    };

    // Manejar el botón de volver al mapa
    const backToMapButton = document.getElementById('backToMapButton');
    backToMapButton.onclick = function() {
        gameOverModal.style.display = 'none';
        window.location.href = 'mapa.html';  // Redirigir al mapa o página principal
    };
}

// Función para reiniciar el juego (restablecer valores y recargar el nivel)
function restartGame() {
    // Reiniciar las variables del juego
    bossHealth = 100; // Salud del jefe
    playerHealth = 300; // Salud del jugador (los piratas comienzan con 100 de salud cada uno)
    timeInSeconds = timeInMinutes * 60; // Resetear el tiempo al valor inicial (5 minutos)
    currentPirateIndex = 0; // Volver al primer pirata
    updateHealthBars(); // Actualizar las barras de salud

    // Resetear la apariencia del pirata
    const pirataDiv = document.getElementById("pirata");
    pirataDiv.classList.remove('pirata1', 'pirata2', 'pirata3');
    pirataDiv.classList.add(pirates[0].name); // Restablecer al primer pirata

    // Restablecer la salud de los piratas
    pirates.forEach(pirata => {
        pirata.health = 100; // Cada pirata comienza con 100 de salud
    });

    // Reiniciar el cronómetro
    clearInterval(interval); // Limpiar cualquier intervalo anterior
    startTimer(); // Iniciar el cronómetro nuevamente

    // Si necesitas resetear algún otro aspecto, como el progreso, lo haces aquí
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
var modal = document.getElementById("preguntas");

// Obtener el botón que abre el modal
var btn = document.getElementById("myBtn");

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario haga clic en el botón, se abre el modal
btn.onclick = function() {
    modal.style.display = "block";
}

// Cuando el usuario haga clic en <span> (x), se cierra el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario haga clic en cualquier parte fuera del modal, se cierra
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}