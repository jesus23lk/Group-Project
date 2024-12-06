<!-- This is the game's main page -->

<?php require_once "check_login.php" ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minesweeper</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
     <!-- Navigation Bar -->
     <nav>
        <a href="contact.php">Contact</a>
        <a href="help.html">Help</a>
        <a href="leaderboard.php">Leaderboard</a>
        <a href="logout.php">Logout</a>
    </nav>

    <h1>
        <span style="color: black">Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</span><br>
        Mines: <span id="mines-count">0</span>
        Time: <span id="time-elapsed">000</span>
    </h1>
    <div>
        <label for="difficulty">Select Difficulty: </label>
        <select id="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    </div>
    <div id="board"></div>
    <br>
    <button id="restart-button">Restart Game</button>
    <script src="code.js"></script>
</body>
</html>
