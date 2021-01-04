// Define variables
var board = document.getElementById("board");
// Count the number of ties and computer and player wins:
var countPlayerWins = 0;
var countCompWins = 0;
var countTies = 0;
var winCondition;
// Variable to be
var gameOver = false;
// Define the default values for player and computer marks:
var playerMark = "X";
var computerMark = "O";
// Set status of winner to false:
var playerWin = false;
var computerWin = false;
// Set the value for tie to false:
var noWinner = false;
//  Variables that will be used when looping through each 'td' element:
var numColumns;
var numRows;
// Create arrays that will hold the coordinates of the matching cells
var playerCells = [];
var computerCells =[];
// Variables that will count the number of times a player's mark has occured in a row:
var playerCount = 0;
var computerCount = 0;
// Variables that will hold the two primary colors based off the selected theme:
var primaryColor;
var textColor;

// Function to set the player and computer to either 'X' or 'O':
function setPlayer(choice){
  if (choice == "X") {
    playerMark = "X";
    computerMark ="O";
  } else {
    playerMark = "O";
    computerMark ="X";
  }
}

// Function to execute the player's move:
function playerMove(block) {
  if (block.innerHTML == "") {
    // If the space is unoccupied, add the player's mark to the space:
    block.innerHTML = playerMark;
  } else {
    // If the space is already occupied, exit the function.
    return;
  }

  numColumns = board.rows[0].cells.length; // Get the number of columns in the table.
  numRows = board.rows.length; // Get the number of rows in the table.
  // Check if player won:
  if (gameOver == false) { columnCheck(); }
  if (gameOver == false) {rowCheck(); }
  if (gameOver == false) { diagCheck(); }
  // After checking for a winning condition, check and see if the player won:
  if (playerWin) { // If the player has won:
    alert("You win!");
    countPlayerWins++; // Increase the count of the number of times player has won.
    document.getElementById("numPlayerWins").innerHTML = countPlayerWins; // Display current # of player wins.
  } else if (checkNoWinner() == true) { // Check and see if no player has won:
    countTies++; // If no player has won, increase the number of ties.
    document.getElementById("numTies").innerHTML = countTies; // Display current # of ties.
    alert("Nobody won!"); // Alert that nobody won.
  } else {
      computerMove(); //computerMove(); // If there's no winner and nobody tied, let the computer go next.
  }
}

function computerMove() {
  // Get the number of columns and rows (in case the computer is going first):
  numColumns = board.rows[0].cells.length;
  numRows = board.rows.length;
  let turnOver = false;
  var row = Math.floor(Math.random() * numRows); // get a random row #
  var column = Math.floor(Math.random() * numColumns); // get a random column #
  while (turnOver == false) { // If space is onoccupied, place the computers mark:
    if (board.rows[row].cells[column].innerHTML == "") {
      board.rows[row].cells[column].innerHTML = computerMark;
      turnOver = true;
    } else { // Otherwise, get a new random column and row # to check:
      row = Math.floor(Math.random() * 3);
      column = Math.floor(Math.random() * 3);
    }
  }
  // Check and see if the computer won:
  if (gameOver == false) { columnCheck(); }
  if (gameOver == false) { rowCheck(); }
  if (gameOver == false) { diagCheck(); }
  // If computer wins:
  if (computerWin) {
    countCompWins++; // Increase the number of computer wins.
    document.getElementById("numCompWins").innerHTML = countCompWins; // Display # of computer wins.
    alert("You lose!");
  } else if (checkNoWinner() == true) { // Check if there is a tie:
      countTies++; // Increase the number of ties:
      document.getElementById("numTies").innerHTML = countTies;
      alert("Nobody won!");
  }
}

// Function to check for a tie, if all spaces are occupied, return true:
function checkNoWinner() {
  for (var x = 0; x < numRows; x++) {
    for (var y = 0; y < numColumns; y++) {
      if (board.rows[x].cells[y].innerHTML == "") {
        return false;
      }
    }
  }
  return true;
}

