<?php

    require_once "check_login.php";
    require_once "database.php";

    function getLeaderboard($conn, $column) {

        $sql = "SELECT username, country, $column AS score 
                FROM users 
                WHERE $column IS NOT NULL 
                ORDER BY score ASC 
                LIMIT 10"; // Fetch top 10 scores

        $result = $conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    
    $easyLeaderboard = getLeaderboard($conn, 'easy_hs');
    $mediumLeaderboard = getLeaderboard($conn, 'medium_hs');
    $hardLeaderboard = getLeaderboard($conn, 'hard_hs');
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard - Minesweeper</title>
    <link rel="stylesheet" href="Leaderboard.css">
</head>
<body>
    <!-- Navigation Bar -->
    <nav>
        <a href="index.php">Game</a>
        <a href="contact.php">Contact</a>
        <a href="help.html">Help</a>
        <a href="logout.php">Logout</a>
    </nav>

    <!-- Leaderboard Section -->
       <div class="leaderboard-container">
        <h1>Minesweeper Leaderboard</h1>
        <p>Top players and their scores for each difficulty level are listed below:</p>

        <!-- Easy Difficulty Leaderboard -->
        <h2>Easy Difficulty</h2>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Country</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $rank = 1;
                foreach ($easyLeaderboard as $player) {
                    echo "<tr>
                            <td>{$rank}</td>
                            <td>" . htmlspecialchars($player['username']) . "</td>
                            <td>" . htmlspecialchars($player['country']) . "</td>
                            <td>" . htmlspecialchars($player['score']) . "</td>
                          </tr>";
                    $rank++;
                }
                ?>
            </tbody>
        </table>

        <!-- Medium Difficulty Leaderboard -->
        <h2>Medium Difficulty</h2>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Country</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $rank = 1;
                foreach ($mediumLeaderboard as $player) {
                    echo "<tr>
                            <td>{$rank}</td>
                            <td>" . htmlspecialchars($player['username']) . "</td>
                            <td>" . htmlspecialchars($player['country']) . "</td>
                            <td>" . htmlspecialchars($player['score']) . "</td>
                          </tr>";
                    $rank++;
                }
                ?>
            </tbody>
        </table>

        <!-- Hard Difficulty Leaderboard -->
        <h2>Hard Difficulty</h2>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Country</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $rank = 1;
                foreach ($hardLeaderboard as $player) {
                    echo "<tr>
                            <td>{$rank}</td>
                            <td>" . htmlspecialchars($player['username']) . "</td>
                            <td>" . htmlspecialchars($player['country']) . "</td>
                            <td>" . htmlspecialchars($player['score']) . "</td>
                          </tr>";
                    $rank++;
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>
