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
        if($sit1){
            $SQL = "SELECT pseudo FROM users WHERE id='$sit1'";
            $pseudo1 = SQLGetChamp($SQL);
            $data["pseudo1"]=$pseudo1;
        }
        if($sit2){
            $SQL = "SELECT pseudo FROM users WHERE id='$sit2'";
            $pseudo2 = SQLGetChamp($SQL);
            $data["pseudo2"]=$pseudo2;
        }
        if(($sit1) && ($sit2)){
            $SQL = "SELECT etatReady FROM users WHERE id='$sit1'";
            $data["sit1Ready"] = SQLGetChamp($SQL);
            $SQL = "SELECT etatReady FROM users WHERE id='$sit2'";
            $data["sit2Ready"] = SQLGetChamp($SQL);
            if(($data["sit1Ready"]) && ($data["sit2Ready"])){
                $SQL = "UPDATE tab SET onReady=2 WHERE id='$idTable'";
                SQLUpdate($SQL);
                $data["onReady"]="2";
            }else{
                $SQL = "UPDATE tab SET onReady=1 WHERE id='$idTable'";
                SQLUpdate($SQL);
                $data["onReady"]="1";
                }
            } else{
          $data["sit1Ready"] = "0";
          $data["sit2Ready"] = "0";
          $data["onReady"]="0";
          $SQL = "UPDATE tab SET onReady=0 WHERE id='$idTable'";
          SQLUpdate($SQL);
        }
    }

//savoir si cette chaise est vide
//si c’est vide, envoie une requete SQL updata tab
//sinon, renvoie une réponse “chaise est occupée”
//on stocke oRep.sit et oRep.table


//    function setReady(idTable,position){
//        $.ajax({
//		type: "GET",
//		url: URL_BASE + "/salon.php",
//		data: {"hash":hash,"setReady":1},
//		success: function(oRep){
//            console.log(oRep);
//        },
//		dataType: "json"
//	});
//}



//    $.ajax({
//		type: "GET",
//		url: apiRoot + "/salon.php",
//		data: {"hash":hash,"idTable":idTable,"position":position},
//		success: function(oRep){
//        console.log(oRep);
//    },
//		dataType: "json"
//	});

    if (isset($_GET["hash"]) && isset($_GET["position"])){
        $hash = $_GET["hash"];
        $position = $_GET["position"];

        $SQL = "SELECT id FROM users WHERE hash='$hash'";
        $idUser = SQLGetChamp($SQL);

        $SQL = "SELECT ifnull(sit1,0) FROM tab WHERE id='$idTable'";
        $sit1 = SQLGetChamp($SQL);
        $SQL = "SELECT ifnull(sit2,0) FROM tab WHERE id='$idTable'";
        $sit2 = SQLGetChamp($SQL);




        if($position == 1){
            if($sit1== "0" || $sit1==null ){

                //delete User si il est deja assis
                $SQL = "SELECT id FROM tab WHERE sit1='$idUser'";
                $idAncienTable = SQLGetChamp($SQL);
                if($idAncienTable) {
                    $SQL = "UPDATE tab SET sit1 = null WHERE id='$idAncienTable'";
                    SQLUpdate($SQL);
                }
                $SQL = "SELECT id FROM tab WHERE sit2='$idUser'";
                $idAncienTable = SQLGetChamp($SQL);
                if($idAncienTable) {
                    $SQL = "UPDATE tab SET sit2 = null WHERE id='$idAncienTable'";
                    SQLUpdate($SQL);
                }

                $SQL = "UPDATE tab SET sit1=$idUser WHERE id='$idTable'";
                SQLUpdate($SQL);
                $data['message']="sitted down";
            }else{
                $data['message']="cant sit down";
            }
        }
        if($position == 2){
            if($sit2== "0" || $sit1==null ){

                $SQL = "SELECT id FROM tab WHERE sit1='$idUser'";
                $idAncienTable = SQLGetChamp($SQL);
                if($idAncienTable) {
                    $SQL = "UPDATE tab SET sit1 = null WHERE id='$idAncienTable'";
                    SQLUpdate($SQL);
                }
                $SQL = "SELECT id FROM tab WHERE sit2='$idUser'";
                $idAncienTable = SQLGetChamp($SQL);
                if($idAncienTable) {
                    $SQL = "UPDATE tab SET sit2 = null WHERE id='$idAncienTable'";
                    SQLUpdate($SQL);
                }

                $SQL = "UPDATE tab SET sit2 =$idUser WHERE id='$idTable'";
                SQLUpdate($SQL);
                $data['message']="sitted down";
            }else{
                $data['message']="cant sit down";
            }
        }






    }

    echo json_encode($data);

}
?>