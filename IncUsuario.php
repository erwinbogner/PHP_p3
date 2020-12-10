<?php
	include_once("conexao.php");

    $apelido = $_POST['apelido'];
    $usuario = $_POST['usuario'];
    $senha   = $_POST['senha2'];
    $email   = $_POST['email'];
    $dica    = $_POST['dica'];
    $senha   = password_hash( $_POST['senha'],PASSWORD_DEFAULT);

    date_default_timezone_set('America/Sao_Paulo');
    
    //$sql  = "insert into TabUsuario (apelido, nomeUsuario, senhaUsuario, emailUsuario, dt_registro) values ( :apelido, :usuario, :senha, :email, :dt_registro);";
    $sql  = "insert into TabUsuario (apelido, usuario, senha, email, dica, dt_registro) values ( :apelido, :usuario, :senha, :email, :dica, :dt_registro);";

    $result = conn()->prepare($sql);
    $result->bindValue( ':apelido'    , $apelido);
    $result->bindValue( ':usuario'    , $usuario);
    $result->bindValue( ':senha'      , $senha);
    $result->bindValue( ':email'      , $email);
    $result->bindValue( ':dica'       , $dica);
    $result->bindValue( ':dt_registro', date("Y-m-d"));
   
    try {
        $result->execute();
    } catch(PDOException $e){
        echo $e->getMessage();
    }

    header('Location: index01.php');
    //var_dump( $sql);
    //var_dump( $result);
?>
