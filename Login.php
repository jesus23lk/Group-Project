<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minesweeper Login - Fresno State</title>
    <link rel="stylesheet" href="Login.css">
    <script>
    </script>
</head>
<body>
    <div class="login-container">
        <h1>Fresno State Minesweeper</h1>
        <p>Login to play the game!</p>
        <form action="validate_user.php" method="post">
            <input type="text" id="username" name="username" placeholder="Username" required>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <br>
        <a href="create_account.php">Create an account</a>
        <?php
            if (!empty($_GET['error']) && $_GET['error'] == 'invalid_credentials') {
                echo "<p style='color: red;'>* Incorrect username or password</p>";
            }

            if (!empty($_GET['code']) && $_GET['code'] == 'creation_success') {
                echo "<p style='color: green;'>Account created successfully, you can now login.</p>";
            }

        ?>
    </div>
</body>
</html>
