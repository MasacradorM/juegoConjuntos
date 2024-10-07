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

    if (selectedAnswer.value === currentHabilidad.correctAnswer) {
        resultElement.textContent = "¡Correcto!";
      playerHealth -= currentHabilidad.correctDamage; // Daño al jefe
    } else {
        resultElement.textContent = `Incorrecto. La respuesta correcta era: ${currentHabilidad.answers[currentHabilidad.correctAnswer]}`;
      bossHealth-= currentHabilidad.incorrectDamage; // Daño al jugador
    }

    updateHealthBars();
    closeModal();

    if (playerHealth <= 0) {
        alert("¡Has derrotado al jefe!");
    } else if (bossHealth <= 0) {
        alert("Has sido derrotado por el jefe.");
    }
}

// Inicializar las barras de salud al cargar la página
updateHealthBars();
