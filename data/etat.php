<?php

include_once ("libs/maLibSQL.pdo.php");

$data=array();
$data["hash"]="";

if (isset($_GET["hash"])&&isset($_GET["etatPage"]))
{
    $hash=$_GET["hash"];
    $etatPage=$_GET["etatPage"];
    $SQL="UPDATE users SET etatPage = '$etatPage' WHERE hash='$hash'";
    if(SQLUpdate($SQL)){
        $data["success"]=true;
        $data["etatPage"]=$etatPage;
    }else{
        $data["success"]=false;
    }

}

echo json_encode($data);


?>
