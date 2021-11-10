<?php

include_once ("../libs/maLibSQL.pdo.php");

$data=array();

if (isset($_GET["hash"])&&isset($_GET["idPartie"]))
{
    $idPartie=$_GET["idPartie"];
    $SQL="UPDATE partie SET etatPartie = 0  WHERE id='$idPartie'";
//    if(SQLUpdate($SQL)){
    SQLUpdate($SQL);
        $data["success"]=true;
        $data["message"]="quitter partie" . $idPartie;
//    }else{
//        $data["success"]=false;
//        echo "quitter parite failed ";
//    }
}

echo json_encode($data);


?>