// Function that will change the look of the page based off selected theme:
function selectTheme(theme) {
  switch (theme) {
    case "ice":{
      document.getElementById("title").style.color = "#6bdbdd";
      document.getElementById("score").style.background = "#6bdbdd";
      document.getElementById("score").style.color = "#0338b9";
      document.body.style.background = "#0338b9";
      document.getElementById("settings").style.background = "#6bdbdd";
      document.getElementById("settings").style.color = "#0338b9";
      return;
    }
    case "mint": {
      document.getElementById("title").style.color = "#75f6c8";
      document.getElementById("score").style.background = "#75f6c8";
      document.getElementById("score").style.color = "#19608d";
      document.body.style.background = "#19608d";
      document.getElementById("settings").style.background = "#75f6c8";
      document.getElementById("settings").style.color = "#19608d";
      return;
    }
    case "fire": {
      document.getElementById("title").style.color = "#e52633";
      document.getElementById("score").style.background = "#e52633";
      document.body.style.background = "black";
      document.getElementById("score").style.color = "black";
      document.getElementById("settings").style.background = "#e52633";
      document.getElementById("settings").style.color = "black";
      return;
    }
    case "dark": {
      document.getElementById("title").style.color = "#727fb6";
      document.getElementById("score").style.background = "#727fb6";
      document.getElementById("score").style.volor= "black";
      document.body.style.background = "black";
      document.getElementById("settings").style.background = "#727fb6";
      document.getElementById("settings").style.color = "black";
      return;
    }
  }
}

/* Function that will reset the values back to their defaults
and make all of the spaces blank: */
function restartGame() {
  playerWin = false;
  computerWin = false;
  noWinner = false;
  gameOver = false;
  console.log("function ran!");
  for (var x = 0; x < numColumns; x++) {
    for (var y = 0; y < numRows; y++) {
        board.rows[x].cells[y].innerHTML = "";
    }
  }
}

function columnCheck() {
  for (var col = 0; col < numColumns; col++) {
    // Reset the counters when moving to the next column:
    playerCount = 0;
    computerCount = 0;
    playerCells =[];
    for (var row = 0; (row + winCondition) <= numRows; row++ ) {
      playerCount = 0;
      computerCount = 0;
     for (var x = 0; x < winCondition; x++) {
        if (board.rows[row + x].cells[col].innerHTML == playerMark) {
          playerCells.push([row + x, col]); // Add the cell to an array of matching cells
          playerCount++; // Increase the number of matches found
        } else {
          playerCells = []; // Empty the array of cells
          playerCount = 0; // Reset the counter.
        }
        if (playerCount == winCondition) {
          playerWin = true; // Mark the player has having won.
          gameOver = true;
          // Reset the counters for the player:
          playerCount = 0;
          computerCount = 0;
          highlightCells(playerCells); // Highlight the cells that were a match.
        }
        // Check for computer mark
        if (board.rows[row + x].cells[col].innerHTML == computerMark) {
          computerCells.push([row + x, col]); // Add the cell to an array of matching cells
          computerCount++; // Increase the number of matches found
        } else {
          computerCells = []; // Empty the array of cells
          computerCount = 0; //
        }
        if (computerCount == winCondition) {
          computerWin = true; // Mark the computer as having won.
          gameOver = true;
          // Reset the counters:
          playerCount = 0;
          computerCount = 0;
          highlightCells(computerCells); // Highlight the matching cells
          return;
        }
      } // End of: for (var x = 0; x < winCondition; x++)
    } // End of: for (var row = 0; (row + winCondition) <= numRows; row++ ) {
  } // End of: for (var col = 0; col < numColumns; col++) {
} // End of: function columnCheck()

