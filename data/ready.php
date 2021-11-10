<?php
include_once ("../libs/maLibSQL.pdo.php");

$data=array();

if (isset($_GET["setReady"]) && isset($_GET["pseudo"])) {

    $setReady = $_GET["setReady"];
    $pseudo = $_GET["pseudo"];

        $SQL = "UPDATE users
                SET etatReady = '$setReady'
                WHERE pseudo = '$pseudo'";

        SQLUpdate($SQL);
        $data["pseudo"]=$pseudo;
        $data["setReady"]=$setReady;


    echo json_encode($data);
}
?>