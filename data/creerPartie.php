<?php
//sleep(1);
include_once("../libs/maLibSQL.pdo.php");
if (isset($_GET["idUser1"]) && isset($_GET["idUser2"]) && isset($_GET["idTable"]))
{
    //data: {"idUser1":idUser1,"idUser2":idUser2,"idTable":idTable}

    $idUser1 = $_GET["idUser1"];
    $idUser2 = $_GET["idUser2"];
    $idTable= $_GET["idTable"];

    if(isset($_GET["critere"])) $critere=$_GET["critere"];
    else $critere=false;

    $SQL="INSERT INTO partie (`idTable`,`idUser1`,`idUser2`) VALUES ('$idTable', '$idUser1', '$idUser2')" ;
    echo $SQL;
    return SQLInsert($SQL);

}
?>