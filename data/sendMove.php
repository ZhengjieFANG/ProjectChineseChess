<?php
//sleep(1);
include_once("../libs/maLibSQL.pdo.php");

if (isset($_GET["idPartie"]) && isset($_GET["pace"]) && isset($_GET["playerMy"]))
{
    $idPartie = $_GET["idPartie"];
    $pace = $_GET["pace"];
    $playerMy = $_GET["playerMy"];

    //$hash = $_["hash"]];
    //on va s'occuper l'idPartie en etat 1 qui porte le même Hash
    $pace = json_encode($pace);
    $SQL = "UPDATE partie SET pace = '$pace', playerMy = '$playerMy'  WHERE id='$idPartie'";

    //    die($SQL);
    echo ($SQL);
    return SQLUpdate($SQL);


    die("");
}

?>