<?php

include_once ("../libs/maLibSQL.pdo.php");

$data=array();

if (isset($_GET["idPartie"])&&isset($_GET["pseudo"])&&isset($_GET["message"]))
{
    $idPartie=$_GET["idPartie"];
    $SQLEtatPartie="SELECT etatPartie FROM partie WHERE id = '$idPartie'";
    $etatPartie=SQLGetChamp($SQLEtatPartie);
    if($etatPartie!="0"){
        $pseudo=$_GET["pseudo"];
        $message=$_GET["message"];
        $SQLId="SELECT id FROM users WHERE pseudo = '$pseudo'";
        $idAuteur=SQLGetChamp($SQLId);
        $SQL="INSERT INTO chat (idPartie,idAuteur,pseudoAuteur,texte) VALUES ('$idPartie','$idAuteur', '$pseudo','$message' )";
        if(SQLInsert($SQL)){
            $data["success"]=true;
            $data["idPartie"]=$idPartie;
            $data["pseudo"]=$pseudo;
            $data["message"]=$message;
        }else{
            $data["success"]=false;
            $data["message"]="envoyer message failed";
            echo "envoyer message failed";
        }
    }else{
        $data["success"]=false;
        $data["message"]="envoyer message failed";
        echo "envoyer message failed";
    }


}

if (isset($_GET["idPartie"])&&isset($_GET["listerMessages"]))
{
    $idPartie=$_GET["idPartie"];
    $SQL="SELECT pseudoAuteur, texte FROM chat WHERE idPartie='$idPartie'";
    $resultat=parcoursRs(SQLSelect($SQL));
    if($resultat){
        $data["success"]=true;
        $data["idPartie"]=$idPartie;
        $data["messageList"]=$resultat;
    }else{
        $data["success"]=false;
        $data["message"]="listerMessages  failed";
        echo "listerMessages  failed";
    }

}

echo json_encode($data);


?>