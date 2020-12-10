<?php

    include_once( './crud.php');

    ///metodo get ###leitura
    function get ($recurso, $id=null){
        $resultado = read($recurso, $id);
        if($resultado){
            echo (json_encode(array('status'=>'SUCESSO','data'=>$resultado)));
        } else {
            echo (json_encode(array('status'=>'ERRO','data'=>'Registro não encontrato')));
            header( 'HTTP/1.1 404 Not Found');
        }
    }
    
    ///metodo post ###inclusao
    function post ($recurso){
        $dados = json_decode(file_get_contents('php://input'), true);
        if($dados){
            $resultado = create ($recurso, $dados);
            if($resultado){
                echo (json_encode(array('status'=>'SUCESSO','data'=>'POST')));
            } else {
                echo (json_encode(array('status'=>'ERRO','data'=>'Erro ao cadastrar')));
                header( 'HTTP/1.1 400 Bad Request');    
            }
        } else {
            echo (json_encode(array('status'=>'ERRO','data'=>'Faltam dados para cadastro')));
            header( 'HTTP/1.1 400 Bad Request');
        }
    }
    
    ///metodo put ###alteracao
    function put ($recurso, $id=null ){
        $dados = json_decode(file_get_contents('php://input'), true);
        if($dados){
            //$nv_dados = array_shift($dados);
            $resultado = altera ($recurso, $dados);
        //    if($resultado){
        //        echo (json_encode(array('status'=>'SUCESSO','data'=>'PUT')));
        //    } else {
        //        echo (json_encode(array('status'=>'ERRO','data'=>'Erro ao editar')));
        //        header( 'HTTP/1.1 400 Bad Request');    
        //    }
        //    //echo (json_encode(array('status'=>'SUCESSO','data'=>'PUT')));
        //} else {
        //    echo (json_encode(array('status'=>'ERRO','data'=>'Faltam dados para cadastro')));
        //    header( 'HTTP/1.1 400 Bad Request');
        }
        echo (json_encode(array('status'=>'OK','data'=> $resultado)));
    }
    //{"controle":"2","nom_produto":"123","descricao":"456nova","unidade":"peca","vl_custo":"8.00","vl_venda":"9.00","qt_minimo":"10","qt_estoq":"11"}
    
    ///metodo get ###delete
    function delete ($recurso, $id=null){
        if( $id){
            //$dados = json_decode(file_get_contents('php://delete'), true);
            $dados = true;
            if($dados){
                $resultado = apagar ($recurso, $id);
                if($resultado){
                    echo (json_encode(array('status'=>'SUCESSO','data'=>'DELETE')));
                } else {
                    echo (json_encode(array('status'=>'ERRO','data'=>'Erro ao deletar')));
                    header( 'HTTP/1.1 400 Bad Request');    
                }
            } 
        } else {
            echo (json_encode(array('status'=>'ERRO','data'=>'Falta informação para deletar')));
            header( 'HTTP/1.1 400 Bad Request');        
        }
    }
