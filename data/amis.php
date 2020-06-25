<?php

include_once ("libs/maLibSQL.pdo.php");

$data=array();

if (isset($_GET["hash"]))
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
    }

}

echo json_encode($data);


?>
