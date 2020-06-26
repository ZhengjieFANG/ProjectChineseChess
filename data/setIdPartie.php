<?php
//sleep(1);
include_once("../libs/maLibSQL.pdo.php");


    $SQL = "SELECT MAX(id) FROM partie";
    //die($SQL);
    echo SQLGetChamp($SQL);
    return SQLGetChamp($SQL);


    die("");


?>