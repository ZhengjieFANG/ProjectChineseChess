<?php

include_once ("libs/maLibSQL.pdo.php");

$data=array();

if (isset($_GET["hash"]))
{
    $hash=$_GET["hash"];
    $SQL="SELECT id,pseudo,mmr FROM users WHERE hash='$hash'";
    $resultat=parcoursRS(SQLSelect($SQL));
    if($resultat){
        $data["success"]=true;
        $data=$resultat[0];
    }else{
        $data["success"]=false;
        $data["message"]="hash not existe";
    }

}

echo json_encode($data);


?>
