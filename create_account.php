<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minesweeper Login - Fresno State</title>
    <link rel="stylesheet" href="Login.css">
    <script>

        document.addEventListener("DOMContentLoaded", function () {

            const xhr = new XMLHttpRequest();
            xhr.open("GET", "countries.json", true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const countries = JSON.parse(xhr.responseText);
                    const countryDropdown = document.getElementById("country");

                    countries.forEach(country => {
                        const option = document.createElement("option");
                        option.value = country.code;
                        option.textContent = country.name;
                        countryDropdown.appendChild(option);
                    });

                } 
                
                else {

                    console.error("Failed to load countries.json:", xhr.statusText);
                }
            };
            xhr.onerror = function () {
                console.error("Network error occurred while loading countries.json.");
            };
            xhr.send();
        });
    </script>
</head>
<body>
    <div class="login-container">
        <h1>Fresno State Minesweeper</h1>
        <p>Create Your Account</p>  
        <form action="add_user.php" method="post">
            <input type="text" id="username" name="username" placeholder="Username" required>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <select id="country" name="country">
                <option value="" disabled selected>Select your country</option>
            </select>
            <button type="submit">Create Account</button>
        </form>
        <?php
            if (!empty($_GET['error']) && $_GET['error'] == 'query_failed') {
                echo "<p class='error'>There was an error with creating your account, please try again.</p>";
            }
        ?>
    </div>
</body>
</html>
