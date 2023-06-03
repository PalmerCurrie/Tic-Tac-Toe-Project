
// player objects and players
const player = function(name, marker, score){
    return {name, marker, score}
}
const playerOne = player("Player One (X)", "X", 0)
const playerTwo = player("Player Two (O)", "O", 0)

// gameboard object and the gameboard array
const newGame = function(gameboard){
    gameboard = ["", "", "", "", "", "", "", "", ""]
    return gameboard
}
const gameboard = newGame()

// gets the index of the given gameboard that is clicked
const getArrayIndex = function() {
    return new Promise((resolve) => {
      const board = document.getElementById("board");
      const boardPieces = board.querySelectorAll("div");
  
      function handleClick() {
        const index = this.id.substring(9, 10);
        boardPieces.forEach((piece) => {
          piece.removeEventListener("click", handleClick);
        });
        resolve(index);
      }
      boardPieces.forEach((piece) => {
        piece.addEventListener("click", handleClick);
      });
    });
  };

// sets the market of given player on given gameboard index
const setPiece = function(player, gameboardIndex,) {
    let boardpieceID = "gameboard" + gameboardIndex
    let boardPiece = document.getElementById(boardpieceID)
    const marker = player.marker
    boardPiece.innerText = marker
    gameboard[gameboardIndex-1] = marker
}

// function to determine whether given index on gameboard isPlayable
function isPlayable(index){
    if (gameboard[index-1] === "")
        return true
    else {
        console.log("This spot is already taken, please enter another location")
        return false
    }
}

// functions for playerOne and playerTwo turns   -  can probably make into one function that intakes which player's turn it is
async function playerOneTurn(){
    console.log(`It is ${playerOne.name}'s turn.`)
    const index = await getArrayIndex()
    if (isPlayable(index)){
        setPiece(playerOne, index)
        return true
    }
    else {
        console.log("You need to pick another spot")
        return false
    }
}
async function playerTwoTurn(){
    console.log(`It is ${playerTwo.name}'s turn.`)
    const index = await getArrayIndex()
    if (isPlayable(index)){
        setPiece(playerTwo, index)
        return true
    }
    else {
        console.log("You need to pick another spot")
        return false
    }   
}

let currentPlayer = 1;
async function gameLogic(){
    console.log("player one score is: " + playerOne.score)
    console.log("player Two score is: " + playerTwo.score)
    const playerTurn = document.getElementById("playerTurn")
    currentPlayer = currentPlayer === 1 ? 2 : 1; // currentplayer = 2 means current player is Two and next player will be One
    if (currentPlayer === 2){
        playerTurn.innerHTML = `It is ${playerOne.name}'s turn.`
        while(await playerOneTurn() === false)
            continue
    }
    else if (currentPlayer === 1) {
        playerTurn.innerHTML = `It is ${playerTwo.name}'s turn.`
        while(await playerTwoTurn() === false)
            continue
    }
    if (checkGameWinner(gameboard)){
    }
    if (restartGame()){
    }
    gameLogic();
    }
gameLogic()

// resets the gameBoard when restartGame button is clicked
const restartGame = () => {
    updatePlayerInformation()
    const restartGameButton = document.getElementById("restartGame")
    restartGameButton.addEventListener('click', () => {
        resetBoard()
    });
}

// resets the gameboard array and the board on the page
const resetBoard = () => {
    for (let i = 0; i < gameboard.length; i++){
        gameboard[i] = ""
        let boardpieceID = "gameboard" + (i+1)
        let boardPiece = document.getElementById(boardpieceID)
        boardPiece.innerText = null
    }
}

// checks to see if there is a winning move on the board
    const checkGameWinner = (gameboard) => {
        const winningMoves = 
            [[0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]]
            for (let i = 0; i < winningMoves.length; i++) {
                const [a, b, c] = winningMoves[i];
                if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                    console.log("GG")
                    if (gameboard[a] === "X"){
                        alert("player One wins")
                        resetBoard()
                        playerOne.score++
                    }
                    else if (gameboard[a] === "O"){
                        alert("player Two wins")
                        resetBoard()
                        playerTwo.score++
                    }
                    return true; // The user has won
                }
              }
        return false
        }

// updates the player information like score etc on the sides of the board
const updatePlayerInformation = () => {
    // const playerOneDiv = document.getElementById("playerOne")   for future features
    // const playerTwoDiv = document.getElementById("playerTwo")
    const playerOneScore = document.getElementById("playerOneScore")
    const playerTwoScore = document.getElementById("playerTwoScore")

    playerOneScore.innerHTML = `${playerOne.name}'s Score: ${playerOne.score}`
    playerTwoScore.innerHTML = `${playerTwo.name}'s Score: ${playerTwo.score}`
}


/*
Features to add:
Reset Score feature
Allow user to enter player names
Winning animation or effect


*/