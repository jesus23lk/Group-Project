<?php

  require_once "database.php";

  if($_SERVER["REQUEST_METHOD"] === "POST") {

    $un = $_POST["username"];
    $pw = $_POST["password"];
    $ctry = $_POST["country"];

    $query = "INSERT INTO users(username, password, country) VALUES('$un', '$pw', '$ctry')";

    $result = $conn->query($query);

    if(!$result) {

      header("Location: create_account.php?error=query_failed");
      exit();
    }

    else header("Location: login.php?code=creation_success");
  }