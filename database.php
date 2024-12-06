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
  $conn->connect_error;

  // SQL to create table if it doesn't exist
  $tableSql = "CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    easy_hs INT(8) DEFAULT NULL,
    medium_hs INT(8) DEFAULT NULL,
    hard_hs INT(8) DEFAULT NULL,
    country VARCHAR(255)
  )";

  $conn->query($tableSql) === TRUE;