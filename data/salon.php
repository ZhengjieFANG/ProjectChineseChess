<?php
include_once ("../libs/maLibSQL.pdo.php");

$data=array();

if (isset($_GET["idTable"])) {

    $idTable = $_GET["idTable"];

    //GET EtatTable
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
        }else{
            $data["sit1Ready"] = "0";
            $data["sit2Ready"] = "0";
            $data["onReady"]="0";
            $SQL = "UPDATE tab SET onReady=0 WHERE id='$idTable'";
            SQLUpdate($SQL);
        }
    }


    if (isset($_GET["pseudo"]) && isset($_GET["position"])){
        $pseudo = $_GET["pseudo"];
        $position = $_GET["position"];

        //QUITTER TABLE
        if(isset($_GET["quitterTable"])){
            if($position==1){
                $SQL="UPDATE tab SET sit1 = null WHERE id='$idTable'";
            }
            if($position==2){
                $SQL="UPDATE tab SET sit2 = null WHERE id='$idTable'";
            }
            if(SQLUpdate($SQL)){
                $SQLOnReady = "UPDATE tab SET onReady=0 WHERE id='$idTable'";
                SQLUpdate($SQLOnReady);
                $data["success"]=true;
                $data['message']="quitter table";
            }
        }




        //SIT TABLE
        else{
            $SQL = "SELECT id FROM users WHERE pseudo='$pseudo'";
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
                    $data['success']=true;
                    $data['message']="sitted down";
                }else{
                    $data['success']=false;
                    $data['message']="This chaise is already occupied by others";
                }
            }
            if($position == 2){
                if($sit2== "0" || $sit2==null ){

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
                    $data['success']=true;
                    $data['message']="sitted down";
                }else{
                    $data['success']=false;
                    $data['message']="This chaise is already occupied by others";
                }
            }
        }

    }
    echo json_encode($data);

}
?>