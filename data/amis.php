<?php

include_once ("../libs/maLibSQL.pdo.php");

$data=array();
//getAmis
if (isset($_GET["hash"])&& (!isset($_GET["pseudoAmi"])))
{
    $hash=$_GET["hash"];
    $SQL="SELECT id FROM users WHERE hash='$hash'";
    $resultat=SQLGetChamp($SQL);
    if($resultat){
        $data["success"]=true;
        $data["id"]=$resultat;
        $data["amis"]=array();
        $myId=$data["id"];
        $SQL1="SELECT idAmi1 FROM amitie WHERE idAmi2='$myId'";
        $amisId1=parcoursRS(SQLSelect($SQL1));
        foreach ($amisId1 as $nextId){
            $idCourrent=$nextId["idAmi1"];
            $SQLAmiPseudo="SELECT pseudo FROM users WHERE id='$idCourrent'";
            $amisPseudoCourrent=SQLGetChamp($SQLAmiPseudo);
            array_push($data["amis"],$amisPseudoCourrent);
        }
        $SQL2="SELECT idAmi2 FROM amitie WHERE idAmi1='$myId'";
        $amisId2=parcoursRS(SQLSelect($SQL2));
        foreach ($amisId2 as $nextId){
            $idCourrent=$nextId["idAmi2"];
            $SQLAmiPseudo="SELECT pseudo FROM users WHERE id='$idCourrent'";
            $amisPseudoCourrent=SQLGetChamp($SQLAmiPseudo);
            array_push($data["amis"],$amisPseudoCourrent);
        }
    }else{
        $data["success"]=false;
        $data["message"]="hash not existe";
        echo "hash not existe";
    }

}

//ajouterAmi
if (isset($_GET["hash"])&& isset($_GET["pseudoAmi"])){
    $hash=$_GET["hash"];
    $pseudoAmi=$_GET["pseudoAmi"];
    $SQL1="SELECT id FROM users WHERE hash='$hash'";
    $myId=SQLGetChamp($SQL1);
    $SQL2="SELECT id FROM users WHERE pseudo='$pseudoAmi'";
    $amiID=SQLGetChamp($SQL2);
    if($myId && $amiID){
        $SQL3="SELECT id FROM amitie WHERE idAmi1='$myId' AND idAmi2 = '$amiID'";
        $SQL4="SELECT id FROM amitie WHERE idAmi1='$amiID' AND idAmi2 = '$myId'";
        if((!SQLGetChamp($SQL3))&&(!SQLGetChamp($SQL4))){
            $SQL5="INSERT INTO amitie (idAmi1,idAmi2) VALUES ('$myId','$amiID')";
            $resultat=SQLInsert($SQL5);
            if($resultat){
                $data["success"]=true;
                $data["idAmi1"]=$myId;
                $data["idAmi2"]=$amiID;
                $data["pseudoAmi"]=$pseudoAmi;
            }
        }else{
            $data["success"]=false;
            $data["message"]="ajouter ami failed";
            echo "ajouter ami failed";
        }
    }else{
        $data["success"]=false;
        $data["message"]="ajouter ami failed";
        echo "ajouter ami failed";
    }
}

echo json_encode($data);


?>
