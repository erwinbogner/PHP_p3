<?php

    include_once('./recursos.php');

    function rota( $metodo, $recurso){
        $metodosPermitidos = ['GET','POST','PUT','DELETE'];
        $recursosPermitios = array( 0 => 'clientes', 
                                    1 => 'produtos', 
                                    2 => 'comentarios',
                                    3 => 'user', 
                                    4 => 'y');
        $tabelasAtivas = array( 0 => 'TabCliente', 
                                1 => 'TabProduto', 
                                2 => 'TabComentario', 
                                3 => 'TabUsuario', 
                                4 => '');
        if( in_array($metodo,$metodosPermitidos)){
            if( in_array($recurso[0], $recursosPermitios)){                
                $posicao = array_search($recurso[0], $recursosPermitios);
                $recurso[0] = $tabelasAtivas[$posicao];
                call_user_func_array($metodo, $recurso);
            } else {
                echo (json_encode(array('status'=>'ERRO','data'=>'Recurso não encontrado.')));
                header('HTTP/1.1 404 Method Not Found');
            }
        } else {
            echo (json_encode(array('status'=>'ERRO','data'=>'Metodo não permitido.')));
            header('HTTP/1.1 405 Method Not Allowed');
            header('Allow: POST GET');
        }

        //metodos
        //POST      -insere registro
        //GET       -busca registro
        //PUT       -atualiza registro
        //DELETE    -deleta registro
    }
    
