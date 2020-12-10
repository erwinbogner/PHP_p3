<?php

    function conn(){

        $local = 'LOCAL3';
    
        //Variaveis de conexão    
        if( $local == 'LOCAL') {
        } elseif( $local == 'LOCAL3') {
            $host = 'localhost';
            $user = 'root';
            $pass = '';
            $banc = 'p3';
        } elseif ( $local == 'RDS') {
        } elseif ( $local == 'FLEX') {
        } else {
        }
    
        //Conexão
        //Conexão via PDO
        try {
            $connection = new PDO ( "mysql:host={$host};port=3306;dbname={$banc}",
            $user,
            $pass);
            return $connection;
        } catch ( Exception $error) {
            echo "Erro: {$error->getMessage()}";
        }
    }
?>
