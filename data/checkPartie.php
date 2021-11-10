<?php
//sleep(1);
include_once("../libs/maLibSQL.pdo.php");
$data=array();

if (isset($_GET["idUser1"]) && isset($_GET["idUser2"]))
{
    $idUser1 = $_GET["idUser1"];
    $idUser2 = $_GET["idUser2"];

    //on va s'occuper l'idPartie en etat 1 qui porte le même Hash

    $SQL = "SELECT ifnull(id,0) FROM partie WHERE idUser1='$idUser1' AND idUser2='$idUser2' AND etatPartie='1'";
    $nbPartie = SQLGetChamp($SQL);
    if($nbPartie=="0"){
        $data["message"]="waiting for". $idUser1 ."to start the match";
        $data["etatPartie"]="0";
        $data["idPartie"]="0";
    }
    else {
        $data["message"]="match start!";
        $data["etatPartie"]="1";
        $data["idPartie"]=$nbPartie;
    }

    echo json_encode($data);

}

?>