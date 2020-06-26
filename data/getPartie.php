<?php
//sleep(1);
include_once("../libs/maLibSQL.pdo.php");

if (isset($_GET["idPartie"]))
{
    $idPartie = $_GET["idPartie"];
//    $hash = $_GET["hash"]];

    //on va s'occuper l'idPartie en etat 1 qui porte le même Hash


    $SQL = "SELECT pace FROM partie WHERE id='$idPartie'";
    //die($SQL);
    echo SQLGetChamp($SQL);
    return SQLGetChamp($SQL);


    die("");
}

?>