// Get modal elements
const inventoryModal = document.getElementById("inventoryModal");
const rankingModal = document.getElementById("rankingModal");
const statsModal = document.getElementById("statsModal");
const storeModal = document.getElementById("storeModal");

// Get buttons
const inventoryBtn = document.getElementById("inventoryBtn");
const rankingBtn = document.getElementById("rankingBtn");
const statsBtn = document.getElementById("statsBtn");
const storeBtn = document.getElementById("storeBtn");

// Get close buttons
const closeInventory = document.getElementsByClassName("close-inventory")[0];
const closeRanking = document.getElementsByClassName("close-ranking")[0];
const closeStats = document.getElementsByClassName("close-stats")[0];
const closeStore = document.getElementsByClassName("close-store")[0];

// Inventory Modal
inventoryBtn.onclick = function() {
    inventoryModal.style.display = "block";
}

closeInventory.onclick = function() {
    inventoryModal.style.display = "none";
}

// Ranking Modal
rankingBtn.onclick = function() {
    rankingModal.style.display = "block";
}

closeRanking.onclick = function() {
    rankingModal.style.display = "none";
}

// Statistics Modal
statsBtn.onclick = function() {
    statsModal.style.display = "block";
}

closeStats.onclick = function() {
    statsModal.style.display = "none";
}

// Store Modal
storeBtn.onclick = function() {
    storeModal.style.display = "block";
}

closeStore.onclick = function() {
    storeModal.style.display = "none";
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == inventoryModal) {
        inventoryModal.style.display = "none";
    }
    if (event.target == rankingModal) {
        rankingModal.style.display = "none";
    }
    if (event.target == statsModal) {
        statsModal.style.display = "none";
    }
    if (event.target == storeModal) {
        storeModal.style.display = "none";
    }
}

// Add animation when opening modals
function addModalAnimation(modal) {
    modal.style.opacity = "0";
    modal.style.display = "block";
    setTimeout(() => {
        modal.style.opacity = "1";
    }, 10);
}

// Update the click handlers to include animation
inventoryBtn.onclick = function() {
    addModalAnimation(inventoryModal);
}

rankingBtn.onclick = function() {
    addModalAnimation(rankingModal);
}

statsBtn.onclick = function() {
    addModalAnimation(statsModal);
}

storeBtn.onclick = function() {
    addModalAnimation(storeModal);
}