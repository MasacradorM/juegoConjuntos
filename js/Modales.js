// Get modal elements
const inventoryModal = document.getElementById("inventoryModal");
const rankingModal = document.getElementById("rankingModal");
const statsModal = document.getElementById("statsModal");
const storeModal = document.getElementById("storeModal");
const multiplayerStatsModal = document.getElementById("multiplayerStatsModal");

// Get buttons
const inventoryBtn = document.getElementById("inventoryBtn");
const rankingBtn = document.getElementById("rankingBtn");
const statsBtn = document.getElementById("statsBtn");
const storeBtn = document.getElementById("storeBtn");
const openMultiplayerStats = document.getElementById("openMultiplayerStats");
const openSoloStats = document.getElementById("openSoloStats");

// Get close buttons
const closeInventory = document.getElementsByClassName("close-inventory")[0];
const closeRanking = document.getElementsByClassName("close-ranking")[0];
const closeStats = document.getElementsByClassName("close-stats")[0];
const closeStore = document.getElementsByClassName("close-store")[0];
const closeMultiplayer = document.getElementsByClassName("close-multiplayer")[0];

// Function to open modals with animation
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

// Open the multiplayer stats modal with animation and close stats modal
openMultiplayerStats.onclick = function() {
    statsModal.style.display = "none"; // Close the stats modal
    addModalAnimation(multiplayerStatsModal); // Open multiplayer stats modal
}

// Open the solo stats modal with animation and close multiplayer modal
openSoloStats.onclick = function() {
    multiplayerStatsModal.style.display = "none"; // Close the multiplayer modal
    addModalAnimation(statsModal); // Reopen the stats modal
}

// Close buttons for each modal
closeInventory.onclick = function() {
    inventoryModal.style.display = "none";
}

closeRanking.onclick = function() {
    rankingModal.style.display = "none";
}

closeStats.onclick = function() {
    statsModal.style.display = "none";
}

closeStore.onclick = function() {
    storeModal.style.display = "none";
}

closeMultiplayer.onclick = function() {
    multiplayerStatsModal.style.display = "none";
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
    if (event.target == multiplayerStatsModal) {
        multiplayerStatsModal.style.display = "none";
    }
}
