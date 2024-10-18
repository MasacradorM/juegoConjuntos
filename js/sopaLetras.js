// script.js
const words = ["GATO", "PERRO", "CASA", "SOL", "LUNA"];
const gridElement = document.getElementById("grid");
const wordListElement = document.getElementById("word-list");

// Generar la cuadrícula de letras y palabras
const gridSize = 10;
let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));

// Añadir palabras en posiciones aleatorias en la cuadrícula
words.forEach(word => {
    let placed = false;
    while (!placed) {
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);
        let direction = Math.random() > 0.5 ? "horizontal" : "vertical";
        
        if (direction === "horizontal" && col + word.length <= gridSize) {
            for (let i = 0; i < word.length; i++) {
                grid[row][col + i] = word[i];
            }
            placed = true;
        } else if (direction === "vertical" && row + word.length <= gridSize) {
            for (let i = 0; i < word.length; i++) {
                grid[row + i][col] = word[i];
            }
            placed = true;
        }
    }
});

// Completar la cuadrícula con letras aleatorias
for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        if (grid[row][col] === '') {
            grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
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

// Mostrar la lista de palabras a encontrar
words.forEach(word => {
    const wordItem = document.createElement("li");
    wordItem.textContent = word;
    wordListElement.appendChild(wordItem);
});

// Lógica de selección de palabras
let selectedCells = [];
gridElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
        e.target.classList.toggle("selected");
        
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        
        selectedCells.push(grid[row][col]);
        
        // Si la selección actual forma una palabra, se marca como encontrada
        const selectedWord = selectedCells.join("");
        if (words.includes(selectedWord)) {
            alert("¡Encontraste la palabra: " + selectedWord + "!");
            
            // Selecciona todos los elementos <li> dentro de #word-list
            const items = document.querySelectorAll('#word-list li');
            
            // Itera sobre cada elemento <li>
            items.forEach(item => {
                // Comprueba si el texto del elemento contiene selectedWord
                if (item.textContent.includes(selectedWord)) {
                    // Aplica el estilo de tachado
                    item.style.textDecoration = "line-through";
                }
            });
        }
    }
});