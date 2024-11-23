var board = [];
var rows = 8;
var columns = 8;

var minesCount = 13;
var minesLocation = [];

var tilesClicked = 0; // goal to click all titles expect the one containing mines
var flagEnabled = false;

var gameOver = false;

window.onload = function() {
    startGame();
}
function setMines() { // random location of mines
  let minesLeft = minesCount;
  while (minesLeft > 0 ) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    let id = r.toString() + "-" + c.toString();

    if (!minesLocation.includes(id)) {
        minesLocation.push(id);
        minesLeft -= 1; // if theres already mine, there put somewhere else 
    }
  }
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag); 
    setMines();

    //populating the board
    for (let r = 0; r < rows; r++) {
        let row = []; // array 
        for (let c = 0; c < columns; c++) {
            //created: <div id "0-0, 1,1..."></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); // position of each tile
            tile.addEventListener("click", clickTile); // being able to click
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row); // pushing row into board;
    }
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgrey";
    }
    else {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkblue";
    }
}

function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }

    let tile = this;
    if (flagEnabled) {
        if(tile.innerText == "") {
            tile.innerText = "🚩"
        }
        else if (tile.innerText == "🚩") {
            tile.innerText = ""; // if you want to take off
        }
        return;
    }

    if(minesLocation.includes(tile.id)) {
       // alert("Game Over"); // if you click on mine
        gameOver = true;
        revealMines();
        return;
    }

    let coords = tile.id.split("-"); // "0-0" -> [0,0]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r,c);
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if(minesLocation.includes(tile.id)){
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";
            }
        }
    }
}

function checkMine(r, c) {
    // Check for out-of-bounds or already clicked tiles
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    // Count adjacent mines
    let minesFound = 0;
    minesFound += checkTile(r - 1, c - 1); // top-left
    minesFound += checkTile(r - 1, c);     // top
    minesFound += checkTile(r - 1, c + 1); // top-right
    minesFound += checkTile(r, c - 1);     // left
    minesFound += checkTile(r, c + 1);     // right
    minesFound += checkTile(r + 1, c - 1); // bottom-left
    minesFound += checkTile(r + 1, c);     // bottom
    minesFound += checkTile(r + 1, c + 1); // bottom-right

    if (minesFound > 0) {
        // If adjacent mines are found, display the count and stop recursion
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    } else {
        // If no adjacent mines, recursively reveal all surrounding tiles
        checkMine(r - 1, c - 1); // top-left
        checkMine(r - 1, c);     // top
        checkMine(r - 1, c + 1); // top-right
        checkMine(r, c - 1);     // left
        checkMine(r, c + 1);     // right
        checkMine(r + 1, c - 1); // bottom-left
        checkMine(r + 1, c);     // bottom
        checkMine(r + 1, c + 1); // bottom-right
    }

    // Check if all non-mine tiles have been clicked
    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }
}


function checkTile(r,c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    } // checking for out of bounds
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    } else {return 0;}
}


