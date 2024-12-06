<?php
  /* This page is in charge of ensuring that a user
     entered valid credentials */

  session_start();

  $conn = new mysqli("localhost", "root", "", "minesweeper_users");

  if ($conn->connect_error) die("fatal error");

  if($_SERVER["REQUEST_METHOD"] === "POST") {

    $un = $_POST["username"];
    $pw = $_POST["password"];

    $query = "SELECT id, username FROM users WHERE username='$un' AND password='$pw'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {

      $user = $result->fetch_assoc();
      $_SESSION['user_id'] = $user['id'];
      $_SESSION['username']  = $user['username'];

      header("Location: index.php");
    }

    else header("Location: Login.php?error=invalid_credentials");
  }