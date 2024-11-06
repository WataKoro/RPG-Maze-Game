let inventory = [];
let itemPositions = {};  // This will store the positions of the items

// const healthPotionImage = new Image();
// const keyImage = new Image();
const itemImages = {
  "healthPotion": "images/healthPotion.png",  // Add image paths for items
  "key": "images/key.png"
};

const itemImageObjects = {};
for (let [key, src] of Object.entries(itemImages)) {
  itemImageObjects[key] = new Image();
  itemImageObjects[key].src = src;
}

// healthPotionImage.src = itemImages["healthPotion"];

// keyImage.src = itemImages["key"];

const items = {
  "healthPotion": {
    color: "green",  // Health potion color
    effect: function() {
      alert("kamu menemukan health potion! Health pulih.");
      player.health = Math.min(player.maxHealth, player.health + 50);
      updateStatsUI();
    }
  },
  "key": {
    color: "gold",  // Key color
    effect: function() {
      if (currentLevel === 3) {
        // Trigger the win condition if in Level 3
        alert("You found the key in Level 3! You win the game!");
        winGame();  // Trigger win game function
      } else {
        alert("Kamu menemukan key! lanjut ke level 2.");
        inventory.push("key");
        switchToLevel(currentLevel + 1);  // Switch to next level when the key is collected
      }
    }
  }
};

// Function to collect items when player reaches an item's position
function collectItem(x, y) {
  let pos = `${x}-${y}`;  // Create a unique identifier for the position
  if (itemPositions[pos]) {
    items[itemPositions[pos]].effect();  // Trigger the item's effect
    delete itemPositions[pos];  // Remove the item from the maze immediately
    drawGame();  // Redraw the game after the item is collected and removed
  }
}