function rowCheck() {
  for (var row = 0; row < numRows; row++) {
    // Reset the counters when moving to the next row
    playerCount = 0;
    computerCount = 0;
    playerCells =[]; // Empty array
    for (var col = 0; (col + winCondition <= numColumns); col++ ) {
      playerCount = 0;
      computerCount = 0;
      for (var x = 0; x < winCondition; x++) {
        // Check forPlayer Win
        if (board.rows[row].cells[col + x].innerHTML == playerMark) {
          playerCells.push([row, col + x]); // Add the cell to an array of matching cells
          playerCount++; // Increase the number of matching player marks
        } else {
          playerCells = []; // Empty array
          playerCount = 0; // Reset the counters
        }
        if (playerCount == winCondition) {
          playerWin = true; // Set the player as the winner
          gameOver = true; // Mark the game as owner.
          console.log("You won by row!");
          // Reset the counters:
          playerCount = 0;
          computerCount = 0;
          highlightCells(playerCells); /// Highlight the matching cells
          return;
        }
      if (board.rows[row].cells[col + x].innerHTML == computerMark) {
        computerCells.push([row, col + x]); // Add the cell to an array of matching cells
        computerCount++; // Increase the number of matching computer marks
      } else {
        computerCells = []; // Empty the array
        computerCount = 0; // Reset the counter
      }
      if (computerCount == winCondition) {
        computerWin = true; // Mark the computer as the winner
        gameOver = true; // Mark the game as over
        // Reset the counters
        playerCount = 0;
        computerCount = 0;
        highlightCells(computerCells); // Highlight the matching cells
        return;
        }
      } // End of: for (var x = 0; x < winCondition; x++) {
    } // End of:   for (var col = 0; (col + winCondition <= numColumns); col++ ) {
  } // End of: for (var row = 0; row < numRows; row++) {
} // End of  function rowCheck()

function diagCheck() {
  for (var row = 0; (row + winCondition) <= numRows; row++) {
    // Check for a diagonal match going left to right
    playerCount = 0;
    computerCount = 0;
    for (var col = 0; (col + winCondition <= numColumns); col++) {
      playerCount = 0;
      computerCount = 0;
      for (var x = 0; x < winCondition; x++) {
        // check for player match
          playerCount++; // Increase the number of matching player marks
          playerCells.push([row + x, col + x]); // Add the cell to an array of matching cells
        } else {
          playerCells = []; // Empty array
          playerCount = 0; // Reset counter
        }
        if (playerCount == winCondition) {
          playerWin = true; // Mark the player as the winner
          gameOver = true; // Mark the game as over.
          console.log("You won by diag (left to right)");
          // Reset counters
          playerCount = 0;
          computerCount = 0;
          highlightCells(playerCells); // Highlight the counters
          return;
        }
        if (board.rows[row + x].cells[col + x].innerHTML == computerMark) {
          computerCount++; // Increase the number of matching computer marks
          computerCells.push([row + x, col + x]); // Add the cell to an array of matching cells
        } else {
          computerCount = 0; // Reset counter
          computerCells = []; // Empty array
        }
        if (computerCount == winCondition) {
          computerWin = true; // Mark the computer as the winner
          gameOver = true; // Mark the game as over.
          // Reset counters
          playerCount = 0;
          computerCount = 0;
          highlightCells(computerCells); // Highlight matching cells
          return;
        }
      } // End of: for (var x = 0; x < winCondition; x++)
    } // for (var col = 0; (col + winCondition <= numColumns); col++)

    // Check for a diagonal match going right to left
    for (var col = numColumns-1; col >= winCondition-1; col--) {
      playerCount = 0;
      computerCount = 0;
      playerCells =[];
      computerCells =[];
      for (var x = 0; x < winCondition; x++) {
        if (board.rows[row + x].cells[col - x].innerHTML == playerMark) {
          playerCells.push([row + x, col - x]); // Add the cell to an array of matching cells
          playerCount++; // Increase the number of matching player marks
        } else {
          playerCount = 0; // Reset the counter.
          playerCells = []; // Empty array
        }
        // If the number of diagonal marks meets the winning conditon:
        if (playerCount == winCondition) {
          playerWin = true; // Mark the player as the winner.
          gameOver = true; // Mark the game as over.
          console.log("You won by diag (right to left)");
          // Empty the counters
          playerCount = 0;
          computerCount = 0;
          highlightCells(playerCells); // Highlight the cells of the matching marks
          return;
        }
        if (board.rows[row + x].cells[col - x].innerHTML == computerMark) {
          computerCount++; // Increase the number of matching computer marks
          computerCells.push([row + x, col - x]);// Add the cell to an array of matching cells
        } else {
          computerCount = 0; // Reset the counter for computer marks.
          computerCells =[]; // Empty the array
        }
        if (computerCount == winCondition) {
          computerWin = true; // Set the computer as the winner.
          gameOver = true;
          // Reset the counters
          playerCount = 0;
          computerCount = 0;
          highlightCells(computerCells);
          return;
        }
      } // End of: for (var x = 0; x < winCondition; x++) {
    } // End of: for (var col = numColumns-1; col >= winCondition-1; col--)
  } // End of: for (var row = 0; (row + winCondition) <= numRows; row++)
} // End of: function diagCheck()

