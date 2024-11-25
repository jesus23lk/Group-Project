const g = { // global object to hold all global variables
    board: [],
    rows: 9,
    columns: 9,
    minesCount: 10,
    minesLocation: [],
    tilesClicked: 0, // goal to click all tiles except the ones containing mines
    gameStarted: false,
    numSeconds: 0,
    gameOver: false,
    timeInterval: null // Store the interval ID here
};

const sounds = {
    death: new Audio("GTA_5_Sound_Effect.mp3")
};

window.onload = function() {
    setupBoard();
};

function startTimer() {
    const timeElapsed = document.getElementById("time-elapsed");
    let timeString = ""; // time value to be actually displayed to user
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

function setMines() { // random location of mines
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

    // populating the board
    for (let r = 0; r < g.rows; r++) {
        let row = []; // array with DOM nodes to each tile in our board

        for (let c = 0; c < g.columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); // position of each tile
            tile.className = "tile";

            tile.onclick = clickTile; // left click functionality
            tile.oncontextmenu = clickTile; // right click functionality

            document.getElementById("board").append(tile);
            row.push(tile);
        }

        g.board.push(row); // pushing row into board
    }
}

function clickTile(e) {
    e.preventDefault();
    let tile = this;

    if (g.gameOver || this.classList.contains("tile-clicked")) { 
        return; // Exit function if game is over or if user has clicked a tile that was already clicked
    }

    if (e.type === "contextmenu") {
        // If statement entered only if the user did a right click
        if (tile.textContent == "") tile.textContent = "🚩";
        else if (tile.textContent == "🚩") tile.textContent = ""; // remove flag
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
    if (g.board[r][c].textContent == "🚩") return;  // Check for tiles that have a flag

    g.board[r][c].classList.add("tile-clicked");
    g.tilesClicked++;

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
        g.board[r][c].textContent = minesFound;
        g.board[r][c].classList.add("x" + minesFound.toString());
    } else {
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
    if (g.tilesClicked == g.rows * g.columns - g.minesCount) {
        document.getElementById("mines-count").textContent = "Cleared";
        g.gameOver = true;
        stopTimer(); // Stop the timer if the game is won
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= g.rows || c < 0 || c >= g.columns) {
        return 0;
    } // checking for out of bounds
    if (g.minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    } else {
        return 0;
    }
}