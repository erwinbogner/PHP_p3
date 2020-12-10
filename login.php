<?php

// session_start inicia a sessão
//ob_start(); 
session_start();
$_SESSION['apelido'] = '';
$_SESSION['permissao'] = '';
unset ($_SESSION['apelido']);
unset ($_SESSION['permissao']);
//ini_set('default_charset','UTF-8');

$login    = $_POST['login'];
$senha    = $_POST['senha'];

include_once( './conexao.php' );

//$sql = 'select usuario,senha from usuarios where usuario=:login';
$sql = 'select apelido, usuario,senha, permissao from TabUsuario';
$result = conn()->prepare($sql);
$result->bindValue( ':login',$login );
$result->execute();        
$usuarios = $result->fetchAll(PDO::FETCH_OBJ);

$achou = false;
$xuser = '';
$xperm = '';
foreach( $usuarios as $user){
    //echo "[user: {$user->usuario} --- senha: {$user->senha}]<br>";
    if( ($user->usuario==$login) and 
    (password_verify($senha,$user->senha))) {
        $achou = true;
        $xuser = $user->apelido;
        $xperm = $user->permissao;
    }
}

if($achou ){
    echo "[***ACHOU***]";
    session_start();
    $_SESSION['apelido'] = $xuser;
    $_SESSION['permissao'] = $xperm;
    //$_SESSION['login'] = $login;
    //$_SESSION['senha'] = $senha;
    //var_dump( $_SESSION['login']);
    //var_dump( $xuser);
    //echo "<p><a href='index01.php'>SITE</a></p>";
    header('location:index01.php');
} 
else {
    echo "[***ERRO Usuario ou senha incorretos***]";
    //session_start();
    unset ($_SESSION['apelido']);
    unset ($_SESSION['permissao']);
    //unset ($_SESSION['login']);
    //unset ($_SESSION['senha']);
    echo "<p><a href='index01.php'>VOLTA</a></p>";
    //header('location:index01.php');
  }
  //header('location:index01.php');
?>