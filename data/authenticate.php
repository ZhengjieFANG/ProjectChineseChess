<?php

include_once ("../libs/maLibSQL.pdo.php");

$data=array();

if (isset($_GET["pseudo"])&&isset($_GET["password"]))
{
    $pseudo=$_GET["pseudo"];
    $password=$_GET["password"];
    if(isset($_GET["enregistrer"])){
        $SQL="SELECT hash FROM users WHERE pseudo='$pseudo'";
        if(SQLGetChamp($SQL)){
            $data["success"]=false;
            $data["message"]="This pseudo is already used by others";
            echo "This pseudo is already used by others ";
        }else{
            $SQL="INSERT INTO users (pseudo,passe,etatPage,hash) VALUES ('$pseudo','$password',0,md5('$pseudo')) ";
            if(SQLInsert($SQL)){
                $data["success"]=true;
                $data["psudo"]=$pseudo;
                $data["password"]=$password;
                $data["hash"]=md5($pseudo);
                $data["etatPage"]=0;
            }else{
                $data["success"]=false;
            }
        }
    }else{
        $SQL="SELECT hash FROM users WHERE pseudo='$pseudo' AND passe='$password'";
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
            $data["message"]="Pseudo or password incorrect";
            echo "Pseudo or password incorrect ";
        }
    }

}

echo json_encode($data);


?>
