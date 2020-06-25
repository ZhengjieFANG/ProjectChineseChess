<?php

include_once ("libs/maLibSQL.pdo.php");

$data=array();

if (isset($_GET["hash"])&&isset($_GET["etatPage"]))
{
    $hash=$_GET["hash"];
    $etatPage=$_GET["etatPage"];
    $SQL="UPDATE users SET etatPage = '$etatPage' WHERE hash='$hash'";
    if(SQLUpdate($SQL)){
        $data["success"]=true;
        $data["hash"]=$hash;
        $data["etatPage"]=$etatPage;
    }else{
        $data["success"]=false;
        $data["message"]="changer etat failed";
    }
}

echo json_encode($data);


?>
