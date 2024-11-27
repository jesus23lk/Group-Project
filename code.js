const difficultySetting = {
    easy: { rows: 8, columns: 10, minesCount: 10 },
    medium: { rows: 15, columns: 18, minesCount: 40 },
    hard: { rows: 20, columns: 24, minesCount: 99 }
};

const g = { // Global object to hold all game variables
    board: [],
    rows: 8,
    columns: 10,
    minesCount: 10, // Actual mine count
    flaggedCount: 0, // Flag count
    minesLocation: [],
    tilesClicked: 0, // Goal to click all tiles except the ones containing mines
    gameStarted: false,
    numSeconds: 0,
    gameOver: false,
    timeInterval: null // Store the interval ID here
};

// Event listener for difficulty selection
document.getElementById("difficulty").addEventListener("change", (e) => {
    const difficulty = e.target.value;

    // Updating global settings based on difficulty 
    g.rows = difficultySetting[difficulty].rows;
    g.columns = difficultySetting[difficulty].columns;
    g.minesCount = difficultySetting[difficulty].minesCount;

    // Restart the game with the new settings
    restartGame();
});

const sounds = {
    death: new Audio("GTA_5_Sound_Effect.mp3")
};

window.onload = function () {
    setupBoard();
};

function startTimer() {
    const timeElapsed = document.getElementById("time-elapsed");
    let timeString = ""; // Time value to be displayed to the user
    g.numSeconds = 0; // Reset the timer on game start
    timeElapsed.textContent = "000"; // Display initial 000 time

    // Store the interval ID in the global object
    g.timeInterval = setInterval(() => {
        g.numSeconds++;

        if (g.numSeconds < 10) timeString = "00" + g.numSeconds;
        else if (g.numSeconds < 100) timeString = "0" + g.numSeconds;
        else timeString = g.numSeconds;

        timeElapsed.textContent = timeString;
    }, 1000);
}

function stopTimer() {
    if (g.timeInterval) { // Only clear if the interval exists
        clearInterval(g.timeInterval);
        g.timeInterval = null; // Clear the interval reference after stopping
        console.log("Timer Stopped");
    }
}

function setMines() { // Random location of mines
    let minesLeft = g.minesCount;

    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * g.rows);
        let c = Math.floor(Math.random() * g.columns);
        let id = r.toString() + "-" + c.toString();

        if (!g.minesLocation.includes(id)) {
            g.minesLocation.push(id);
            minesLeft--;
        }
    }
}

function setupBoard() {
    document.getElementById("mines-count").textContent = g.minesCount;
    setMines();

    // Populating the board
    const boardElement = document.getElementById("board");
    boardElement.style.gridTemplateColumns = "repeat(" + g.columns + ", 1fr)";
    boardElement.style.gridTemplateRows = "repeat(" + g.rows + ", 1fr)";
    boardElement.innerHTML = ""; // Clear existing tiles

    for (let r = 0; r < g.rows; r++) {
        let row = []; // Array with DOM nodes for each tile in the board

        for (let c = 0; c < g.columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); // Position of each tile
            tile.className = "tile";

            tile.onclick = clickTile; // Left-click functionality
            tile.oncontextmenu = clickTile; // Right-click functionality

            boardElement.append(tile);
            row.push(tile);
        }

        g.board.push(row); // Push row into board
    }
}

function clickTile(e) {
    e.preventDefault();
    let tile = this;

    if (g.gameOver || tile.classList.contains("tile-clicked")) {
        return; // Exit function if game is over or if user has clicked a tile that was already clicked
    }

    if (e.type === "contextmenu") {
        // If statement entered only if the user did a right-click
        if (tile.textContent === "") {
            tile.textContent = "🚩";
            g.flaggedCount++;
            document.getElementById("mines-count").textContent = g.minesCount - g.flaggedCount;
        } else if (tile.textContent === "🚩") {
            tile.textContent = ""; // Remove flag
            g.flaggedCount--;
            document.getElementById("mines-count").textContent = g.minesCount - g.flaggedCount;
        }
        return;
    }

    if (g.tilesClicked === 0) startTimer(); // Start timer on the first tile click

    if (g.minesLocation.includes(tile.id)) {
        g.gameOver = true;
        sounds.death.play();
        revealMines();
        stopTimer(); // Stop the timer when game is over
        return;
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}

function revealMines() {
    for (let r = 0; r < g.rows; r++) {
        for (let c = 0; c < g.columns; c++) {
            let tile = g.board[r][c];
            if (g.minesLocation.includes(tile.id)) {
                tile.textContent = "💣";
                tile.style.backgroundColor = "red";
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= g.rows || c < 0 || c >= g.columns) return; // Check for tiles that are out of bounds
    if (g.board[r][c].classList.contains("tile-clicked")) return; // Check for tiles that have already been clicked
    if (g.board[r][c].textContent === "🚩") return; // Check for tiles that have a flag

    g.board[r][c].classList.add("tile-clicked");
    g.tilesClicked++;

    // Count adjacent mines
    let minesFound = 0;
    minesFound += checkTile(r - 1, c - 1); // Top-left
    minesFound += checkTile(r - 1, c);     // Top
    minesFound += checkTile(r - 1, c + 1); // Top-right
    minesFound += checkTile(r, c - 1);     // Left
    minesFound += checkTile(r, c + 1);     // Right
    minesFound += checkTile(r + 1, c - 1); // Bottom-left
    minesFound += checkTile(r + 1, c);     // Bottom
    minesFound += checkTile(r + 1, c + 1); // Bottom-right

    if (minesFound > 0) {
        g.board[r][c].textContent = minesFound;
        g.board[r][c].classList.add("x" + minesFound.toString());
    } else {
        checkMine(r - 1, c - 1); // Top-left
        checkMine(r - 1, c);     // Top
        checkMine(r - 1, c + 1); // Top-right
        checkMine(r, c - 1);     // Left
        checkMine(r, c + 1);     // Right
        checkMine(r + 1, c - 1); // Bottom-left
        checkMine(r + 1, c);     // Bottom
        checkMine(r + 1, c + 1); // Bottom-right
    }

    // Check if all non-mine tiles have been clicked
    if (g.tilesClicked === g.rows * g.columns - g.minesCount) {
        document.getElementById("mines-count").textContent = "Cleared";
        g.gameOver = true;
        stopTimer(); // Stop the timer if the game is won
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= g.rows || c < 0 || c >= g.columns) {
        return 0;
    } // Check for out of bounds
    if (g.minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    } else {
        return 0;
    }
}

function restartGame() {
    // Reset the game variables
    g.board = [];
    g.tilesClicked = 0;
    g.minesLocation = [];
    g.gameOver = false;
    g.flaggedCount = 0;
    g.numSeconds = 0;

    // Reset the UI elements
    document.getElementById("mines-count").textContent = g.minesCount; // Display initial mines count
    document.getElementById("time-elapsed").textContent = "000"; // Reset timer display

    // Clear the board UI and set up a new board
    setupBoard();

    // Stop the timer if it was running
    stopTimer();
}

document.getElementById("restart-button").addEventListener("click", restartGame);
