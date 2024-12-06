<?php

  $conn = new mysqli("localhost", "root", "", "minesweeper_users");

  if ($conn->connect_error) die("fatal error");

  if($_SERVER["REQUEST_METHOD"] === "POST") {

    $un = $_POST["username"];
    $pw = $_POST["password"];
    $ctry = $_POST["country"];

    $query = "INSERT INTO users(username, password, country) VALUES('$un', '$pw', '$ctry')";

    $result = $conn->query($query);

    if(!$result) {

      header("Location: create_account.html?error=query_failed");
      exit();
    }

    else header("Location: index.html");
  }