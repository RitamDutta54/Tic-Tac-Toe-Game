// Selecting all necessary DOM elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true = O's turn, false = X's turn
let count = 0;    // To keep track of the number of moves (for checking draw)

// All possible winning combinations (index-based for the 3x3 grid)
const winPatterns = [
  [0, 1, 2], // first row
  [0, 3, 6], // first column
  [0, 4, 8], // diagonal from top-left
  [1, 4, 7], // middle column
  [2, 5, 8], // third column
  [2, 4, 6], // diagonal from top-right
  [3, 4, 5], // middle row
  [6, 7, 8], // last row
];

// Function to reset the game
const resetGame = () => {
  turnO = true; // Reset turn to O
  count = 0; // Reset move counter
  enableBoxes(); // Clear and enable all boxes
  msgContainer.classList.add("hide"); // Hide result message
};

// Add click event listeners to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O"; // Player O makes a move
      turnO = false;       // Switch to player X
    } else {
      box.innerText = "X"; // Player X makes a move
      turnO = true;        // Switch to player O
    }
    box.disabled = true; // Disable the box after it's clicked
    count++; // Increment move counter

    let isWinner = checkWinner(); // Check if there's a winner after the move

    // If all boxes are filled and there's no winner, it's a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to handle a draw scenario
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`; // Show draw message
  msgContainer.classList.remove("hide"); // Display message container
  disableBoxes(); // Disable all boxes
};

// Function to disable all boxes (when game ends)
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes and clear them (used in reset)
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;  // Enable box
    box.innerText = "";    // Clear text
  }
};

// Function to show the winner message and disable the board
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`; // Show winner message
  msgContainer.classList.remove("hide"); // Show message container
  disableBoxes(); // Disable all boxes
};

// Function to check if there’s a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    // Destructure the indexes in the current win pattern
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // Check if all three positions are non-empty and equal
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val); // Show winner
        return true;
      }
    }
  }
};

// Event listeners for the reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
