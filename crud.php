<?php

    include_once( './conexao.php');

    function read( $recurso, $id){

        $sql = $id ? "select * from {$recurso} where controle=:id" : "select * from {$recurso}";
        //$sql = "select * from professores";
        //return $resultado;
        //var_dump( $recurso);
        //var_dump( $id);
        $resultado = conn()->prepare($sql);
        $resultado->bindValue(':id', $id);
        $resultado->execute();
        return $resultado->fetchAll(PDO::FETCH_OBJ);
    }

    function create ($recurso, $dados){
        //$campos = "nome, cidade";
        //$campos = array_keys((array) $dados);
        $campos = implode(",", array_keys($dados));
        //$valores = "?, ?";
        $valores = trim( str_repeat( '?, ', count($dados)),', ');
        $sql = "insert into {$recurso} ({$campos}) values ({$valores})";
        $resultado = conn()->prepare($sql);
        $resultado->execute( array_values( $dados));
        //return false;
        //return $sql;
        //return array_values( $dados);
        return $resultado;
    }

    function apagar( $recurso, $id){
        $sql = "delete from {$recurso} where controle=:id";
        $resultado = conn()->prepare($sql);
        $resultado->bindValue(':id', $id);
        $resultado->execute();
        return $resultado;
    }

    function altera ($recurso, $dados){
        //$campos = "nome, cidade";
        //$campos = array_keys((array) $dados);
        ////////$resultado = $nv_dados;
        $id = array_shift($dados);
        //$resultado = $dados;
        $campos = implode(",", array_keys($dados));
        $txt = '';
        foreach( $dados as $camp => $key){
            //$txt .= $camp .'='. $key .', ';
            $txt .= $camp .'=?, ';
        }
        $txt = trim( $txt, ', ');
        //$campos = implode(",", array_keys($dados));
        //$valores = "?, ?";
        //$valores = trim( str_repeat( '?, ', count($dados)),', ');
        //$sql = "update {$recurso} set ({$campos}) ({$valores}) where controle=:id";
        $sql = "update {$recurso} set $txt where controle=?";
        $resultado = conn()->prepare($sql);
        //$resultado->bindValue(':id', $id);
        $dados += ['id' => $id];
        $resultado->execute( array_values( $dados));
        //$resultado = $dados;
        return $resultado;
    }

    
/*    
    
<br />
<b>Warning</b>:  PDOStatement::execute(): SQLSTATE[HY093]: Invalid parameter number: mixed named and positional parameters in <b>/srv/www/htdocs/local/ws_p3/crud.php</b> on line <b>61</b><br />
<br />
<b>Notice</b>:  Array to string conversion in <b>/srv/www/htdocs/local/ws_p3/crud.php</b> on line <b>62</b><br />
{"status":"OK","data":"
update TabProduto set (nom_produto=?, descricao=?, unidade=?, vl_custo=?, vl_venda=?, qt_minimo=?, qt_estoq=?) where controle=:idArray"}    


<br />
<b>Warning</b>:  PDOStatement::execute(): SQLSTATE[HY093]: Invalid parameter number: mixed named and positional parameters in <b>/srv/www/htdocs/local/ws_p3/crud.php</b> on line <b>61</b><br />
{"status":"OK","data":["123","456FFFF","333","8.00","9.00","10","11"]}

*/
