<?php
sleep(1);
include_once("libs/maLibSQL.pdo.php");
if (isset($_GET["debutNom"]))
{
    $cherche = $_GET["debutNom"];

    // On va ouvrir un fichier et afficher les lignes
    // où le prénom ou le nom contient ce texte

    $tabLignes = file("twe_2020.txt");
    foreach ($tabLignes as $ligne)
    {
        // EXO1 : effectuer une recherche sur nom ou prénom
        if (preg_match("/^(.*):(" . $cherche . ".*)$/i",$ligne,$tabResultats)
            || preg_match("/^(" . $cherche . ".*):(.*)$/i",$ligne,$tabResultats)
        )
        {
            // EXO2 afficher nom ET prénom
            echo "<li>$tabResultats[2] $tabResultats[1]</li>\n";
        }
    }

    die("");
}

if (isset($_GET["idPartie"]))
{
    $idPartie = $_GET["idPartie"]];

    // On va ouvrir un fichier et afficher les lignes
    // où le prénom ou le nom contient ce texte

    $tabLignes = file("twe_2020.txt");
    foreach ($tabLignes as $ligne)
    {
        // EXO1 : effectuer une recherche sur nom ou prénom
        if (preg_match("/^(.*):(" . $cherche . ".*)$/i",$ligne,$tabResultats)
            || preg_match("/^(" . $cherche . ".*):(.*)$/i",$ligne,$tabResultats)
        )
        {
            // EXO2 afficher nom ET prénom
            echo "<li>$tabResultats[2] $tabResultats[1]</li>\n";
        }
    }

    die("");
}

?>