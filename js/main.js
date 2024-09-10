document.addEventListener('DOMContentLoaded', (event) => {
    const backgroundMusic = document.getElementById('backgroundMusic');
  
    // Start playing the music
    backgroundMusic.play();
  
    // Optionally set volume (0.0 to 1.0)
    backgroundMusic.volume = 0.2;  // Set volume to 50%
  });
  
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 40;

drawGame();
updateStatsUI();
