<?php
include_once ("../libs/maLibSQL.pdo.php");

$data=array();

if (isset($_GET["idTable"])) {

    $idTable = $_GET["idTable"];

    if (isset($_GET["getEtatTable"])) {
        $SQL = "SELECT ifnull(sit1,0) FROM tab WHERE id='$idTable'";
        $sit1 = SQLGetChamp($SQL);
        $SQL = "SELECT ifnull(sit2,0) FROM tab WHERE id='$idTable'";
        $sit2 = SQLGetChamp($SQL);


        $data["sit1"]=$sit1;
        $data["sit2"]=$sit2;

        if(($sit1) && ($sit2)){
            $SQL = "SELECT etatReady FROM users WHERE id='$sit1'";
            $data["sit1Ready"] = SQLGetChamp($SQL);
            $SQL = "SELECT etatReady FROM users WHERE id='$sit2'";
            $data["sit2Ready"] = SQLGetChamp($SQL);
            if(($data["sit1Ready"]) && ($data["sit2Ready"])){
                $data["onReady"]="2";
            }else{
                $data["onReady"]="1";
                }
            } else{
          $data["sit1Ready"] = "0";
          $data["sit2Ready"] = "0";
          $data["onReady"]="0";
        }
    }

//savoir si cette chaise est vide
//si c’est vide, envoie une requete SQL updata tab
//sinon, renvoie une réponse “chaise est occupée”
//on stocke oRep.sit et oRep.table

    if (isset($_GET["sitTable"])){






    }

    echo json_encode($data);

}
?>