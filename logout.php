<?php

    //ob_start(); 
    session_start();
    //ini_set('default_charset','UTF-8');
    unset ($_SESSION['apelido']);
    unset ($_SESSION['permissao']);
    //unset ($_SESSION['senha']);
    session_destroy();
    header('location:index01.php');

