<?php

include_once ("libs/maLibSQL.pdo.php");

$data=array();
$data["suggestions"]=array();
$data["recherche"]="";

if (isset($_GET["debutNom"]))
{
    $cherche=$_GET["debutNom"];
    $data["recherche"]=$cherche;

    if(isset($_GET["critere"])) $critere=$_GET["critere"];
    else $critere=false;

    $SQL="SELECT * FROM etudiants WHERE";
    switch($critere){
        case "nom":
            $SQL.=" nom LIKE '$cherche%'";
            break;

        case "prenom":
            $SQL.=" prenom LIKE '$cherche%'";
            break;

        default:
            $SQL.=" prenom LIKE '$cherche%'"; //LIKE表示不精确搜索，%表示后面什么字符都可以
            $SQL.=" OR nom LIKE '$cherche%'";
    }


    //print_r(parcoursRs(SQLSelect($SQL)));
    $data["suggestions"]=parcoursRs(SQLSelect($SQL));



}


echo json_encode($data);



?>
