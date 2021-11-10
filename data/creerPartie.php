<?php

include_once("../libs/maLibSQL.pdo.php");

$data=array();
if (isset($_GET["idUser1"]) && isset($_GET["idUser2"]) && isset($_GET["idTable"]))
{
    //data: {"idUser1":idUser1,"idUser2":idUser2,"idTable":idTable}

    $idUser1 = $_GET["idUser1"];
    $idUser2 = $_GET["idUser2"];
    $idTable= $_GET["idTable"];

    if(isset($_GET["critere"])) $critere=$_GET["critere"];
    else $critere=false;

    $SQL="INSERT INTO `partie` (`id`, `idTable`, `idUser1`, `idUser2`, `etatPartie`, `pace`, `playerMy`) 
            VALUES (NULL, '$idTable', '$idUser1', '$idUser2', '1', NULL, '1')";

    SQLInsert($SQL);
    $SQL = "SELECT MAX(id) FROM partie";
    $idPartie = SQLGetChamp($SQL);
    $data["idPartie"]= $idPartie;

    echo json_encode($data);

}
?>