// Function to set the win condtion for the game based off user input:
function setWinCondition(input) {
  switch (input) {
    case "3inARow": {
      winCondition = 3;
      break;
    }
    case "4inARow": {
      winCondition = 4;
      break;
    }
    case "5inARow": {
      winCondition = 5;

      break;
    }
    case "6inARow": {
      winCondition = 6;
      break;
    }
  }
}
// Function to set the size of the board based off user input:
function setBoard(boardSize) {
  switch (boardSize) {
    case "3x3": {
      row1 = board.insertRow(0);
      row2 = board.insertRow(1);
      row3 = board.insertRow(2);
      for (let count = 0; count < 3; count ++) {
        row1.insertCell(count);
        row2.insertCell(count);
        row3.insertCell(count);
      }
      break;
    }
    case "4x4": {
      row1 = board.insertRow(0);
      row2 = board.insertRow(1);
      row3 = board.insertRow(2);
      row4 = board.insertRow(3);
      for (let count = 0; count < 4; count ++) {
        row1.insertCell(count);
        row2.insertCell(count);
        row3.insertCell(count);
        row4.insertCell(count);
      }
      break;
    }
    case "5x5": {
      row1 = board.insertRow(0);
      row2 = board.insertRow(1);
      row3 = board.insertRow(2);
      row4 = board.insertRow(3);
      row5 = board.insertRow(4);
      for (let count = 0; count < 5; count ++) {
        row1.insertCell(count);
        row2.insertCell(count);
        row3.insertCell(count);
        row4.insertCell(count);
        row5.insertCell(count);
      }
      break;
    }
    case "6x6": {
      row1 = board.insertRow(0);
      row2 = board.insertRow(1);
      row3 = board.insertRow(2);
      row4 = board.insertRow(3);
      row5 = board.insertRow(4);
      row6 = board.insertRow(5);
      for (let count = 0; count < 6; count ++) {
        row1.insertCell(count);
        row2.insertCell(count);
        row3.insertCell(count);
        row4.insertCell(count);
        row5.insertCell(count);
        row6.insertCell(count);
      }
    break;
  }
  }
}
// Function to set the color of the board based off what is selected:
function setBoardTheme(theme) {
  if (theme == "fire") {
    primaryColor = "#e52633";
    textColor = "black";
  } else if (theme =="mint") {
    primaryColor = "#75f6c8";
    textColor = "#19608d";
  } else if (theme =="dark") {
    primaryColor = "#727fb6";
    textColor = "black";
  } else {
    primaryColor = "#6bdbdd";
    textColor = "#0338b9";
  }
  // Set the color of the cells and their borders:
  for (var x = 0; x < board.rows.length; x++) {
    for (var y = 0; y < board.rows.length; y++) {
      board.rows[x].cells[y].style.background = primaryColor;
      board.rows[x].cells[y].style.color = textColor;
      board.rows[x].cells[y].style.borderColor = textColor;
      board.style.borderColor = primaryColor;
    }
  }
}
// Function to highlight the array of matching cells:
function highlightCells(array) {
  for (var x = 0; x < array.length; x++) {
      board.rows[array[x][0]].cells[array[x][1]].style.background = textColor;
      board.rows[array[x][0]].cells[array[x][1]].style.color = primaryColor;
      board.rows[array[x][0]].cells[array[x][1]].style.borderColor = primaryColor;
  }
}
