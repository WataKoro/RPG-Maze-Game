let currentLevel = 1; // Start with level 1
let maze = mazeLevel1; // Initialize maze to level 1
window.finishGameAllowed = false;
const levelGoals = {
  1: { x: 8, y: 4 }, // Example goal location for level 1
  2: { x: 8, y: 4 }  // Example goal location for level 2
};

// Function to handle the win condition
function winGame() {
  alert("Congratulations! You completed the game!");
  resetGame();  // Reset the game or trigger a new game/level as per your design
}

// Function to place items
function placeItems() {
  itemPositions = {};  // Reset items
  if (currentLevel < 3) {
    placeItem("key", "gold");
  }
  // Place a health potion in all levels
  placeItem("healthPotion", "green");
}

// Updated function to place a specific item at a random position
function placeItem(itemName, color) {
  let placed = false;
  while (!placed) {
    let x = Math.floor(Math.random() * numCols);
    let y = Math.floor(Math.random() * numRows);

    if (maze[y][x] === 0 && !itemPositions[`${x}-${y}`]) {
      itemPositions[`${x}-${y}`] = itemName;
      items[itemName].color = color;  // Set color for the item
      placed = true;
    }
  }
}

// Function to randomly place enemies on valid positions in the maze
function placeEnemies() {
  enemyPositions = {};  // Reset enemy positions
  enemies = [];  // Reset enemies array

  const enemyCount = currentLevel;  // Number of enemies based on the current level

  for (let i = 0; i < enemyCount; i++) {
    let placed = false;

    while (!placed) {
      let x = Math.floor(Math.random() * numCols);
      let y = Math.floor(Math.random() * numRows);

      // Only place enemy on an empty space (path, not wall)
      if (maze[y][x] === 0 && !enemyPositions[`${x}-${y}`]) {
        enemyPositions[`${x}-${y}`] = "weakEnemy";  // Use the single type of enemy
        enemies.push({ x, y, ...enemyTypes["weakEnemy"], defeated: false });
        placed = true;
      }
    }
  }
}

function defeatEnemy(enemy) {
  enemy.defeated = true;
}

function checkAllEnemiesDefeated() {
  const allDefeated = enemies.every(enemy => enemy.defeated);
  
  if (allDefeated && currentLevel === 3) {
    // Enable special command for finishing the game
    allowFinishGameCommand();
  }
}

function allowFinishGameCommand() {
  finishGameAllowed = true;
  alert("You have defeated all enemies! You can now use 'finishGame()' to end the game.");
}

function updateLevelUI() {
  document.getElementById('currentLevel').innerText = `Level: ${currentLevel}`;
}

// Switch to different levels
function switchToLevel(level) {
  currentLevel = level;
  
  if (level === 1) {
    maze = mazeLevel1;  // Level 1 layout
  } else if (level === 2) {
    maze = mazeLevel2;  // Level 2 layout
    removeKeyFromInventory(); 
  } else if (level === 3) {
    maze = mazeLevel3;  // Level 3 layout
    removeKeyFromInventory(); 
  }

  runCount = 0;
  // Reset player position and redraw
  player.x = 1;
  player.y = 1;
  updateLevelUI();
  placeItems();  // Re-place items for the new level
  placeEnemies();  // Re-place enemies for the new level
  drawGame();  // Redraw the game
}

// Check if player has the key
function hasKey() {
  return inventory.includes("key");
}

function removeKeyFromInventory() {
  const keyIndex = inventory.indexOf("key");
  if (keyIndex > -1) {
    inventory.splice(keyIndex, 1);  // Remove the key from inventory
  }
}

// Reset the game and set the maze based on current level
function resetGame() {
  alert("Game Over! Restarting...");
  currentLevel = 1;
  player.x = 1;
  player.y = 1;
  player.health = player.maxHealth;
  player.xp = 0;
  player.level = 1;
  inventory = []; // Clear inventory
  updateStatsUI();
  drawGame();
}

// Update maze based on current level
function getCurrentMaze() {
  return currentLevel === 1 ? mazeLevel1 : mazeLevel2;
}
  
  window.updateGameState = function() {
    collectItem(player.x, player.y);
    encounterEnemy();
  }
  
// Modify the drawing function to handle multiple levels
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (maze[row][col] === 1) {
        ctx.fillStyle = '#333';  // Wall color
      } else {
        ctx.fillStyle = '#eaeaea';  // Path color
      }
      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
  }

  // Draw the player
  ctx.drawImage(playerImage, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
  
  // Draw enemies dynamically
  enemies.forEach(enemy => {
    if (!enemy.defeated) {
      ctx.drawImage(enemyImage, enemy.x * tileSize, enemy.y * tileSize, tileSize, tileSize);
    }
  });

  // Draw items
  for (let pos in itemPositions) {
    let [x, y] = pos.split('-').map(Number);
    const itemType = itemPositions[pos];
    const itemImage = itemImageObjects[itemType];
    if (itemImage) {
      ctx.drawImage(itemImage, x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }

  // Check for encounters with enemies or items
  updateGameState();
}

placeItems();
placeEnemies();