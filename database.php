<?php

  $conn = new mysqli("localhost", "root", "");

  if ($conn->connect_error) die("fatal error");

  $dbname = "minesweeper_users1234";

  $sql = "CREATE DATABASE IF NOT EXISTS $dbname";

  $conn->query($sql) === TRUE;

  // Close and reconnect to the specific database
  $conn->close();
  $conn = new mysqli("localhost","root", "", $dbname);

  // Check connection to the specific database
  if ($conn->connect_error) die("Connection to database failed: " . $conn->connect_error);
  echo "Connected successfully to the database.";

  // SQL to create table if it doesn't exist
  $tableSql = "CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    easy_hs INT(8) DEFAULT 0,
    medium_hs INT(8) DEFAULT 0,
    hard_hs INT(8) DEFAULT 0,
    country VARCHAR(255)
  )";

  if ($conn->query($tableSql) === TRUE) echo "Table 'users' created or already exists.<br>";
  
  else die("Error creating table: " . $conn->error);

  echo "Setup complete.";