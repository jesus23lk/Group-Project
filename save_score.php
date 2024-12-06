<?php

  require_once "database.php";

  session_start();
  
  if(!isset($_SESSION['user_id'])) header("Location: Login.php");

  $user_id = $_SESSION['user_id'];
  $score = intval($_POST['score']);
  $difficulty = $_POST['difficulty'];

  $column = "";

  if ($difficulty === 'easy') $column = 'easy_hs';

  else if ($difficulty === 'medium') $column = 'medium_hs';

  else if ($difficulty === 'hard') $column = 'hard_hs';

  $query = "UPDATE users SET $column = LEAST(IFNULL($column, $score), $score) WHERE id = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $user_id);
  $stmt->execute();

  $conn->close();
