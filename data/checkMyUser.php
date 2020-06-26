<?php
//sleep(1);
include_once("../libs/maLibSQL.pdo.php");

if (isset($_GET["idPartie"]) && isset($_GET["hash"]))
{
    $idPartie = $_GET["idPartie"];
    $hash = $_GET["hash"];

    //get idUser by hash
    $SQL = "SELECT id FROM users WHERE hash='$hash'";
    $idUser = SQLGetChamp($SQL);
//    echo $idUser;

    $myUser = "";

    $SQL = "SELECT COUNT(*) FROM partie WHERE id='$idPartie' AND idUser1='$idUser'";
    if(SQLGetChamp($SQL)==1){
        $myUser=1;
        echo $myUser;
    }else{
        $SQL = "SELECT COUNT(*) FROM partie WHERE id='$idPartie' AND idUser2='$idUser'";
        if(SQLGetChamp($SQL)==1) {
            $myUser = -1;
            echo $myUser;
        }else echo "wrong hash";
    }
    //1 prend l'iniative

    die("");
}

?>