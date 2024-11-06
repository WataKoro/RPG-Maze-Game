// Attach all required variables to window
window.tileSize = 40;
window.canvas = document.getElementById('gameCanvas');
window.ctx = canvas.getContext('2d');
window.numRows = canvas.height / tileSize;
window.numCols = canvas.width / tileSize;

// Load the player image
const playerImage = new Image();
playerImage.src = 'images/player.png';  // Path to your player image

let player = {
  x: 1,
  y: 1,
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  maxHealth: 100,
  health: 100
};
  
// Function to earn XP and check for level up
function earnXP(amount) {
  player.xp += amount;
  if (player.xp >= player.xpToNextLevel) {
    levelUp();
  }
  updateStatsUI();  // Update the stats displayed in the UI
}

// Function to level up the player
function levelUp() {
  player.level++;
  player.xp -= player.xpToNextLevel;
  player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5);
  alert(`Level Up! Kamu level ${player.level}`);
  player.maxHealth += 20;  // Increase max health
  player.health = player.maxHealth;  // Fully restore health
}

// Function to update stats displayed in the UI (e.g., level, XP, health)
function updateStatsUI() {
  document.getElementById('playerHealth').innerText = player.health;
  document.getElementById('playerLevel').innerText = player.level;
  document.getElementById('playerXP').innerText = player.xp;
  document.getElementById('playerXPNext').innerText = player.xpToNextLevel;
}

// Update UI initially
updateStatsUI();
  
  // Function to move the player forward
function moveForward() {
  let newY = player.y - 1;
  
  // Check for walls or enemies
  if (newY >= 0 && (maze[newY][player.x] !== 1 || isEnemyAt(player.x, newY))) {
    player.y = newY;
    drawGame();
    collectItem(player.x, player.y);
    encounterEnemy(); // Check for enemies after movement
  }
}

// Function to move the player backward
function moveBackward() {
  let newY = player.y + 1;
  
  // Check for walls or enemies
  if (newY < numRows && (maze[newY][player.x] !== 1 || isEnemyAt(player.x, newY))) {
    player.y = newY;
    drawGame();
    collectItem(player.x, player.y);
    encounterEnemy(); // Check for enemies after movement
  }
}

// Function to turn left
function turnLeft() {
  let newX = player.x - 1;
  
  // Check for walls or enemies
  if (newX >= 0 && (maze[player.y][newX] !== 1 || isEnemyAt(newX, player.y))) {
    player.x = newX;
    drawGame();
    collectItem(player.x, player.y);
    encounterEnemy(); // Check for enemies after movement
  }
}

// Function to turn right
function turnRight() {
  let newX = player.x + 1;
  
  // Check for walls or enemies
  if (newX < numCols && (maze[player.y][newX] !== 1 || isEnemyAt(newX, player.y))) {
    player.x = newX;
    drawGame();
    collectItem(player.x, player.y);
    encounterEnemy(); // Check for enemies after movement
  }
}

function finishGame() {
  checkAllEnemiesDefeated();
  if (finishGameAllowed) {
    alert("Selamat! Kamu telah menyelesaikan game ini!");
    winGame();
  } else {
    alert("Belum bisa! kalahkan semua musuh di level 3 dulu.");
  }
}

function nextLevel() {
  switchToLevel(currentLevel + 1);
}

// Developer command to instantly kill all enemies
function killAllEnemies() {
  enemies.forEach(enemy => {
    enemy.defeated = true;
  });
  console.log("Semua musuh kalah!");

  drawGame();
  updateGameState();
}