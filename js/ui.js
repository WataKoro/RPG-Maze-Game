function updateStatsUI() {
    document.getElementById('playerHealth').innerText = player.health;
    document.getElementById('playerLevel').innerText = player.level;
    document.getElementById('playerXP').innerText = player.xp;
    document.getElementById('playerXPNext').innerText = player.xpToNextLevel;
  }
  