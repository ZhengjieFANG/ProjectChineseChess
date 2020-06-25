<?php

include_once ("libs/maLibSQL.pdo.php");

$data=array();
$data["hash"]="";

if (isset($_GET["pseudo"])&&isset($_GET["password"]))
{
    echo "Hello";
    $pseudo=$_GET["pseudo"];
    $password=$_GET["password"];
    if(isset($_GET["enregistrer"])){
        $SQL="INSERT INTO users ('psudo','passe','etatPage','hash') VALUES ('$pseudo','$password',0,md5($pseudo)) ";
        if(SQLInsert($SQL)){
            $data["success"]=true;
            $data["psudo"]=$pseudo;
            $data["password"]=$password;
            $data["hash"]=md5($pseudo);
            $data["etatPage"]=0;
        }else{
            $data["success"]=false;
        }
    }else{
        $SQL="SELECT hash FROM users WHERE pseudo='  $pseudo' AND passe='$password'";
        $hash=SQLGetChamp($SQL);
        if($hash){
            $data["success"]=true;
            $data["psudo"]=$pseudo;
            $data["password"]=$password;
            $data["hash"]=$hash;
            $data["etatPage"]=0;
            $SQL="UPDATE users SET etatPage =0 WHERE hash='$hash'";
            SQLUpdate($SQL);
        }else{
            $data["success"]=false;
        }
    }

}

echo json_encode($data);


?>
