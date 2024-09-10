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
      alert("The 'finishGame()' command can only be used in level 3 after defeating all enemies.");
      return false;  // Stop the game from running
    }
    return true;
  }
  
  function runCode() {
    if (currentLevel >= 2) {
      if (runCount >= maxRuns) {
        alert("You have exceeded the number of allowed code executions. Try using loops to solve the puzzle.");
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