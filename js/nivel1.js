let playerHealth = 100;
let bossHealth = 100;
let currentHabilidad = null;

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
        correctDamage: 20,  // Daño al jefe
        incorrectDamage: 20 // Daño al jugador
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
        correctDamage: 40,  // Daño al jefe
        incorrectDamage: 40 // Daño al jugador
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
        playerHealth = Math.max(0, bossHealth - damage);
        resultElement.textContent = "¡Correcto!";
    } else {
        bossHealth= Math.max(0, playerHealth - damage);
        resultElement.textContent = `Incorrecto. La respuesta correcta era: ${currentHabilidad.answers[currentHabilidad.correctAnswer]}`;
    }

    updateHealthBars();
    closeModal();
    showAttackScreen(isCorrect, damage);

    if (bossHealth <= 0) {
        setTimeout(() => alert("¡Has derrotado al jefe!"), 1000);
    } else if (playerHealth <= 0) {
        setTimeout(() => alert("Has sido derrotado por el jefe."), 1000);
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
        attackMessage.textContent = `Perdiste ${damage} puntos de vida.`;
    }

    attackScreen.style.display = 'block';
}

function closeAttackScreen() {
    document.getElementById('attackScreen').style.display = 'none';
}

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
}