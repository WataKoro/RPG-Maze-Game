let enemies = [];
let enemyPositions = {};  // This will store the positions of enemies
// Load enemy images
const enemyImage = new Image();

enemyImage.src = 'images/weakEnemy.png';  // Replace with the path to your weak enemy image

const enemyTypes = {
  "weakEnemy": {
    health: 30,
    attackDamage: 10,
    xpReward: 20
  }
};

  
// Function to check if the tile contains an enemy
function isEnemyAt(x, y) {
  return enemies.some(enemy => enemy.x === x && enemy.y === y && !enemy.defeated);
}

// Check if player encounters an enemy
function encounterEnemy() {
  enemies.forEach(enemy => {
    if (!enemy.defeated && enemy.x === player.x && enemy.y === player.y) {
      alert(`Musuh menyerang! Kamu kehilangan ${enemy.attackDamage} health.`);
      player.health -= enemy.attackDamage;
      updateStatsUI();

      if (player.health <= 0) {
        alert("You have been defeated!");
        resetGame();
      } else {
        enemy.health -= 50;  // Assume player hits the enemy back with a fixed damage
        if (enemy.health <= 0) {
          alert("Kamu mengalahkan musuh! Kamu mendapatkan " + enemy.xpReward + " XP.");
          earnXP(enemy.xpReward);
          enemy.defeated = true;  // Mark enemy as defeated
        }
      }
    }
  });
}
