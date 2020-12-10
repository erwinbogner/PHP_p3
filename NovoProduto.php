<?php
	include_once("./conexao.php");
    $caminho = 'ManutReclamacao.php';
    
    //echo 'ok1';
    $dt_abertura   = isset( $_POST['dt_abertura']  )?$_POST['dt_abertura']:'';
    $dt_reclamacao = isset( $_POST['dt_reclamacao'])?$_POST['dt_reclamacao']:'';
    $cod_cliente   = 0;
    $nom_cliente   = isset( $_POST['nom_cliente'] )?$_POST['nom_cliente']:'';
    $con_cliente   = isset( $_POST['con_cliente'] )?$_POST['con_cliente']:'';
    $tel_cliente   = isset( $_POST['tel_cliente'] )?$_POST['tel_cliente']:'';
    $ema_cliente   = isset( $_POST['ema_cliente'] )?$_POST['ema_cliente']:'';
    $cod_repres    = isset( $_POST['cod_repres']  )?$_POST['cod_repres']:'';
    $nom_repres    = isset( $_POST['nom_repres']  )?$_POST['nom_repres']:'';
    $cod_produ     = isset( $_POST['cod_produ']   )?$_POST['cod_produ']:'';
    $nom_produ     = $cod_produ;
    $lote          = isset( $_POST['lote']   )?$_POST['lote']:'';
    $cod_desvio    = isset( $_POST['desvio'] )?$_POST['desvio']:'';
    $acao          = isset( $_POST['acao']   )?$_POST['acao']:'';
    $procede       = isset( $_POST['procede'])?$_POST['procede']:'';
    $obs           = isset( $_POST['obs']    )?$_POST['obs']:'';
    
    //$dt_registro = date("Y-m-d");
    //echo 'ok2';
    date_default_timezone_set('America/Sao_Paulo');
    
    $sql  = "insert tabReclamacao (
            dt_abertura, dt_reclamacao, cod_cliente, nom_cliente, con_cliente, tel_cliente, ema_cliente, cod_repres, 
            nom_repres, cod_produ, nom_produ, lote, cod_desvio, acao, procede, obs, dt_registro) values (
            :dt_abertura, :dt_reclamacao, :cod_cliente, :nom_cliente, :con_cliente, :tel_cliente, :ema_cliente, :cod_repres, 
            :nom_repres, :cod_produ, :nom_produ, :lote, :cod_desvio, :acao, :procede, :obs, :dt_registro);";
    //echo 'ok3';
    
    $result = $connection->prepare($sql);
    //$result->bindValue( ':dt_abertura'   , $dt_abertura);
    //$result->bindValue( ':dt_reclamacao' , $dt_reclamacao);
    $result->bindValue( ':dt_abertura'   , date("Y-m-d"));
    $result->bindValue( ':dt_reclamacao' , date("Y-m-d"));
    $result->bindValue( ':cod_cliente'   , $cod_cliente);
    $result->bindValue( ':nom_cliente'   , $nom_cliente);
    $result->bindValue( ':con_cliente'   , $con_cliente);
    $result->bindValue( ':tel_cliente'   , $tel_cliente);
    $result->bindValue( ':ema_cliente'   , $ema_cliente);
    $result->bindValue( ':cod_repres'    , $cod_repres);
    $result->bindValue( ':nom_repres'    , $nom_repres);
    $result->bindValue( ':cod_produ'     , $cod_produ);
    $result->bindValue( ':nom_produ'     , $nom_produ);
    $result->bindValue( ':lote'          , $lote);
    $result->bindValue( ':cod_desvio'    , $cod_desvio);
    $result->bindValue( ':acao'          , $acao);
    $result->bindValue( ':procede'       , $procede);
    $result->bindValue( ':obs'           , $obs);
    $result->bindValue( ':dt_registro'   , date("Y-m-d"));
    
    //echo 'ok4';    
    //var_dump( '<br> 1) '.$cod_produ.'<br>');
    //var_dump( '<br> 2) '.$nom_produ.'<br>');
    //var_dump( '<br> post[cod] '.$_POST['cod_produ'].'<br>');
    //var_dump( '<br> post[nom]'.$_POST['nom_produ'].'<br>');
    //var_dump( $sql);

    //$result->execute();
    //var_dump( $result);
    //var_dump( $result->getMessage());
    try {
        $result->execute();
    } catch(PDOException $e){
        echo $e->getMessage();
    }

    header("Location: {$caminho}");    
?>
