// Palabras relacionadas con teoría de conjuntos y sus definiciones
const wordsAndDefinitions = {
    "UNION": "Operación que combina elementos de dos conjuntos",
    "CONJUNTO": "Colección de elementos bien definidos",
    "ELEMENTO": "Miembro de un conjunto",
    "VACIO": "Conjunto sin elementos, simbolizado como ∅",
    "FINITO": "Conjunto con número limitado de elementos",
    "CARDINAL": "Número de elementos en un conjunto",
    "UNITARIO": "Conjunto que contiene un único elemento"
};

const words = Object.keys(wordsAndDefinitions);
const gridElement = document.getElementById("grid");
const wordListElement = document.getElementById("word-list");

// Cambiar el tamaño de la cuadrícula a 10x10
const gridSize = 10; 
let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));

// Función para verificar si una palabra puede ser colocada en una posición
function canPlaceWord(word, row, col, direction) {
    if (direction === "horizontal" && col + word.length > gridSize) return false;
    if (direction === "vertical" && row + word.length > gridSize) return false;
    if (direction === "diagonal" && (row + word.length > gridSize || col + word.length > gridSize)) return false;

    for (let i = 0; i < word.length; i++) {
        let currentRow = row;
        let currentCol = col;

        if (direction === "horizontal") {
            currentCol += i;
        } else if (direction === "vertical") {
            currentRow += i;
        } else if (direction === "diagonal") {
            currentRow += i;
            currentCol += i;
        }

        if (grid[currentRow][currentCol] !== '' && 
            grid[currentRow][currentCol] !== word[i]) {
            return false;
        }
    }
    return true;
}

// Añadir palabras en posiciones aleatorias en la cuadrícula
words.forEach(word => {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);
        let direction = Math.random() > 0.67 ? "horizontal" : (Math.random() > 0.5 ? "vertical" : "diagonal");

        if (canPlaceWord(word, row, col, direction)) {
            for (let i = 0; i < word.length; i++) {
                if (direction === "horizontal") {
                    grid[row][col + i] = word[i];
                } else if (direction === "vertical") {
                    grid[row + i][col] = word[i];
                } else if (direction === "diagonal") {
                    grid[row + i][col + i] = word[i];
                }
            }
            placed = true;
        }
        attempts++;
    }
});

// Caracteres especiales de teoría de conjuntos
const setTheoryChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Completar la cuadrícula con letras aleatorias y símbolos de teoría de conjuntos
for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        if (grid[row][col] === '') {
            grid[row][col] = setTheoryChars[Math.floor(Math.random() * setTheoryChars.length)];
        }
    }
}

// Renderizar la cuadrícula en HTML
grid.forEach((row, rowIndex) => {
    row.forEach((letter, colIndex) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = letter;
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;
        gridElement.appendChild(cell);
    });
});

// Mostrar la lista de palabras a encontrar con sus definiciones
words.forEach(word => {
    const wordItem = document.createElement("li");
    wordItem.innerHTML = `<strong>${word}</strong>: ${wordsAndDefinitions[word]}`;
    wordListElement.appendChild(wordItem);
});

// Variables para el tracking de la selección
let isSelecting = false;
let selectedCells = [];
let startCell = null;
let currentWord = '';
let foundWords = new Set();

// Lógica de selección de palabras mejorada
gridElement.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("cell")) {
        isSelecting = true;
        startCell = e.target;
        currentWord = '';
        selectedCells = [];
        
        // Limpiar selecciones previas que no resultaron en palabra
        document.querySelectorAll('.cell.selected:not(.found)').forEach(cell => {
            cell.classList.remove('selected');
        });
        
        selectedCells.push(e.target);
        e.target.classList.add("selected");
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        currentWord = grid[row][col];
    }
});

gridElement.addEventListener("mouseover", (e) => {
    if (isSelecting && e.target.classList.contains("cell")) {
        const currentRow = parseInt(e.target.dataset.row);
        const currentCol = parseInt(e.target.dataset.col);
        const startRow = parseInt(startCell.dataset.row);
        const startCol = parseInt(startCell.dataset.col);

        // Permitir solo selección en línea recta (horizontal, vertical o diagonal)
        if (currentRow === startRow || currentCol === startCol || 
            (currentRow - startRow === currentCol - startCol)) {
            if (!selectedCells.includes(e.target)) {
                selectedCells.push(e.target);
                e.target.classList.add("selected");
                currentWord = selectedCells
                    .map(cell => grid[parseInt(cell.dataset.row)][parseInt(cell.dataset.col)]).join('');
            }
        }
    }
});

document.addEventListener("mouseup", () => {
    if (isSelecting) {
        isSelecting = false;
        
        // Verificar si la palabra seleccionada está en la lista
        if (words.includes(currentWord) && !foundWords.has(currentWord)) {
            foundWords.add(currentWord);
            
            // Marcar las celdas como encontradas
            selectedCells.forEach(cell => {
                cell.classList.add("found");
            });
            
            // Marcar la palabra en la lista
            const items = document.querySelectorAll('#word-list li');
            items.forEach(item => {
                if (item.textContent.includes(currentWord)) {
                    item.classList.add('found');
                }
            });

            // Mostrar la definición al encontrar la palabra
            alert(`¡Correcto! ${currentWord}: ${wordsAndDefinitions[currentWord]}`);

            // Verificar si se han encontrado todas las palabras
            if (foundWords.size === words.length) {
                setTimeout(() => {
                    alert("¡Felicitaciones! Has encontrado todas las palabras.");
                }, 500);
            }
        } else {
            // Limpiar selección si no es una palabra válida
            selectedCells.forEach(cell => {
                if (!cell.classList.contains("found")) {
                    cell.classList.remove('selected');
                }
            });
        }
        
        selectedCells = [];
        currentWord = '';
    }
});