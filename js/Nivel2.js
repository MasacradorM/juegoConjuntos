const playerHpFill = document.getElementById('player-hp-fill');
const enemyHpFill = document.getElementById('enemy-hp-fill');
const battleLog = document.getElementById('battle-log');
const gameOver = document.getElementById('game-over');
const gameOverMessage = document.getElementById('game-over-message');
const playAgainBtn = document.getElementById('play-again-btn');

let playerHp = 100;
let enemyHp = 100;
let isDefending = false;

function updateHp() {
    playerHpFill.style.width = `${playerHp}%`;
    enemyHpFill.style.width = `${enemyHp}%`;
}

function addLogMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    battleLog.insertBefore(p, battleLog.firstChild);
}

function endGame(message) {
    gameOverMessage.textContent = message;
    gameOver.style.display = 'flex';
}

function playerAttack() {
    const damage = Math.floor(Math.random() * 20) + 10;
    enemyHp = Math.max(0, enemyHp - damage);
    addLogMessage(`Ye dealt ${damage} damage to the scurvy dog!`);
    updateHp();

    if (enemyHp === 0) {
        endGame("Yarr! Ye've won the battle, matey!");
    } else {
        enemyTurn();
    }
}

function playerHeal() {
    const heal = Math.floor(Math.random() * 15) + 5;
    playerHp = Math.min(100, playerHp + heal);
    addLogMessage(`Ye patched yerself up for ${heal} HP!`);
    updateHp();
    enemyTurn();
}

function playerDefend() {
    isDefending = true;
    addLogMessage("Ye brace for the enemy's attack!");
    enemyTurn();
}

function playerFlee() {
    const fleeChance = Math.random();
    if (fleeChance > 0.5) {
        endGame("Ye successfully fled the battle, ye coward!");
    } else {
        addLogMessage("Ye couldn't escape!");
        enemyTurn();
    }
}

function enemyTurn() {
    const actions = ['attack', 'heal'];
    const action = actions[Math.floor(Math.random() * actions.length)];

    if (action === 'attack') {
        let damage = Math.floor(Math.random() * 15) + 5;
        if (isDefending) {
            damage = Math.floor(damage / 2);
            isDefending = false;
        }
        playerHp = Math.max(0, playerHp - damage);
        addLogMessage(`The bilge rat dealt ${damage} damage to ye!`);
    } else {
        const heal = Math.floor(Math.random() * 10) + 5;
        enemyHp = Math.min(100, enemyHp + heal);
        addLogMessage(`The scurvy dog healed for ${heal} HP!`);
    }

    updateHp();

    if (playerHp === 0) {
        endGame("Blimey! Ye've been defeated, ye landlubber!");
    }
}

playAgainBtn.addEventListener('click', () => {
    playerHp = 100;
    enemyHp = 100;
    updateHp();
    battleLog.innerHTML = '';
    gameOver.style.display = 'none';
    isDefending = false;
});