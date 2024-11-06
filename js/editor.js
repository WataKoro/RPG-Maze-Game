let runCount = 0;  // Track how many times the player has run code
const maxRuns = 5; // Max number of times the player can run code on level 2 and beyond

// CodeMirror setup
const editor = CodeMirror(document.getElementById('codeEditor'), {
    mode: "javascript",
    lineNumbers: true,
    theme: "dracula", // Optional theme
    value: "// Write your code here...\n",
    extraKeys: {
      "Ctrl-Space": "autocomplete"
    }
  });
  
  // Optional: Register custom autocomplete commands
  CodeMirror.registerHelper("hint", "javascript", function(editor) {
    const cur = editor.getCursor();
    const token = editor.getTokenAt(cur);
    const currentWord = token.string;
  
    const customCommands = [
      "moveForward()", 
      "moveBackward()", 
      "turnLeft()", 
      "turnRight()",
      "for (let i = 0; i < length; i++) {}",  // Basic for loop syntax
      "while (condition) {}"  // Basic while loop syntax
    ];
  
    const list = customCommands.filter(function(item) {
      return item.indexOf(currentWord) === 0;
    });
  
    return {
      list: list.length ? list : customCommands,
      from: CodeMirror.Pos(cur.line, token.start),
      to: CodeMirror.Pos(cur.line, cur.ch)
    };
  });

  function checkForFinishGameCommand(code) {
    const usingFinishGame = code.includes("finishGame()");
    
    if (usingFinishGame && currentLevel !== 3) {
      alert("Command 'finishGame()' hanya bisa digunakan di level 3 ketika sudah mengalahkan semua musuh");
      return false;  // Stop the game from running
    }
    return true;
  }
  
  function runCode() {
    if (currentLevel >= 2) {
      if (runCount >= maxRuns) {
        alert("Kamu melebihi batas run code, gunakan looping untuk menghemat run code!");
        resetGame();
      }
    }
  
    const codeInput = editor.getValue();
    console.log("Code to be executed:", codeInput);  // Check the fetched code
    try {
      eval(codeInput);
      runCount++;  // Increment the counter each time the player runs the code
      console.log(`Code run ${runCount} time(s)`);
    } catch (error) {
      console.error('Error in your code:', error);
      alert('Error in your code: ' + error.message);
    }
  }