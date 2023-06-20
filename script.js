document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    const message = document.querySelector(".message");
    const newGameBtn = document.querySelector(".new-game-btn");
    let currentPlayer = "X";
    let gameEnded = false;
  
    cells.forEach(cell => {
      cell.addEventListener("click", handleClick);
    });
  
    newGameBtn.addEventListener("click", startNewGame);
  
    function handleClick() {
      if (gameEnded || this.textContent !== "") return;
      
      this.textContent = currentPlayer;
      this.classList.add(currentPlayer);
  
      if (checkWin()) {
        message.textContent = "Spieler " + currentPlayer + " hat gewonnen!";
        gameEnded = true;
        return;
      }
  
      if (checkTie()) {
        message.textContent = "Unentschieden!";
        gameEnded = true;
        return;
      }
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  
    function checkWin() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikal
        [0, 4, 8], [2, 4, 6] // diagonal
      ];
  
      return winningCombos.some(combo => {
        return combo.every(index => {
          return cells[index].textContent === currentPlayer;
        });
      });
    }
  
    function checkTie() {
      return [...cells].every(cell => {
        return cell.textContent !== "";
      });
    }
  
    function startNewGame() {
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
      });
  
      currentPlayer = "X";
      gameEnded = false;
      message.textContent = "";
    }
  });
  