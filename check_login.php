<?php

  session_start();

  if(!isset($_SESSION['user_id'])) {
      
      /* Here we check if the user is logged in, if they
        are not then we send them back to the login page */

      header("Location: Login.php");
      exit();
  }