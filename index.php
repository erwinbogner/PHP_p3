<?php 
    //http://minhaapi/produtos/234/
    //http://endereco/recurso/id
    
    include_once( 'rota.php');
    
    header('Access-Control-Allow-Origin: *');
    header( 'Content-type: application/json');
    if ($_GET){
        $url = trim( $_GET['url'],'/');
        $recurso = explode('/',$url);
        $metodo = $_SERVER[ 'REQUEST_METHOD'];
        rota( $metodo, $recurso);
        //echo (json_encode(array('codigo'=>$metodo,'produto'=>$url)));
    } else {
        echo (json_encode(array('status'=>'ERRO','data'=>'Digite um recurso')));
        
    }
    
